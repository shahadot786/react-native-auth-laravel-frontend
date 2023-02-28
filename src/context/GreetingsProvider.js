import React, {createContext, useContext, useState, useEffect} from 'react';
import {getToken, getUserGreetingsData} from '../auth/auth';

const GreetingContext = createContext();

export const useGreetings = () => useContext(GreetingContext);

export const GreetingsProvider = ({children}) => {
  const [greetings, setGreetings] = useState([]);

  useEffect(() => {
    const fetchGreetings = async () => {
      const token = await getToken();
      if (token) {
        true;
        const data = await getUserGreetingsData(token);
        setGreetings(data);
      }
    };
    fetchGreetings();
  }, []);

  return (
    <GreetingContext.Provider value={greetings}>
      {children}
    </GreetingContext.Provider>
  );
};

export default GreetingsProvider;
