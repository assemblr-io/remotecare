import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function UserAvatar() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <AddCircleOutlineIcon sx={{ color: "#fff", fontSize: 28 }} />
      <Avatar src="/broken-image.jpg" sx={{ bgcolor: deepOrange[500], height: "30px", width: "30px" }} />
    </Stack>
  );
}
