import React from "react";
import { TextField, Box } from "@material-ui/core";

export default function CustomizeTextInput(props) {
  return (
    <>
      <Box marginY={props.margin | 0}>
        <TextField
          variant="outlined"
          placeholder={props.placeholder}
          label={props.label}
          size="small"
          defaultValue={props.defaultValue}
          type={props.type}
          multiline={props.multiLine}
          minRows={props.minRow}
          onChange={props.onChange}
          fullWidth
        />
      </Box>
    </>
  );
}
