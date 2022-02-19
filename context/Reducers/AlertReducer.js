export const alertInitialState = []; // [{id, msg, alertType}]

export const AlertReducer = (state = alertInitialState, action) => {
  const { type, payload } = action;
  
  switch(type) {
    case "SET_ALERT":
      return [...state, payload];
    case "REMOVE_ALERT":
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};