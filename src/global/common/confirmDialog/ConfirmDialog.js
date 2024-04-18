import {
    Button,
    Dialog,
    DialogContent,
    Fade,
    Grid,
    IconButton,
    Typography,
    DialogTitle,
    Divider
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { forwardRef } from "react";
  
  const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
  });
  
  function ConfirmBox({ open, closeDialog, title ,deleteFunction}) {
    return (
      <Dialog
        fullWidth
        open={open}
        maxWidth="md"
        scroll="body"
        onClose={closeDialog}
        onBackdropClick={closeDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ fontSize: "1.5em" }}>
          This is Delete Warning !!! for {" "}
          <label className="DialogTitle">{title}</label>
          <IconButton
            size="medium"
            onClick={closeDialog}
            sx={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            X
          </IconButton>
        </DialogTitle>
<Divider />
        <DialogContent sx={{ px: 8, py: 6, position: "relative" }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                {/* <Typography variant="h5">
                  This is Delete Warning !!! for{" "}
                  <label className="DialogTitle">{title}</label>
                </Typography> */}

                <Typography variant="body1">
                  Can not delete the {" "}
                  <label className="DialogTitle">{title}</label> <br /> If
                  deleted then you will loss for all the refference data related
                  to the same.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <Button
                onClick={closeDialog}
                size="medium"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              {/* <Button
                onClick={deleteFunction}
                size="medium"
                variant="contained"
                color="error"
              >
                Delete
              </Button>{" "} */}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default ConfirmBox;