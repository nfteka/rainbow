import { map } from 'lodash';
import { fetchAllAssets, fetchAssetsList } from '../utils/assetsService';

const ADD_ASSET_LIST = 'assets/ADD_ASSET_LIST';
const ADD_ASSET_IN_LIST = 'assets/ADD_ASSET_IN_LIST';
const ADD_OWNER = 'assets/ADD_OWNER';
const ASSETS_LOADING = 'assets/ASSETS_LOADING';
const OWNER_LOADING = 'assets/OWNER_LOADING';

function assetsListHandler(assets, list) {
  const queryClear = assets.filter(f => f.sell_orders.length > 0);
  return map(queryClear, item => {
    item.title = list.data.result.find(
      f => f.token === `${item.asset_contract.address}/${item.token_id}`
    ).description;
    item.usd_price =
      Math.trunc(item.sell_orders[0]?.payment_token_contract.usd_price * 100) /
      100;
    item.eth_price =
      Math.trunc(
        item.sell_orders[0]?.payment_token_contract.eth_price * 10000
      ) / 10000;
    item.symbol = item.sell_orders[0]?.payment_token_contract.symbol;
    return item;
  });
}

export const getAssetsList = () => async dispatch => {
  dispatch(loadingAssets(true));
  const resp = await fetchAssetsList();
  if (!resp.error) {
    const query = await fetchAllAssets(resp.data.result);
    const assets = assetsListHandler(query.data.assets, resp);
    dispatch(addAsset(assets));
  }
};

export const reloadAssetsList = (callBack = () => {}) => async dispatch => {
  const resp = await fetchAssetsList();
  if (!resp.error) {
    const query = await fetchAllAssets(resp.data.result);
    const assets = assetsListHandler(query.data.assets, resp);
    dispatch(addAsset(assets));
    callBack();
  }
};

const loadingAssets = loading => ({
  payload: loading,
  type: ASSETS_LOADING,
});

const addOwner = owner => ({
  payload: owner,
  type: ADD_OWNER,
});

const addAsset = asset => ({
  payload: asset,
  type: ADD_ASSET_LIST,
});

const INITIAL_STATE = {
  assets: [],
  assetsLoading: false,
  owner: {},
  ownerLoading: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_ASSET_LIST:
      return {
        ...state,
        assets: payload,
        assetsLoading: false,
      };
    case ADD_ASSET_IN_LIST:
      return {
        ...state,
        assets: [...state.assets, ...payload],
      };
    case ASSETS_LOADING:
      return {
        ...state,
        assetsLoading: payload,
      };
    case ADD_OWNER:
      return {
        ...state,
        owner: payload,
      };
    default:
      return state;
  }
};
