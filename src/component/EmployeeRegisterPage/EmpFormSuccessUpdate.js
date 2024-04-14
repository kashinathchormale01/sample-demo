import React from 'react';
import { Box, Button, Typography, Link} from '@mui/material';

const EmpFormSuccessUpdate = () => {
  return (
    <>   <Box m={4}>
      <Typography variant="h5" gutterBottom>
        Successfully Updated...
      </Typography>
      <Link href="/employee-register" underline="hover">
        Go Back to New Enrollment
      </Link>
      </Box>
    </>
  )
}

export default EmpFormSuccessUpdate