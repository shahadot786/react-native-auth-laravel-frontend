import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';

const ImagePickerCom = ({validateImage, pickCameraImage, pickGalleryImage}) => {
  return (
    <View style={[styles.button, styles.rowView]}>
      <Text style={{color: Colors.primary}}>Select Image:</Text>
      <TouchableOpacity activeOpacity={0.6} onPress={pickCameraImage}>
        <Icon name="camera" size={22} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={pickGalleryImage}>
        <Icon name="image" size={22} color={Colors.white} />
      </TouchableOpacity>
      {validateImage && (
        <Text
          style={{
            color: Colors.danger,
            textAlign: 'center',
            marginTop: 5,
          }}>
          Image is required!
        </Text>
      )}
    </View>
  );
};

export default ImagePickerCom;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
  },
  rowView: {
    flexDirection: 'row',
    gap: 20,
  },
});
