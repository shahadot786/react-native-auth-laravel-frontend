import {StyleSheet, View, FlatList, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../constants/Colors';
import {S3} from 'aws-sdk';
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} from '@env';
import Video from 'react-native-video';

const VideoUploadList = () => {
  const [videoData, setVideoData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playbackState, setPlaybackState] = useState({}); // state to keep track of playback states for each video
  const videoPlayers = useRef({}); // reference to all video players
  const flatlistRef = useRef(null); // reference to flatlist

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

  // function to stop playback for all videos except the selected one
  const stopAllPlayback = () => {
    Object.keys(playbackState).forEach(key => {
      if (key !== selectedVideo) {
        setPlaybackState(prevState => ({...prevState, [key]: false}));
      }
    });
  };

  const getItemList = async () => {
    try {
      const listParams = {
        Bucket: bucketName,
        Prefix: `${fileType}/`,
      };
      const fileList = await s3.listObjects(listParams).promise();
      const list = fileList?.Contents;
      setVideoData(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  const handleLoad = videoId => {
    setPlaybackState(prevState => ({...prevState, [videoId]: true}));
  };

  const handleEnd = videoId => {
    setPlaybackState(prevState => ({...prevState, [videoId]: false}));
    const nextIndex = videoData.findIndex(item => item?.Key === videoId) + 1;
    if (nextIndex < videoData.length) {
      setSelectedVideo(videoData[nextIndex]?.Key);
      flatlistRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    } else {
      setSelectedVideo(null);
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.videoContainer}>
      <Text style={styles.videoTitle}>{item?.Key}</Text>
      {/* <CustomVideoPlayer videoUrl={`${BASE_URL}${item?.Key}`} /> */}
      <Video
        source={{uri: `${BASE_URL}${item?.Key}`}}
        resizeMode={'contain'}
        style={styles.videoPlayer}
        ref={ref => (videoPlayers.current[item?.Key] = ref)}
        onLoad={() => handleLoad(item?.Key)}
        onEnd={() => handleEnd(item?.Key)}
        onError={error => console.log(error)}
        paused={!playbackState[item?.Key]}
        repeat={false}
      />
    </View>
  );

  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    const firstVisibleItem = viewableItems?.[0];
    if (firstVisibleItem?.index >= 0) {
      stopAllPlayback();
      setSelectedVideo(firstVisibleItem?.item?.Key);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={videoData}
        renderItem={renderItem}
        keyExtractor={item => item?.Key}
        horizontal={false} // change to false for vertical scroll
        ref={flatlistRef}
        //onScroll={stopAllPlayback}
        onViewableItemsChanged={handleViewableItemsChanged}
      />
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
  videoPlayer: {
    width: '90%',
    height: 350,
  },
});

export default VideoUploadList;
