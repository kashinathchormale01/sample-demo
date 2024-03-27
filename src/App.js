
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './global/Layout';

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
    <Layout/>
   </ThemeProvider>
   </>     
   
  );
}

export default App;
