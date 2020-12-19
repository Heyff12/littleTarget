import {
  FETCH_TARGET,
  FETCH_ALL_TARGET,
  SAVE_TARGET,
} from "../constants/actions";

export const fetchTarget = (payload: Target.TargetOperatePrams) => {
  return {
    type: FETCH_TARGET,
    payload,
  };
};
export const saveTarget = (payload: Target.TargetOperatePrams) => {
  return {
    type: SAVE_TARGET,
    payload,
  };
};
export const fetchAllTarget = () => {
  return {
    type: FETCH_ALL_TARGET,
  };
};
