import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

const Store = createContext();

export const StoreProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("currentState");
  console.log(state);

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch]);
  // check if state exists in LS
  useEffect(() => {
    // let authUser = localStorage.getItem("blog__auth") ? JSON.parse(localStorage.getItem("blog__auth")) : ""
    let authUser = Cookies.get("blog__userInfo") ? JSON.parse(Cookies.get("blog__userInfo")) : ""
    if (authUser) {
      dispatch({
        type: "USER_LOADED",
        payload: authUser
      });
    }
  }, []);
  useEffect(() => {
    // updated state values stored into cookie
    if (state !== initialState) {
      Cookies.set("blog__userInfo", JSON.stringify(state.auth.user), {expires: 7, sameSite: 'strict'});
      // localStorage.setItem("blog__auth", JSON.stringify(state.auth.user));
    }
  }, [state]);

  // ------------------------------------------------
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