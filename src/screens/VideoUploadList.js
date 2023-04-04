import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Heading from '../components/Heading';
import Colors from '../constants/Colors';
import {S3} from 'aws-sdk';
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} from '@env';
import CustomVideoPlayer from '../components/Video/CustomVideoPlayer';

const VideoUploadList = () => {
  const [videoData, setVideoData] = useState([]);
  //aws s3 configuration
  const bucketName = AWS_BUCKET_NAME;
  const fileType = 'video';
  const BASE_URL =
    'https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/';
  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  const getItemList = async () => {
    try {
      const listParams = {
        Bucket: bucketName,
        Prefix: `${fileType}/`,
      };
      const fileList = await s3.listObjects(listParams).promise();
      const list = fileList?.Contents;
      const video = list.map((item, index) => {
        return console.log('key => ', item?.Key);
      });
      setVideoData(list);
      console.log('data =>', videoData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);
  //{`${BASE_URL}${item?.Key}`}
  const renderItem = ({item}) => (
    <CustomVideoPlayer videoUrl={`${BASE_URL}${item?.Key}`} />
  );

  return (
    // <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      {/* heading */}
      <Heading color={Colors.white}>News Feeds</Heading>
      {/* video list */}
      <FlatList
        data={videoData}
        keyExtractor={item => item?.Key}
        renderItem={renderItem}
      />
    </View>
    // </ScrollView>
  );
};

export default VideoUploadList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 25,
    backgroundColor: Colors.black,
    paddingVertical: 15,
    paddingTop: 10,
  },
});
