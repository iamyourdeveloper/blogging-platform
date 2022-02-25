import Cookies from "js-cookie";
// const checkWindow = action => {
//   return typeof window !== undefined ? action : null;
// };
// export const authInitialState = {
//   token: '',
//   isAuthenticated: localStorage.getItem("blog__auth") ? true : false,
//   loading: true,
//   user: localStorage.getItem("blog__auth") ? JSON.parse(localStorage.getItem("blog__auth")) : {}
// };
// export const authInitialState = {
//   token: '',
//   isAuthenticated: checkWindow(localStorage.getItem("blog__auth")) ? true : false,
//   loading: true,
//   user: checkWindow(localStorage.getItem("blog__auth")) ? JSON.parse(checkWindow(localStorage.getItem("blog__auth"))) : {}
// };
export const authInitialState = {
  token: '',
  isAuthenticated: Cookies.get("blog__token") ? true : false,
  loading: true,
  // user: {}
  user: Cookies.get("blog__userInfo") ? JSON.parse(Cookies.get("blog__userInfo")) : {}
  // user: localStorage.getItem("blog__auth") ? JSON.parse(localStorage.getItem("blog__auth")) : {}
};

export const AuthReducer = (state = authInitialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        auth: {
          user: payload,
          isAuthenticated: true,
          loading: false
        },
      }
    case "USER_LOADED":
      return {
        ...state,
        auth: {
          user: payload,
          isAuthenticated: true,
          loading: false
        }
      }
    case "UPDATE_USER_INFO":
      return {
        ...state,
        auth: {
          user: payload,
          isAuthenticated: true,
          loading: false
        }
      }
    case "REGISTER_FAIL":
    case "AUTH_ERROR":
    case "LOGIN_FAILURE":
    case "LOGOUT":
    case "ACCOUNT_DELETED":
      return {
        ...state,
        auth: {
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        }
      }
    default:
      return state;
  }
};










// switch (type) {
//   case "SET_INIT":
//     return action.value
//   case 'SET_SEARCH':
//     return {
//       ...state,
//       search: action.payload
//     };
//   case 'SET_SORT':
//     return {
//       ...state,
//       sort: action.payload
//     };
//   case 'SET_LOCATION':
//     return {
//       ...state,
//       location: action.payload
//     };
//   case 'SET_REMOTE':
//     return {
//       ...state,
//       remote: action.payload
//     }
//   case 'SET_EMP_TYPE':
//     return {
//       ...state,
//       empType: action.payload
//     }
//   case 'SET_PAGE':
//     return {
//       ...state,
//       currentPage: action.payload
//     };
//   case 'SET_TAG':
//     return {
//       ...state,
//       tags: [...state.tags, action.payload]
//       // tags: [...action.payload, ...tags]
//     };
//   case 'REMOVE_TAG':
//     return {
//       ...state,
//       tags: [...state.tags.filter(tag => state.tags.indexOf(tag) !== action.payload)]
//     };
//   case 'SET_JOBS':
//     return {
//       ...state,
//       jobs: action.payload
//     };
//   case 'CLEAR_JOBS':
//     return {
//       ...state,
//       jobs: []
//     };
//   default:
//     return state;
// }