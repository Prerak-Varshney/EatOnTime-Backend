// SDK initialization

import ImageKit from 'imagekit';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

let imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

export default async function setImageToImagekit(filePath) {
    try {
        const fileData = fs.readFileSync(filePath); // Read file as binary data

        const response = await imagekit.upload({
            file: fileData,  // Pass binary data
            fileName: filePath.split('/').pop(),  // Extract filename from path
            fileSizeLimit: 5 * 1024 * 1024,
            extensions: [{ name: "google-auto-tagging", maxTags: 5, minConfidence: 95 }]
        });

        console.log("Upload Successful:", response);
        return response;
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}