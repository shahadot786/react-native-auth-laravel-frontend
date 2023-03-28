import {S3} from 'aws-sdk';
import {FileNameToDateStringWithExtensions} from '../date_time/FileNameToDateStringWithExtension';

export const UploadFileOnS3 = async filePath => {
  const url = filePath?.path;
  const bucketName = 'shahadot-tfp-hellosuperstars';

  const fileName = filePath?.path.split('/').pop();
  const type = filePath?.mime;
  const newFilename = FileNameToDateStringWithExtensions(fileName);

  const s3 = new S3({
    accessKeyId: 'AKIAXO5VROGDSZOY5JUX',
    secretAccessKey: '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',
    region: 'ap-southeast-1',
  });

  const response = await fetch(url);
  const blob = await response.blob();
  const fileKey = `${newFilename}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: 'uploads/' + fileKey,
    Body: blob,
    ContentType: type,
    ACL: 'public-read',
  };

  try {
    // Check if previous file exists and delete it
    const listParams = {
      Bucket: bucketName,
      Prefix: 'uploads/',
    };
    const fileList = await s3.listObjects(listParams).promise();
    const deleteKeys = fileList.Contents.filter(
      file =>
        file.Key.includes('uploads/') && file.Key !== `uploads/${fileKey}`,
    ).map(file => ({Key: file.Key}));
    if (deleteKeys.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: deleteKeys,
          Quiet: false,
        },
      };
      const deleteResponse = await s3.deleteObjects(deleteParams).promise();
      console.log('Previous file(s) deleted successfully', deleteResponse);
    }

    // Upload the new file
    const uploadResponse = await s3
      .upload(uploadParams)
      .on('httpUploadProgress', progress => {
        const uploadedBytes = progress.loaded;
        const totalBytes = progress.total;
        const percentCompleted = Math.round((uploadedBytes / totalBytes) * 100);
        console.log(`Uploaded ${percentCompleted}%`);
        const progressBar = uploadedBytes / totalBytes;
      })
      .promise();
    console.log('File uploaded successfully', uploadResponse);

    // Return the URL of the new file
    return {uploadResponse};
  } catch (error) {
    console.error('Error updating file', error);
  }
};
