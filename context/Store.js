import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";
// import { AuthReducer, initialState } from './Reducers/AuthReducer';

const Store = createContext();

export const StoreProvider = ({ reducer, initialState, children }) => {
  // const value = useReducer(reducer, initialState);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("currentState");
  // console.log(value);
  console.log(state);

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch]);
  // check if state exists in LS
  useEffect(() => {
    let authUser = localStorage.getItem("blog__auth") ? JSON.parse(localStorage.getItem("blog__auth")) : ""

    dispatch({
      type: "USER_LOADED",
      payload: authUser
    });
  }, []);
  useEffect(() => {
    // create LS value as state
    console.log("state")
    console.log(state)
    console.log("initstate")
    console.log(initialState)
    if (state !== initialState) {
      localStorage.setItem("blog__auth", JSON.stringify(state.auth.user));
    }
  }, [state]);

  // ------------------------------------------------
  // const [state, dispatch] = useReducer(AuthReducer, initialState);
  // const contextValue = useMemo(() => {
  //   return { state, dispatch }
  // }, [state, dispatch]);
  // // check if state exists in LS
  // useEffect(() => {
  //     if (JSON.parse(localStorage.getItem("blog___state"))) {
  //       dispatch({
  //         type: "SET_INIT",
  //         value: JSON.parse(localStorage.getItem("blog__state"))
  //       });
  //     }
  //   }, []
  // );
  // useEffect(() => {
  //   // create LS value as state
  //   if (state !== initialState) {
  //     localStorage.setItem("blog__state", JSON.stringify(state));
  //   }
  // }, [state]);

  // <Store.Provider value={{value}}>
  // <Store.Provider value={{state, dispatch}}>
  return (
    <Store.Provider value={contextValue}>
      {children}
    </Store.Provider>
  )
};

// // export default StoreProvider;
export function useAppContext() {
  return useContext(Store);
};