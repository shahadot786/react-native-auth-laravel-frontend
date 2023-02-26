import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {logout} from '../../auth/auth';
import Colors from '../../constants/Colors';
import RouteName from '../../constants/RouteName';

const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
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
