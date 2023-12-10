import { useState } from 'react';
import Header from './Header';
import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

function App() {
  //theme choices for MUI
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#333333',
      },
    },
  });

  function handleThemeChange() {
    //toggle mode
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline component resets browser css (removes default margin/padding) */}
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
