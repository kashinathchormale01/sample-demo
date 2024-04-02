import React from 'react';
import { Box, Button, Typography, Link} from '@mui/material';

const EmpFormSuccess = () => {
  return (
    <>   <Box m={4}>
      <Typography variant="h5" gutterBottom>
        Thank you for your Enrollment.
      </Typography>
      <Typography variant="subtitle1">
        Your Employee enrollment number is #2001539. We have emailed your order confirmation,
        and will send you an update when your employment is verified by concern person.
      </Typography>
      <Link href="/employee-register" underline="hover">
        Go Back to New Enrollment
      </Link>
      </Box>
    </>
  )
}

export default EmpFormSuccess