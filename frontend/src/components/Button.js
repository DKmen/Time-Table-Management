import React from "react";
import { Button, Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((them) => ({
  Button: {
    display: "block",
    margin: "auto",
    paddingRight: them.spacing(6),
    paddingLeft: them.spacing(6),
  },
}));

export default function CustomizeButton(props) {
  const classObject = useStyle();

  return (
    <>
      <Box marginY={props.margin | 0}>
        <Button
          variant= "contained" 
          className={classObject.Button}
          size="large"
          color="primary"
          onClick={props.onClick}
        >
          {props.title}
        </Button>
      </Box>
    </>
  );
}
