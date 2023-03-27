import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const FileUploadList = ({route, navigation}) => {
  const data = route.params.awsData;
  //console.log('Upload data => ', data);
  return (
    <View style={styles.container}>
      <Image
        source={{uri: data?.postResponse.location}}
        style={{
          width: 350,
          height: 250,
          marginVertical: 15,
          borderRadius: 15,
        }}
      />
    </View>
  );
};

export default FileUploadList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 25,
    backgroundColor: Colors.black,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
