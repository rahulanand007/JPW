import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadFolder = './uploads';
        // Check if the upload folder exists, if not, create it
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }

        const userFolder = path.join(uploadFolder, req.user.id.toString());
        // Check if the user's folder exists, if not, create it
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder);
        }

        cb(null, userFolder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E5)
        cb(null, uniqueSuffix + '-' +file.originalname )
    }
});

const upload = multer({ storage: storage });

export default upload;

