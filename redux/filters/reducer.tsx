import actions from "./actions";
import { IFilter } from "../../interfaces/IFilter";

const initState: IFilter = {
  cities: [],
  dates: [],
  durations: []
};

export default (state = initState, action): IFilter => {
  switch (action.type) {
    case actions.SET_DISTINATIONS:
      return {
        ...state,
        cities: [...action.cities]
      };
    case actions.SET_DATES:
      return {
        ...state,
        dates: [...action.dates]
      };
    case actions.SET_DURATIONS:
      return {
        ...state,
        durations: [...action.durations]
      };
    default:
      return state;
  }
};
