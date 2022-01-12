import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import CustomizeButton from "../components/Button";
import CustomizeTextInput from "../components/TextInput";

function UserLoginPage(props) {
  const navigate = useNavigate();
  const loginUser = async()=>{
    const responce = await fetch("http://localhost:3000/user/login",{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body:JSON.stringify({userName,password})
    })
    const responceData = await responce.json();
    Cookies.set("token", responceData.token, {
      expires: new Date(Date.now()+ responceData.expire*24*60*60*1000),
    });
    navigate('../',{ replace: true })
  }
  const [userName , setUserName] = useState("");
  const [password,setPassword] = useState("");
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "90vh" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Container maxWidth="md">
            <CustomizeTextInput
              placeholder="Enter User Name"
              label="User Name"
              defaultValue={userName}
              onChange={(event)=>setUserName(event.target.value)}
              margin={2}
            />
            <CustomizeTextInput
              placeholder="Enter Password"
              label="Password"
              margin={2}
              defaultValue={password}
              onChange={(event)=>setPassword(event.target.value)}
              type="password"
            />
            <CustomizeButton title="login" margin={2} onClick={loginUser}/>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default UserLoginPage;
