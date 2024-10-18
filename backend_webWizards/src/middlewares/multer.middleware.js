import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Log destination directory
        // console.log("Destination directory:", "./files");
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        // Log original filename
        console.log("Original filename:", file.originalname);
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage,
});