import {
  Card,
  CardContent,
  Grid,
  Chip,
  Typography,
  CardActions,
  Button,
  Avatar,
} from "@material-ui/core";
import React from "react";
import { deleteTask,doneTask,unDoneTask } from "../data/actions";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { connect } from "react-redux";

function TaskDetailsCard(props) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">{props.title}</Typography>
          <Typography
            variant="body2"
            align="justify"
            style={{ marginBottom: 18 , height:30 }}
          >
            {props.description}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Chip
                avatar={
                  <Avatar style={{backgroundColor:"transparent" , color:"blue"}}>
                    <AccessTimeIcon />
                  </Avatar>
                }
                label={`${props.startTime} - ${props.endTime}`}
                variant="outlined"
                color="primary"
              />
            </Grid>
          </Grid>
        </CardContent>
        {props.CardAction?<CardActions>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={()=>props.done(props.id)}
                fullWidth
              >
                Done
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} lg={6} xl={6}>
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                onClick={()=>props.delete(props.id)}
                fullWidth
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </CardActions>:<CardActions>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={()=>props.undone(props.id)}
                fullWidth
              >
                Add to panding
              </Button>
        </CardActions>}
      </Card>
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
    delete : (id)=>dispatch(deleteTask(id)),
    done : (id)=>dispatch(doneTask(id)),
    undone : (id)=>dispatch(unDoneTask(id)),
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(TaskDetailsCard)