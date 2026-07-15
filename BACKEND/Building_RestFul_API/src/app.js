import express from 'express';
import router from './modules/auth/auth.routes.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import ApiResponse from './common/utils/api-response.js';
import path from 'path';
import ownerRouter from './modules/ipl-ms/routes/owner.routes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*
// ----------- Disk Storage ----------

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

// const storage = multer.memoryStorage();

const upload = multer({ storage })
app.post("/upload", upload.array("photos"), (req, res) => {
    console.log(req.file);
    
    ApiResponse.ok(res, { message: "File upload successFully" })
})

*/

/*
// ===== File size Valudation =========
const storage = multer();
const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 2, // 2 mb
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["inage/png", "image/jpeg", "application/pdf"]
    if(allowed.includes(file.mimetype)){
        cb(null, true)
    }else {
        cb(new Error("file type not supported"), false)
    }
  }
});
*/

app.use('/api/auth', router);
app.use("/api/owner", ownerRouter)

export default app;
