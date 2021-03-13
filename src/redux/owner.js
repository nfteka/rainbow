const ADD_OWNER = 'owner/ADD_OWNER';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_OWNER:
      return { ...payload };
    default:
      return state;
  }
};
