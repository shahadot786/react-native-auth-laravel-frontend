import {StyleSheet, View, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import Colors from '../constants/Colors';
import BackArrow from './BackArrow';
import Title from './Title';
import Images from '../constants/Images';
import SubTitle from './SubTitle';
import Avatar from './images/Avatar';
import UsersIcons from './UsersIcons';
import CoinButton from './buttons/CoinButton';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../constants/RouteName';
import Logout from './buttons/Logout';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const HeaderBackground = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackArrow
        visibility={true}
        onPressBack={() => navigation.navigate(RouteName.signIn)}
      />
      {/* logout */}
      <View style={styles.logout}>
        <Logout />
      </View>
      <View style={styles.avatarView}>
        <View style={styles.content}>
          <Avatar source={Images.profile1} />
          <View>
            <Title color={Colors.black} fontSize={14}>
              sakib al hasan
            </Title>
            <SubTitle color={Colors.white} fontSize={14}>
              super star
            </SubTitle>
            <UsersIcons />
          </View>
        </View>
      </View>
      <View style={styles.avatarViewRight}>
        <CoinButton coinValue={200} />
      </View>
      <View style={styles.borderView}></View>
      {/* <View style={styles.borderViewTop}></View> */}
    </View>
  );
};

export default HeaderBackground;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFAD2B',
    flex: 1,
    height: height / 2.8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  avatarView: {
    backgroundColor: '#FFB828',
    width: width / 2.1,
    height: width / 2.1,
    borderRadius: 100,
    position: 'absolute',
    bottom: 40,
    left: -30,
  },
  avatarViewRight: {
    backgroundColor: '#FFB828',
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: 100,
    position: 'absolute',
    bottom: 80,
    right: -50,
  },
  borderView: {
    borderWidth: 1,
    borderColor: '#FFB82C',
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    right: 60,
  },
  borderViewTop: {
    borderWidth: 1,
    borderColor: '#FFB82C',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 2,
    right: -8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 65,
    left: 40,
  },
  logout: {
    position: 'absolute',
    right:20,
    top:10
  },
});
