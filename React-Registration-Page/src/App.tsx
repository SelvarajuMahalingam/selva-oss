import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


import Registration from './components/registration/Registration';
import HomePage from './components/homePage/HomePage';
import ErrorPage from './components/errorPage/ErrorPage';

import { ErrorType } from './types/Types'; 

import './App.css';

function App() {

  const navigate = useNavigate();
  const [isRegistered, setRegistered] = useState(false);
  const [{hasError, message}, setError] = useState({ hasError: false, message: '' } as ErrorType);


  const setRegitrationSuccess = useCallback((isRegistrationSuccess: boolean) => setRegistered(isRegistrationSuccess), [setRegistered]);
  const setErrorOccured = useCallback((error: ErrorType) => setError(error)
    , [setError]);

  useEffect(() => {
    if (hasError) {
      return navigate('/');
    }

    return isRegistered ?
      navigate('/home')
      :
      navigate('/registration')
  }
    , [navigate, isRegistered, hasError]);

  return (
    <div className="App">
      <header className="App-header">
        <>
          <Routes>
            <Route path='/' element={<ErrorPage message={message}/>} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/registration' element={<Registration setRegitrationSuccess={setRegitrationSuccess} setErrorOccured={setErrorOccured} />} />
          </Routes>
        </>
      </header>
    </div>
  );
}

export default App;

