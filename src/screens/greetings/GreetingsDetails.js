import {StyleSheet, Text, View, ScrollView, Dimensions, Image} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import BackArrow from '../../components/BackArrow';
import Heading from '../../components/Heading';
import Images from '../../constants/Images';

const width = Dimensions.get('screen').width;

const GreetingsDetails = ({route, navigation}) => {
  const data = route.params.greetingsData;
  return (
    <ScrollView style={styles.container}>
      <View>
        <BackArrow visibility={true} onPressBack={() => navigation.goBack()} />
      </View>
      <View style={styles.contentView}>
        <Heading color={Colors.white}>{data.title}</Heading>
        <Text style={{color: Colors.gray}}>{data.descriptions}</Text>
        {data.image ? (
          <Image
            source={{uri: data.image ? data.image : null}}
            style={{
              width: width - 15,
              height: 250,
              borderRadius: 15,
              resizeMode: 'cover',
            }}
          />
        ) : (
          <Image
            source={Images.placeholderImg}
            style={{width: 300, height: 250}}
          />
        )}

        <Text style={{color: Colors.white}}>{data.date}</Text>
        <Text style={{color: Colors.white}}>{data.time}</Text>
      </View>
    </ScrollView>
  );
};

export default GreetingsDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
  },
  contentView: {
    alignItems: 'center',
    marginHorizontal: 15,
    gap: 12,
  },
});
