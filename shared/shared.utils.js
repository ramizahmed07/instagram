import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const upload = async (file, userId, folder) => {
  try {
    const { filename, createReadStream } = await file;
    let name = `${folder}/${userId}-${Date.now()}-${filename}`;

    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "instagram-uploads",
        Key: name,
        Body: createReadStream(),
        ACL: "public-read",
      })
      .promise();
    return Location;
  } catch (error) {
    return null;
  }
};
