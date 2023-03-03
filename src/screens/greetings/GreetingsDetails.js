import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import BackArrow from '../../components/BackArrow';
import Heading from '../../components/Heading';
import Images from '../../constants/Images';
import VideoPlayer from '../../components/Video/VideoPlayer';

const width = Dimensions.get('screen').width;

const GreetingsDetails = ({route, navigation}) => {
  const data = route.params.greetingsData;
  //console.log(data);
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
              width: width - 50,
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
        <VideoPlayer videoUrl={data.video} />
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
