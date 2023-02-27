import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import GreetingContext from '../../context/GreetingContext';
import api from '../../api/api';
import {getToken, getUserGreetingsData} from '../../auth/auth';

const GreetingsDataCard = () => {
  const [greetings, setGreetings] = useState([]);
  const greetingContext = useContext(GreetingContext);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        true;
        const data = await getUserGreetingsData(token);
        //console.log(data);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>GreetingsDataCard</Text>
    </View>
  );
};

export default GreetingsDataCard;
