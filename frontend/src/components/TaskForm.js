import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Container,
  Grid,
} from "@material-ui/core";
import CustomizeTextInput from "./TextInput";
import CustomizeButton from "./Button";
import { connect } from "react-redux";
import { addTask } from "../data/actions";

function TaskCreateForm(props) {
  const currentDate = new Date();
  const hour =
    currentDate.getHours() >= 10
      ? currentDate.getHours()
      : `0${currentDate.getHours()}`;
  const min =
    currentDate.getMinutes() >= 10
      ? currentDate.getMinutes()
      : `0${currentDate.getMinutes()}`;
  const day =
    currentDate.getDate() >= 10
      ? currentDate.getDate()
      : `0${currentDate.getDate()}`;
  const month =
    currentDate.getMonth() + 1 >= 10
      ? currentDate.getMonth() + 1
      : `0${currentDate.getMonth() + 1}`;
  const year = currentDate.getFullYear();

  const [title, setTaskTitle] = useState("");
  const [descripatation, setTaskDetails] = useState("");
  const [date, setTaskDate] = useState(`${year}-${month}-${day}`);
  const [startTime, setTaskStartTime] = useState(`${hour}:${min}`);
  const [endTime, setTaskEndTime] = useState(`${hour}:${min}`);

  return (
    <>
      <Dialog fullWidth open={props.openDialog} onClose={props.closeDialog}>
        <Container maxWidth="md">
          <DialogContent>
            <CustomizeTextInput
              placeholder="Enter Task Name"
              label="Taks Title"
              margin={2}
              defaultValue={title}
              onChange={(event) => setTaskTitle(event.target.value)}
            />
            <CustomizeTextInput
              placeholder="Enter Task Details"
              label="Description"
              margin={2}
              minRow={4}
              defaultValue={descripatation}
              onChange={(event) => setTaskDetails(event.target.value)}
              multiLine={true}
            />
            <CustomizeTextInput
              label="Select Date"
              type="date"
              defaultValue={date}
              onChange={(event) => setTaskDate(event.target.value)}
              margin={2}
            />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} md={6} xl={6}>
                <CustomizeTextInput
                  label="Start Time"
                  type="time"
                  margin={2}
                  defaultValue={startTime}
                  onChange={(event) => setTaskStartTime(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <CustomizeTextInput
                  label="End Time"
                  type="time"
                  margin={2}
                  defaultValue={endTime}
                  onChange={(event) => setTaskEndTime(event.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Container>
        <DialogActions>
          <CustomizeButton
            title="Create Task"
            variant="outlined"
            onClick={() => {
              props.onAdd({
                title,
                date,
                descripatation,
                startTime,
                endTime
              });
              props.closeDialog();
            }}
          />
        </DialogActions>
      </Dialog>
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
    onAdd: (data) =>dispatch(addTask(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreateForm);
