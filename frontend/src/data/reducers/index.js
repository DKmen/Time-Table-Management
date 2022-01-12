import { combineReducers } from "redux";

const userTask = (state = [], action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "FETCH_TASK":
      return [...action.payload];
    case "DELETE_TASK":
      return state.filter((item) => item._id !== action.payload);
    case "DONE_TASK":
      return state.map((item) => {
        if (item._id === action.payload) item.active = false;
        return item;
      });
    case "UNDONE_TASK":
      return state.map((item) => {
        if (item._id === action.payload) item.active = true;
        return item;
      });
    default:
      return state;
  }
};

const login = (state=true , action) =>{
  switch (action.type){
    case "USER_LOGIN":
      return true
    case "USER_LOGOUT":
      return false
    default:
      return state
  }
}

export default combineReducers({
  userTask: userTask,
  login:login
});
