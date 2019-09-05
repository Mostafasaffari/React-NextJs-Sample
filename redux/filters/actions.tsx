const actions = {
  SET_DISTINATIONS: "SET_DISTINATIONS",

  setDistinations: city => ({
    type: actions.SET_DISTINATIONS,
    city
  })
};

export default actions;
