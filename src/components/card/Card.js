import {
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const width = Dimensions.get('screen').width;

const Card = ({backgroundImage, cardImage, title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <ImageBackground
        imageStyle={{borderRadius: 15}}
        source={backgroundImage}
        resizeMode="cover"
        style={styles.imageBackground}>
        <Image style={styles.image} source={cardImage} />
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  imageBackground: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width / 2.3,
    height: 120,
  },
  title: {
    textTransform: 'capitalize',
    color: Colors.white,
    fontWeight: 'bold',
  },
  image: {
    width: 90,
    height: 100,
  },
});
