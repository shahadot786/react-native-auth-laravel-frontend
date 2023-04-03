import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../components/buttons/Button';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import RouteName from '../constants/RouteName';

const FileUploadList = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        textColor={Colors.white}
        onPress={() => navigation.navigate(RouteName.fileUpload)}>
        Image Upload
      </Button>
      <Button
        onPress={() => navigation.navigate(RouteName.videoUpload)}
        backgroundColor={Colors.primary}
        textColor={Colors.black}>
        Video Upload
      </Button>
      <Button
        onPress={() => navigation.navigate(RouteName.uploadList)}
        textColor={Colors.white}>
        Upload List
      </Button>
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
    justifyContent: 'center',
  },
});
