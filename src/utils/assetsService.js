import axios from 'axios';
import { map, replace } from 'lodash';
import { Network, OpenSeaPort } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';
import {
  API_URI,
  INFURA_PROJECT_ID,
  INFURA_PROJECT_ID_DEV,
  OPENSEA_API_URI,
  OPENSEA_DEV_API_URI,
} from 'react-native-dotenv';

import * as Web3 from 'web3';
import { loadAddress } from '../model/wallet';
import store from '../redux/store';
import { logger } from './index';

const infuraProjectId = __DEV__ ? INFURA_PROJECT_ID_DEV : INFURA_PROJECT_ID;
const infuraUrl = `https://network.infura.io/v3/${infuraProjectId}`;

export const SeaPortApi = () => {
  const network = store.getState().settings.network;
  const providerEngine = new Web3.providers.HttpProvider(
    replace(infuraUrl, 'network', network)
  );

  const seaport = new OpenSeaPort(providerEngine, {
    // apiKey: OPENSEA_API_KEY,
    networkName: network === 'mainnet' ? Network.Main : Network.Rinkeby,
  });

  const fetchAllAssets = async assets => {
    let resp = [];
    try {
      for (let i = 0; i < assets.length; i++) {
        const splitToken = assets[i].token.split('/');
        const fet = await seaport.api.getAsset({
          tokenAddress: splitToken[0],
          tokenId: splitToken[1],
        });
        resp.push(fet);
      }
      return { data: resp, error: false };
    } catch (e) {
      logger.log('fetchAllAssets => error =>', e);
      return { data: null, error: e };
    }
  };

  const buyOrder = async ({ address, tokenId }) => {
    try {
      const accountAddress = await loadAddress();

      const order = await seaport.api.getOrder({
        asset_contract_address: address,
        side: OrderSide.Sell,
        token_id: tokenId,
      });

      const transactionHash = await seaport.fulfillOrder({
        accountAddress: accountAddress.toString(),
        order,
      });

      return { data: transactionHash, error: false };
    } catch (e) {
      console.log('ERROR BUY', e);
      return { data: [], error: e };
    }
  };

  return {
    buyOrder,
    fetchAllAssets,
    seaport,
  };
};

const fetch = async (api, uri, method = 'get', data = null) => {
  try {
    const response = await axios[method](api + uri, data);
    return {
      data: response.data,
      error: false,
    };
  } catch (e) {
    return {
      data: {},
      error: e,
    };
  }
};

const fetchFirebaseApi = async (uri, method = 'get', data = null) =>
  fetch(API_URI, uri, method, data);

const fetchOpenseaApi = async (uri, method = 'get', data = null) => {
  const network = store.getState().settings.network;
  return fetch(
    network === 'mainnet' ? OPENSEA_API_URI : OPENSEA_DEV_API_URI,
    uri,
    method,
    data
  );
};

export const fetchConfig = () => {
  return fetchFirebaseApi('config');
};

export const fetchAssetsList = () => {
  const network = store.getState().settings.network;
  return fetchFirebaseApi(network === 'mainnet' ? 'feed' : 'feedRinkeby');
};

export const fetchAssetsDetail = asset => {
  return fetchOpenseaApi('asset/' + asset);
};

export const fetchAllAssets = assets => {
  let query = 'assets?';
  map(assets, ({ token }) => {
    const splitToken = token.split('/');
    query += `&token_ids=${splitToken[1]}&asset_contract_addresses=${splitToken[0]}`;
    return true;
  });
  return fetchOpenseaApi(query);
};
