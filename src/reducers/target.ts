import {
  FETCH_TARGET,
  FETCH_ALL_TARGET,
  SAVE_TARGET,
  DELETE_TARGET,
} from "../constants/actions";

// todo delet detail
const INITIAL_STATE_Text = [
  {
    study: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
    career: [
      "make a lot of money,about 10",
      "to be a team leader",
      "run a company",
    ],
    life: ["travel to a beautiful beach", "learn how to dance"],
  },
  {
    study: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
    career: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
    life: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
  },
  {
    study: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
    career: [
      "make a lot of money,about 10",
      "to be a team leader",
      "run a company",
    ],
    life: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
  },
  {
    study: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
    career: [
      "编写一本小册-跨域和安全",
      "看完所有关于机器学习的优秀书籍",
      "做一个全公司性质的Session",
    ],
    life: ["travel to a beautiful beach with my", "learn how to dance"],
  },
];

export const INITIAL_STATE = [
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
    case DELETE_TARGET:
      const {
        quarter: quarterDel,
        category: categoryDel,
        index,
      } = action.payload;
      state[quarterDel] = state[quarterDel] || {};
      state[quarterDel][categoryDel] = state[quarterDel][categoryDel] || [];
      state[quarterDel][categoryDel].splice(index, 1);
      console.log(state);
      return state;
    case FETCH_ALL_TARGET:
      return state;
    default:
      return state;
  }
}
