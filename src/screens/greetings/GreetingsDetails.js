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
        {/* title */}
        <Heading color={Colors.white}>{data.title}</Heading>
        {/* descriptions */}
        <Text style={{color: Colors.gray}}>{data.descriptions}</Text>
        {/* image */}
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
        {/* video */}
        {data.video_url ? (
          <VideoPlayer videoUrl={data.video_url} />
        ) : (
          <Text style={{color: Colors.white, fontSize: 16, fontWeight: 'bold'}}>
            Video Not Found
          </Text>
        )}
        {/* date */}
        {data.date ? (
          <Text style={{color: Colors.white}}>{data.date}</Text>
        ) : (
          <Text style={{color: Colors.white, fontSize: 14, fontWeight: '500'}}>
            Date Not Found
          </Text>
        )}
        {/* time */}
        {data.time ? (
          <Text style={{color: Colors.white}}>{data.time}</Text>
        ) : (
          <Text style={{color: Colors.white, fontSize: 14, fontWeight: '500'}}>
            Time Not Found
          </Text>
        )}
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
