import {useNavigation} from '@react-navigation/native';
import React, { useContext } from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext, logout} from '../../auth/auth';
import Colors from '../../constants/Colors';
import RouteName from '../../constants/RouteName';

const Logout = () => {
  const {setIsLoggedIn} = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogout = async () => {
    setIsLoggedIn(false);
    await logout();
    navigation.navigate(RouteName.signIn);
  };
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
      <Icon name={'power-sharp'} size={22} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default Logout;
