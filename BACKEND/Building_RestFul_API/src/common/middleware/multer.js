import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

    console.log(file.mimetype);
    console.log(file);
    
    
    if(allowed.includes(file.mimetype)){
        cb(null, true)
    }else {
        cb(new Error("file type not supported"), false)
    }
  }


export const upload = multer({
    storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})