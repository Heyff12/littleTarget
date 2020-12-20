import {
  FETCH_TARGET,
  FETCH_ALL_TARGET,
  SAVE_TARGET,
} from "../constants/actions";

const INITIAL_STATE = [
  {
    study: [],
    career: [],
    life: [],
  },
  {
    study: [],
    career: [],
    life: [],
  },
  {
    study: [],
    career: [],
    life: [],
  },
  {
    study: [],
    career: [],
    life: [],
  },
];

export default function targets(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TARGET:
      // const list = state[action.payload.quarter][action.payload.category];
      // return list ? list : [];
      return state;
    case SAVE_TARGET:
      const { quarter, category, data } = action.payload;
      state[quarter] = state[quarter] || {};
      state[quarter][category] = state[quarter][category] || [];
      state[quarter][category].push(data);
      return state;
    case FETCH_ALL_TARGET:
      return state;
    default:
      return state;
  }
}
