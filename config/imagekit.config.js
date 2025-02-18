// SDK initialization

import ImageKit from 'imagekit';
import fs from 'fs';

import {IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_URL_ENDPOINT} from "./env.js";

let imagekit = new ImageKit({
    publicKey : IMAGEKIT_PUBLIC_KEY,
    privateKey : IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : IMAGEKIT_URL_ENDPOINT
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
        //remove image from file path
        fs.unlinkSync(filePath);
        return response;
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}