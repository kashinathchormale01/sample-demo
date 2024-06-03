import React, { useState, useEffect, useRef } from "react";
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 200,
  facingMode: "environment",
};

const CapturePhoto = ({ open, onClose, onCapture  }) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  const [error, setError] = useState(null);

  const capturePhoto = async () => {
    try {
      const imageSrc = await webcamRef.current.getScreenshot();
      setUrl(imageSrc);
      onCapture(imageSrc); // Call onCapture callback to pass the captured image
    } catch (err) {
      setError("Failed to capture photo. Please try again.");
    }
  };

  const handleClose = () => {
    setUrl(null);
    onClose();
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Capture Photo</DialogTitle>
      <DialogContent>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <Button onClick={capturePhoto}>Capture</Button>
        <Button onClick={() => setUrl(null)}>Reset</Button>
        {error && <Typography color="error">{error}</Typography>}
        {url && (
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        )}
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
    </>
  );
};

export default CapturePhoto;
