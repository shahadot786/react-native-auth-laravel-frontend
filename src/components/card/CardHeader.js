import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackArrow from '../BackArrow';
import Heading from '../Heading';
import * as Animatable from 'react-native-animatable';

const CardHeader = ({data, navigation: {goBack}}) => {
  return (
    <View style={styles.headerView}>
      <ImageBackground
        style={styles.backgroundImage}
        source={data.backgroundImage}
        imageStyle={{borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}
        resizeMode="cover">
        <BackArrow
          iconName={'ios-arrow-back'}
          visibility={true}
          onPressBack={() => goBack()}
        />
        <View style={styles.content}>
          <Image source={data.cardImage} />
          <View>
            <Heading color={Colors.white}>{data.title}</Heading>
            <Animatable.View
              animation={'pulse'}
              iterationCount="infinite"
              style={styles.coinView}>
              <Text style={styles.coinText}>{data.price}</Text>
            </Animatable.View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  headerView: {
    width: '100%',
    height: 250,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  coinView: {
    backgroundColor: '#F7D324',
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderWidth: 5,
    borderColor: '#FFF48A',
  },
  coinText: {
    fontSize: 25,
    color: Colors.black,
    fontWeight: 'bold',
  },
});
