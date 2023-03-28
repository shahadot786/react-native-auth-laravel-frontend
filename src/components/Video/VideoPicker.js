import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';

const VideoPicker = ({validateVideo, handleCameraVideo, pickGalleryVideo}) => {
  return (
    <View style={[styles.button, styles.rowView]}>
      <Text style={{color: Colors.primary}}>Select Video:</Text>
      <TouchableOpacity activeOpacity={0.6} onPress={handleCameraVideo}>
        <Icon name="camera" size={22} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={pickGalleryVideo}>
        <Icon name="video-camera" size={22} color={Colors.white} />
      </TouchableOpacity>
      {validateVideo && (
        <Text
          style={{
            color: Colors.danger,
            textAlign: 'center',
            marginTop: 5,
          }}>
          Video is required!
        </Text>
      )}
    </View>
  );
};

export default VideoPicker;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
  },
  rowView: {
    flexDirection: 'row',
    gap: 20,
  },
});
