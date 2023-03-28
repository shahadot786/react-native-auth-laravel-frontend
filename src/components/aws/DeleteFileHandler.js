import {S3} from 'aws-sdk';

export const DeleteFileHandler = async (fileKey, setPreviewVideo) => {
  try {
    const bucketName = 'shahadot-tfp-hellosuperstars';
    const s3 = new S3({
      accessKeyId: 'AKIAXO5VROGDSZOY5JUX',
      secretAccessKey: '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',
      region: 'ap-southeast-1',
    });

    const deleteParams = {
      Bucket: bucketName,
      Key: fileKey,
    };
    const deleteResponse = s3.deleteObject(deleteParams, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log(data);
        setPreviewVideo(false);
      }
    });
    //console.log('delete response => ', deleteResponse);
  } catch (error) {
    console.log(error);
  }
};
