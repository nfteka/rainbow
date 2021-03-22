import { map } from 'lodash';
import { EventType } from 'opensea-js';
import { fetchAllAssets, fetchAssetsList, SeaPortApi } from '../utils/assetsService'

const ADD_ASSET_LIST = 'assets/ADD_ASSET_LIST';
const ADD_ASSET_IN_LIST = 'assets/ADD_ASSET_IN_LIST';
const ADD_OWNER = 'assets/ADD_OWNER';
const ASSETS_LOADING = 'assets/ASSETS_LOADING';
const OWNER_LOADING = 'assets/OWNER_LOADING';
const BUY_ORDER_LOADING = 'assets/BUY_ORDER_LOADING';

const SET_PENDING_TRANSACTION_HASH = 'assets/SET_PENDING_TRANSACTION_HASH';
const RESET_EXCHANGE = 'assets/RESET_EXCHANGE';

function assetsListHandler(assets, list) {
  const queryClear = assets.filter(f => f.sell_orders.length > 0);
  return map(queryClear, item => {
    item.title = list.data.result.find(
      f => f.token === `${item.asset_contract.address}/${item.token_id}`
    ).description;
    item.usdPrice =
      Math.trunc(item.sell_orders[0]?.payment_token_contract.usd_price * 100) /
      100;
    item.ethPrice =
      Math.trunc(
        item.sell_orders[0]?.payment_token_contract.eth_price * 10000
      ) / 10000;
    item.symbol = item.sell_orders[0]?.payment_token_contract.symbol;
    return item;
  });
}

export const handleSeaportEvents = () => dispatch => {
  const { seaport } = SeaPortApi();
  const transactionCreated = seaport.addListener(
    EventType.TransactionCreated,
    ({ transactionHash }) => {
      dispatch({
        payload: transactionHash,
        type: SET_PENDING_TRANSACTION_HASH,
      });
      seaport.removeListeners(transactionCreated);
    }
  );
  const transactionConfirmed = seaport.addListener(
    EventType.TransactionConfirmed,
    ({ event }) => {
      if (event === EventType.MatchOrders || event === EventType.CancelOrder) {
        dispatch({ type: RESET_EXCHANGE });
        seaport.removeListeners(transactionConfirmed);
      }
    }
  );
  const transactionDenied = seaport.addListener(
    EventType.TransactionDenied,
    () => {
      dispatch({ type: RESET_EXCHANGE });
      seaport.removeListeners(transactionDenied);
    }
  );
  const transactionFailed = seaport.addListener(
    EventType.TransactionFailed,
    () => {
      dispatch({ type: RESET_EXCHANGE });
      seaport.removeListeners(transactionFailed);
    }
  );
};

export const getAssetsList = () => async dispatch => {
  dispatch(loadingAssets(true));
  const resp = await fetchAssetsList();
  if (!resp.error) {
    const { data } = await fetchAllAssets(resp.data.result);
    const assets = assetsListHandler(data.assets, resp);
    dispatch(addAsset(assets));
  }
};

export const buyOrder = order => async dispatch => {
  dispatch(loadingBuyOrder(true));
  const { data } = await SeaPortApi().buyOrder(order);
  console.log('buyOrder => data', data);
};

export const reloadAssetsList = (callBack = () => {}) => async dispatch => {
  const resp = await fetchAssetsList();
  if (!resp.error) {
    const query = await fetchAllAssets(resp.data.result);
    const assets = assetsListHandler(query.data, resp);
    dispatch(addAsset(assets));
    callBack();
  }
};

const loadingAssets = loading => ({
  payload: loading,
  type: ASSETS_LOADING,
});

const loadingBuyOrder = loading => ({
  payload: loading,
  type: BUY_ORDER_LOADING,
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
  orderLoading: false,
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
    case BUY_ORDER_LOADING:
      return {
        ...state,
        orderLoading: payload,
      };
    case ADD_OWNER:
      return {
        ...state,
        owner: payload,
      };

    case SET_PENDING_TRANSACTION_HASH:
    case RESET_EXCHANGE:
      console.log('SET_PENDING_TRANSACTION_HASH RESET_EXCHANGE', payload);
      return state;
    default:
      return state;
  }
};
