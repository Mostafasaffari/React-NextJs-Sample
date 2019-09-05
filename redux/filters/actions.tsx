const actions = {
  SET_DISTINATIONS: "SET_DISTINATIONS",
  SET_DATES: "SET_DATES",
  SET_DURATIONS: "SET_DURATIONS",
  SET_PASSENGERS: "SET_PASSENGERS",

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
  }),
  setPassengers: (passengers: number[]) => ({
    type: actions.SET_PASSENGERS,
    passengers
  })
};

export default actions;
