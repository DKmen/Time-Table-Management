import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@material-ui/core";
import TaskDetailsCard from "./TaskCard";
import { connect } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const todayTask = props.contentData.userTask.filter(
    (item) => props.date === item.date && item.active === true
  );

  const todayDoneTask = props.contentData.userTask.filter(
    (item) => props.date === item.date && item.active === false
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Pending Task" {...a11yProps(0)} />
          <Tab label="Complete Task" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {todayTask.length !== 0
            ? todayTask.map((item) => {
                return (
                  <Grid item md={4} sm={6} xs={12}>
                    <TaskDetailsCard
                      CardAction={true}
                      title={item.title}
                      description={item.descripatation}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      id={item._id}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
        {todayDoneTask.length !== 0
            ? todayDoneTask.map((item) => {
                return (
                  <Grid item md={4} sm={6} xs={12}>
                    <TaskDetailsCard
                      CardAction={false}
                      title={item.title}
                      description={item.descripatation}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      id={item._id}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contentData: state,
  };
};

export default connect(mapStateToProps)(SimpleTabs);
