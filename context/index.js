// import { createContext, useReducer } from 'react';

// // TODO: this is pseudo code, to handle theme globally, untested, light is default theme
// export const Store = createContext();
// const initialState = {
//   theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : localStorage.setItem('light'),
//   userInfo: localStorage.getItem('__user')? JSON.parse(localStorage.getItem('__userInfo')) : []
// };

// // currentState, action
// function reducer(state, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case 'THEME_PRIMARY_ON':
//       return {
//         ...state,
//         theme: payload.themes[0]
//       };
//     case 'THEME_PRIMARY_OFF':
//       return {
//         ...state,
//         theme: payload.themes[1]
//       };
//     default:
//       return state;
//   }
// };

// export function StoreProvider(props) {
//   // current state, action
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const value = { state, dispatch };
//   return <Store.Provider value={value}>{props.children}</Store.Provider>
// }