import * as actionTypes from "./actionTypes";
import { themes } from "../../constants";

const initialState = {
  token: "",
  isLoggedIn: false,
  theme: themes.light,
  name: "",
  profile: "",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOKEN: {
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
        name: action.payload.name,
        profile: action.payload.profile,
      };
    }
    case actionTypes.THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case actionTypes.LOGOUT: {
      return {
        ...state,
        token: "",
        isLoggedIn: false,
        theme: themes.light,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
