import actions from "./actions";
import { IFilter } from "../../interfaces/IFilter";

const initState: IFilter = {
  cities: [],
  dates: []
};

export default (state = initState, action): IFilter => {
  switch (action.type) {
    case actions.SET_DISTINATIONS:
      return {
        ...state,
        cities: [...action.cities]
      };
    default:
      return state;
  }
};
