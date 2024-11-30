
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useThemeData } from "./context/them_context";
import { ThemeProvider } from '@mui/material';

function App() {
  const { muiTheme } = useThemeData();

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>

    </>
  )
}

export default App
