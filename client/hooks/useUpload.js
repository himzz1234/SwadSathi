import { useState, useEffect } from "react";

const cloudName = "dnj89k1rw";
const uploadPreset = "swad-sathi";
const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export default function useUpload(image) {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const data = new FormData();

        data.append("file", {
          uri: image,
          type: `test/${image.split(".")[1]}`,
          name: `test.${image.split(".")[1]}`,
        });

        data.append("upload_preset", uploadPreset);
        data.append("cloud_name", cloudName);

        setIsLoading(true);
        const fileUploadResponse = await fetch(cloudinaryBaseUrl, {
          body: data,
          method: "POST",
        });

        const jsonResponse = await fileUploadResponse.json();
        setUploadedImage(jsonResponse.url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (image) uploadImage();
  }, [image]);

  return { uploadedImage, isLoading };
}
