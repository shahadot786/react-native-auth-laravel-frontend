import React, {createContext, useContext, useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from 'react-native-animatable';
import {getToken, getUserGreetingsData} from '../auth/auth';
import Spinner from '../components/spinner/Spinner';
import Colors from '../constants/Colors';

const GreetingContext = createContext();

export const useGreetings = () => useContext(GreetingContext);

export const GreetingsProvider = ({children}) => {
  const [greetings, setGreetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGreetings = async () => {
      const token = await getToken();
      if (token) {
        true;
        const data = await getUserGreetingsData(token);
        setGreetings(data);
        setIsLoading(false);
      }
    };
    fetchGreetings();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, backgroundColor: Colors.secondary}}>
        <Spinner />
      </View>
    );
  }

  return (
    <GreetingContext.Provider value={greetings}>
      {children}
    </GreetingContext.Provider>
  );
};

export default GreetingsProvider;
