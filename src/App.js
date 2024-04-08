
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './global/Layout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Inter, sans-serif',
        textTransform: 'none',
        fontSize: 14,
      },
    },
  });

  return (
   <>
   <ThemeProvider theme={theme}>
    <ToastContainer theme="colored" />
    <Layout/>
   </ThemeProvider>
   </>     
   
  );
}

export default App;
