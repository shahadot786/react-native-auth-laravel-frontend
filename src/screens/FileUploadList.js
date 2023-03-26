import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const FileUploadList = ({route, navigation}) => {
  const data = route.params.awsData;
  console.log('data => ', data);
  return (
    <View>
      <Text>FileUploadList</Text>
    </View>
  );
};

export default FileUploadList;

const styles = StyleSheet.create({});
