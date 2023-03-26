import {View, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import {
  SelectGalleryImage,
  SelectCameraImage,
} from '../services/ResourceSelection';
import ImagePickerCom from '../components/images/ImagePicker';
import Colors from '../constants/Colors';
import Button from '../components/buttons/Button';

const FileUploadS3 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  //pick images
  const pickGalleryImage = async () => {
    try {
      await SelectGalleryImage({setSelectedImage});
    } catch (error) {
      console.log(error);
    }
  };
  //pick camera for image
  const pickCameraImage = async () => {
    try {
      await SelectCameraImage({setSelectedImage});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Heading color={Colors.white}>Upload File into Amazon S3</Heading>
      {/* image preview */}
      <View>
        {/* image preview */}
        {selectedImage && (
          <>
            <Image
              source={{uri: selectedImage.path}}
              style={{
                width: 350,
                height: 250,
                marginVertical: 15,
                borderRadius: 15,
              }}
            />
            {/* <TouchableOpacity
                onPress={cancelHandler}
                style={styles.cancelBtn}
                activeOpacity={0.6}>
                <Icon name="close" size={30} color={Colors.primary} />
              </TouchableOpacity> */}
          </>
        )}
        {/* image */}
        <ImagePickerCom
          pickCameraImage={pickCameraImage}
          pickGalleryImage={pickGalleryImage}
        />
      </View>
      {/* upload button */}
      <View>
        <Button textColor={Colors.white}>Upload</Button>
      </View>
    </View>
  );
};

export default FileUploadS3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 25,
    backgroundColor: Colors.black,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
