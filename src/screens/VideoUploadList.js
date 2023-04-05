import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  const [loadedCount, setLoadedCount] = useState(2); // Change initial loadedCount to 2
  const scrollViewRef = useRef(null);
  // aws s3 configuration
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
      setVideoData(list); // Set all video data initially
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  const loadMoreItems = () => {
    // Load more items when end of list is reached
    setLoadedCount(prevCount => prevCount + 2);
  };

  const renderVideoItems = () => {
    // Render video items based on loadedCount
    const itemsToRender = videoData.slice(0, loadedCount);
    return itemsToRender.map(item => (
      <View style={styles.videoContainer} key={item?.Key}>
        <Text style={styles.videoTitle}>{item?.Key}</Text>
        <CustomVideoPlayer videoUrl={`${BASE_URL}${item?.Key}`} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={({nativeEvent}) => {
          // Load more items when 80% of scroll is reached
          const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
          const paddingToBottom = 0.8 * contentSize.height;
          if (
            layoutMeasurement.height + contentOffset.y >= paddingToBottom &&
            loadedCount < videoData.length
          ) {
            loadMoreItems();
          }
        }}
        scrollEventThrottle={400}>
        {renderVideoItems()}
        {loadedCount < videoData.length && (
          <Text style={styles.loadMoreText}>Loading more...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  videoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadMoreText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default VideoUploadList;
