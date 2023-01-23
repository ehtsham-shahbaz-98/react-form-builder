import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const PriorityList = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Priority List
        </Typography>
        <Demo>
          <List dense={dense}>
            {generate(
              <ListItem
                ref={ref}
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
              >
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            )}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
});

export default PriorityList;
