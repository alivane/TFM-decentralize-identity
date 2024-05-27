import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyCredentials from './pages/VerifyCredentials';
// import About from './About';
// import Contact from './Contact';
import NotFound from './pages/NotFound';
import HomeUser from './pages/HomeUser';
import ScanQr from './pages/ScanQR';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from './components/AuthContext';

const theme = createTheme();
// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(2),
//     textAlign: 'center',
//   },
//   button: {
//     marginTop: theme.spacing(2),
//   },
// }));



function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <div>
              {/* <Navigation /> */}
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} /> */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/scanqr" element={<ScanQr />} />
                <Route path="/verify-credentials/:id" element={<VerifyCredentials />} /> {/* Define route with ID parameter */}
                <Route
                  path="/home"
                  element={
                    <PrivateRoute isAuthenticated={true} element={HomeUser} 
                  />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </Router>
      </ThemeProvider>

  );
}

export default App;
