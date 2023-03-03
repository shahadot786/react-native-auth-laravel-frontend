import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import RouteName from '../../constants/RouteName';
import {useGreetings} from '../../context/GreetingsProvider';
import Heading from '../Heading';
import {BASE_IMG_URL} from '@env';

//get the screen width
const width = Dimensions.get('screen').width;

const GreetingsDataCard = () => {
  const navigation = useNavigation();
  const {greetings} = useGreetings();
  return (
    <View>
      {greetings.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={greetings}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardBody}
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate(RouteName.detailsGreetings, {
                  greetingsData: item,
                })
              }>
              {/* image and date/time */}
              <View style={styles.imageContainer}>
                <View style={styles.imageView}>
                  {item.image ? (
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.image ? item.image : null,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.image}
                      source={Images.placeholderImg}
                    />
                  )}
                </View>
                <Text style={{color: Colors.white, marginVertical: 2}}>
                  {item.date}
                </Text>
                <Text style={{color: Colors.gray}}>{item.time}</Text>
              </View>
              {/* title/description */}
              <View>
                <Text style={{color: Colors.white, fontSize: 17}}>
                  {item.title?.length > 30
                    ? `${item.title.slice(0, 30)}...`
                    : item.title}
                </Text>
                <Text
                  style={{
                    color: Colors.gray,
                    fontSize: 13,
                    paddingRight: 120,
                    lineHeight: 18,
                    textTransform: 'capitalize',
                    marginTop: 5,
                    textAlign: 'justify',
                  }}>
                  {item.descriptions?.length > 120
                    ? `${item.descriptions.slice(0, 120)}...`
                    : item.descriptions}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Heading color={Colors.gray}>Greetings Not Found</Heading>
          <Text
            style={{color: Colors.primary, marginTop: 10}}
            onPress={() => navigation.navigate(RouteName.createGreetings)}>
            Create Greetings
          </Text>
        </View>
      )}
    </View>
  );
};

export default GreetingsDataCard;

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: Colors.secondary,
    marginVertical: 10,
    borderRadius: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 8,
    width: width / 1.1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
