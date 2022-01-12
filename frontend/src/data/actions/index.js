import Cookies from "js-cookie";

export const addTask = (data) =>{
  return async(dispatch) =>{
    const token = Cookies.get("token");

    if(token) return dispatch(userLogout())

    const taskResponce = await fetch("http://localhost:3000/task/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
    });
    const task = await taskResponce.json();

    if(!task.data) return dispatch(userLogout())

    dispatch({
      type: "ADD_TASK",
      payload: task.data,
    });
  }
};

export const deleteTask = (id) =>{
  return async(dispatch) =>{
    const token = Cookies.get("token");

    if(token) return dispatch(userLogout())

    const taskResponce = await fetch(`http://localhost:3000/task/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      mode: "cors",
      method: "DELETE"
    });
    await taskResponce.json();

    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }
};

export const doneTask = (id) =>{
  return async(dispatch) =>{
    const token = Cookies.get("token");

    if(token) return dispatch(userLogout())

    const taskResponce = await fetch(`http://localhost:3000/task/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      mode: "cors",
      method: "PATCH",
      body:JSON.stringify({active:false})
    });
    await taskResponce.json();

    dispatch({
      type: "DONE_TASK",
      payload: id,
    });
  }
};

export const unDoneTask = (id) =>{
  return async(dispatch) =>{
    const token = Cookies.get("token");

    if(token) return dispatch(userLogout())

    const taskResponce = await fetch(`http://localhost:3000/task/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      mode: "cors",
      method: "PATCH",
      body:JSON.stringify({active:true})
    });
    await taskResponce.json();

    dispatch({
      type: "UNDONE_TASK",
      payload: id,
    });
  }
};

export const fetchTask = () => {
  return async(dispatch) =>{
    const token = Cookies.get("token");

    if(token) return dispatch(userLogout())

    const taskResponce = await fetch("http://localhost:3000/task/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      mode: "cors",
      method: "GET",
    });
    const task = await taskResponce.json();
    dispatch({
      type: "FETCH_TASK",
      payload: task.data,
    });
  }
};

export const userLogin = ()=>{
  return {
    type:"USER_LOGIN",
    payload:true
  }
}

export const userLogout = ()=>{
  return {
    type:"USER_LOGOUT",
    payload:false
  }
}