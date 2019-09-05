import { ICity } from "../../interfaces/ICity";

const actions = {
  SET_DISTINATIONS: "SET_DISTINATIONS",
  SET_DATES: "SET_DATES",

  setDistinations: (cities: ICity[]) => ({
    type: actions.SET_DISTINATIONS,
    cities
  }),
  setDates: (dates: string[]) => ({
    type: actions.SET_DATES,
    dates
  })
};

export default actions;
