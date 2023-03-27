import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Button from '../components/buttons/Button';
import Colors from '../constants/Colors';
import {S3} from 'aws-sdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native-animatable';

const FileUploadList = ({route, navigation}) => {
  const [contentData, setContentData] = useState();
  const data = route.params.awsData;
  const location = data?.Location;
  const DATA = [1, 2, 3, 4, 5];
  const defaultUrl =
    'https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/';

  const deleteImage = async key => {
    params = {
      Bucket: 'shahadot-tfp-hellosuperstars',
      Key: key,
    };

    const s3 = new S3({
      accessKeyId: 'AKIAXO5VROGDSZOY5JUX',
      secretAccessKey: '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',
      region: 'ap-southeast-1',
    });

    try {
      const dl = s3.deleteObject(params, (err, data) => {
        if (err) {
          return console.log(
            'There was an error deleting your image: ',
            err.message,
          );
        }
        console.log('Successfully deleted image.');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImageHandler = async key => {
    await deleteImage(key);
  };

  //const list image
  useEffect(() => {
    const listImages = async () => {
      var params = {
        Bucket: 'shahadot-tfp-hellosuperstars',
        MaxKeys: 10,
      };

      const s3 = new S3({
        accessKeyId: 'AKIAXO5VROGDSZOY5JUX',
        secretAccessKey: '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',
        region: 'ap-southeast-1',
      });

      try {
        const list = s3.listObjectsV2(params, (err, data) => {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            let content = data?.Contents;
            setContentData(content);
            console.log('contents =>', content);
          } // successful response
        });
      } catch (error) {
        console.log(error);
      }
    };

    listImages();
  }, []);

  const renderItem = ({item}) => {
    const url = item?.Key;
    const imageUrl = defaultUrl + url;
    <View>
      <Image
        source={{uri: imageUrl}}
        style={{
          width: 350,
          height: 250,
          marginVertical: 15,
          borderRadius: 15,
        }}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => deleteImageHandler(route.params.awsData?.Key)}>
        <Icon name="trash" size={24} />
      </TouchableOpacity>
    </View>;
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>
        Image List
      </Text>
      <FlatList
        data={contentData}
        renderItem={renderItem}
        keyExtractor={item => item.Key}
      />
    </View>
  );
};

export default FileUploadList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingVertical: 15,
  },
});
