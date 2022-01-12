import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reducers from "./data/reducers";

import UserLoginPage from "./screen/Login";
import UserSingUpPage from "./screen/Singup";
import UserDashbord from "./screen/Dashbord";

const store = createStore(reducers, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='login'  element={<UserLoginPage/>}/>
          <Route path='singup' element={<UserSingUpPage/>}/>
          <Route path='' element={<UserDashbord/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
