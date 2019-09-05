const actions = {
  SET_DISTINATIONS: "SET_DISTINATIONS",
  SET_DATES: "SET_DATES",
  SET_DURATIONS: "SET_DURATIONS",

  setDistinations: (cities: string[]) => ({
    type: actions.SET_DISTINATIONS,
    cities
  }),
  setDates: (dates: string[]) => ({
    type: actions.SET_DATES,
    dates
  }),
  setDurations: (durations: number[]) => ({
    type: actions.SET_DURATIONS,
    durations
  })
};

export default actions;
