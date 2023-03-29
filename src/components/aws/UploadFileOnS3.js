import {S3} from 'aws-sdk';
import {FileNameToDateStringWithExtensions} from '../date_time/FileNameToDateStringWithExtension';
import {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} from '@env';

export const UploadFileOnS3 = async (filePath, fileType, progressCallback) => {
  //extract the file path and name
  const url = filePath?.path;
  const fileName = filePath?.path.split('/').pop();
  const type = filePath?.mime;
  const newFilename = FileNameToDateStringWithExtensions(fileName);

  //aws s3 configuration
  const bucketName = AWS_BUCKET_NAME;
  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  //fetch the url
  const response = await fetch(url);
  const blob = await response.blob();
  const fileKey = `${newFilename}`;

  //upload params
  const uploadParams = {
    Bucket: bucketName,
    Key: `${fileType}/${fileKey}`,
    Body: blob,
    ContentType: type,
    ACL: 'public-read',
  };

  //upload files
  try {
    // Check if previous file exists and delete it
    const listParams = {
      Bucket: bucketName,
      Prefix: `${fileType}/`,
    };
    const fileList = await s3.listObjects(listParams).promise();
    const deleteKeys = fileList.Contents.filter(
      file =>
        file.Key.includes(`${fileType}/`) &&
        file.Key !== `${fileType}/${fileKey}`,
    ).map(file => ({Key: file.Key}));
    if (deleteKeys.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: deleteKeys,
          Quiet: false,
        },
      };
      //delete previous file
      const deleteResponse = await s3.deleteObjects(deleteParams).promise();
      //console.log('Previous file(s) deleted successfully', deleteResponse);
    }

    // Upload the new file with progress
    const uploadResponse = await s3
      .upload(uploadParams)
      .on('httpUploadProgress', progress => {
        const uploadedBytes = progress.loaded;
        const totalBytes = progress.total;
        //const percentCompleted = Math.round((uploadedBytes / totalBytes) * 100);
        //console.log(`Uploaded ${percentCompleted}%`);
        const progressData = uploadedBytes / totalBytes;
        progressCallback(progressData);
      })
      .promise();
    //console.log('File uploaded successfully', uploadResponse);

    // Return the URL of the new file
    return {uploadResponse};
  } catch (error) {
    console.error('Error updating file', error);
  }
};
