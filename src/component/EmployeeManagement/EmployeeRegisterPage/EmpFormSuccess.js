import React from 'react';
import { Box, Button, Typography, Link} from '@mui/material';

const EmpFormSuccess = () => {
  return (
    <>   <Box m={4}>
      <Typography variant="h5" gutterBottom>
        Thank you for your Enrollment.
      </Typography>
      <Typography sx={{marginBottom:'10px'}} variant="subtitle1">
        We will notify you when your employment is verified by concern person.
      </Typography>
      <Link href="/employee-register" underline="hover">
        Go Back to New Enrollment
      </Link>
      </Box>
    </>
  )
}

export default EmpFormSuccess