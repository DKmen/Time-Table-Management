import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import CustomizeButton from "../components/Button";
import CustomizeTextInput from "../components/TextInput";

function UserSingUpPage(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const singUpUser = async () => {
    const newUser = await fetch("http://localhost:3000/user/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ userName, password }),
    });
    const responce = await newUser.json();
    Cookies.set("token", responce.token, {
      expires: new Date(Date.now()+ responce.expire*24*60*60*1000),
    });
    navigate('../',{ replace: true })
    return responce;
  };

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
              margin={2}
              onChange={(event) => setUserName(event.target.value)}
            />
            <CustomizeTextInput
              placeholder="Enter Password"
              label="Password"
              margin={2}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <CustomizeTextInput
              placeholder="Config Password"
              label="Config Password"
              margin={2}
              type="password"
            />
            <CustomizeButton title="Sing Up" margin={2} onClick={singUpUser} />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default UserSingUpPage;
