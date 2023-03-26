export const FileNameToDateStringWithExtensions = fileName => {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now();
  // Convert the timestamp to a string
  const dateString = timestamp.toString();
  // Extract the file extension from the original filename
  const extension = fileName.substring(fileName.lastIndexOf('.'));
  // Construct the new filename with the timestamp and extension
  const newFilename = dateString + extension;
  // Replace the old filename with the new filename in the path
  // const newPath = selectedImage.path.replace(fileName, newFilename);
  return newFilename;
};
