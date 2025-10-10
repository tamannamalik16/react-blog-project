import { createContext,useEffect,  useReducer } from "react";        //create context is used to pass user info to all the app components, it may not possible through prop drilling
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,           //initially user is fetch from localstorage, 
  isFetching: false,
  error: false
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {                  // here children is all the compnents in the app
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);               //jab bhi user ki state change hogi, to ue effect hoga

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}