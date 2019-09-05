import actions from "./actions";
import { IFilter } from "../../interfaces/IFilter";

const initState: IFilter = {
  cities: []
};

export default (state = initState, action): IFilter => {
  switch (action.type) {
    case actions.SET_DISTINATIONS:
      return {
        ...state,
        cities: [...state.cities, action.city]
      };
    default:
      return state;
  }
};
