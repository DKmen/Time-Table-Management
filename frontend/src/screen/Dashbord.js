import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@material-ui/core";
import Cookies from "js-cookie";
import { useNavigate} from "react-router-dom";
import CustomizeButton from "../components/Button";
import CustomizeTextInput from "../components/TextInput";
import TaskTab from "../components/Tabbar";
import TaskCreateForm from "../components/TaskForm";
import { connect } from "react-redux";

import { addTask, fetchTask } from "../data/actions";

function UserDashbord(props) {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("../singup", { replace: true });
    props.fetchTask();
  }, []);

  console.log(props.contentData)

  const [showDialog, setOpenDialog] = useState(false);

  const openDialog = () => setOpenDialog(true);
  const closeDialog = () => setOpenDialog(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth =
    currentDate.getMonth() + 1 >= 10
      ? currentDate.getMonth() + 1
      : `0${currentDate.getMonth() + 1}`;
  const currentDay =
    currentDate.getDate() >= 10
      ? currentDate.getDate()
      : `0${currentDate.getDate()}`;

  const [todayDate, setTodayDate] = useState(
    `${currentYear}-${currentMonth}-${currentDay}`
  );

  const logout = () => {
    Cookies.remove("token");
    navigate("../login", { replace: true });
  };

  if(!props.contentData.login) navigate("../login", { replace: true });

  return (
    <>
      <Container maxWidth="lg">
        <TaskCreateForm openDialog={showDialog} closeDialog={closeDialog} />
        <Grid container justifyContent="space-between">
          <Grid item xs={6} sm={6} md={4}>
            <CustomizeButton
              margin={2}
              title="create task"
              onClick={openDialog}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={8}>
            <CustomizeTextInput
              label="Select Date"
              type="date"
              defaultValue={todayDate}
              margin={2}
              onChange={(event) => setTodayDate(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <CustomizeButton margin={2} title="log out" onClick={logout} />
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box marginTop={10}>
              <TaskTab date={todayDate} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    contentData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (data) => dispatch(addTask(data)),
    fetchTask: () => dispatch(fetchTask()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashbord);
