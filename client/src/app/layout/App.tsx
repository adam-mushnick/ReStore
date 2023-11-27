import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import { Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';

function App() {
  //theme choices for MUI
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#333333'
      }
  }
  })
  
  function handleThemeChange() {
    setDarkMode(!darkMode);
}

  return (
    <>
      <ThemeProvider theme={theme}>
      {/* CssBaseline component resets browser css (removes default margin/padding) */}
      <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        {/* passing props to catalog */}
        <Catalog/>
        </Container>
        </ThemeProvider>
    </>
  );
}

export default App;
