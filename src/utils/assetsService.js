import axios from 'axios';
import { map } from 'lodash';
import { API_URI, OPENSEA_API_URI } from 'react-native-dotenv';

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

const fetchOpenseaApi = async (uri, method = 'get', data = null) =>
  fetch(OPENSEA_API_URI, uri, method, data);

export const fetchAssetsList = () => {
  return fetchFirebaseApi('feed');
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
