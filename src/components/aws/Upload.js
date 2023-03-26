const Upload = async (imagePath, newFilename, type) => {
  // Set your AWS S3 configuration
  const file = {
    uri: imagePath,
    name: newFilename,
    type: type,
  };

  const options = {
    keyPrefix: 'uploads/',
    accessKey: 'AKIAXO5VROGDSZOY5JUX',
    secretKey: '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',
    region: 'ap-southeast-1',
    bucket: 'shahadot-tfp-hellosuperstars',
    successActionStatus: 201,
  };

  RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error('Failed to upload image to S3');
    //console.log(response.body);
  });
};

export default Upload;
