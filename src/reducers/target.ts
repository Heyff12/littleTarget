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
      // const { quarter, category } = action.payload;
      return state[action.payload.quarter - 1][action.payload.category];
    case SAVE_TARGET:
      const { quarter, category, data } = action.payload;
      state[quarter - 1][category] = data;
      return state;
    case FETCH_ALL_TARGET:
      return state;
    default:
      return state;
  }
}
