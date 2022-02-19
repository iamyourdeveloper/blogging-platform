const combineReducers = reducers => {
  return (state, action) => {
    return Object.keys(reducers).reduce(
      (acc, prop) => {
        return ({
          ...acc,
          ...reducers[prop]({ [prop]: acc[prop] }, action)
        })
      },
      state
    )
  }
}
// export { initialState, combineReducers };
export default combineReducers;

// export function combineReducers(slices) {
//   return function (prevState, action) {
//     return Object.keys(slices).reduce((nextState, nextProp) => {
//       return {
//         ...nextState,
//         [nextProp]: slices[nextProp](prevState[nextProp], action),
//       };
//     }, prevState);
//   };
// }