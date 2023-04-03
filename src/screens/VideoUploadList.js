import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Heading from '../components/Heading';
import Colors from '../constants/Colors';

const VideoUploadList = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        {/* heading */}
        <Heading color={Colors.white}>Video List</Heading>
      </View>
    </ScrollView>
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
