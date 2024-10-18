import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config()


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw"
        })
        // file upload successfully

        // console.log("successfully upload on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const uploadCoverImageOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image"
        })
        // file upload successfully

        // console.log("successfully upload on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}


const deleteOnCloudinary = async (public_id, resource_type) => {
    if (!public_id) return null
    try {
        return await cloudinary.uploader.destroy(public_id, {
            resource_type,
        })
    } catch (error) {
        console.log(error)
        return null
    }
}


export { uploadOnCloudinary, deleteOnCloudinary, uploadCoverImageOnCloudinary }