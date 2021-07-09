const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
//const { default: VideoUploadPage } = require('../../client/src/components/views/VideoUploadPage/VideoUploadPage');

//=================================
//             Video 
//=================================

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }, 
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		if (ext !== '.mp4' || ext !== '.png') {
			return cb(new Error('only mp4, png is allowed'), false);
		}
		cb(null, true)
	}
});

const upload = multer({storage: storage}).single("file")
// 여기 조금 다르다 let이 없음 
// let fileFilter = (req, file, cb) => {
//     const ext = path.extname(file.originalname)
//     if (ext !== '.mp4' || ext !== '.png') {
//         return cb(new Error('only mp4, png is allowed'), false);
//     }
//     cb(null, true)
// }

// router.post('/api/video/uploadfiles', )이지만 
// index.js 추가 내용 덕분에 api video 삭제 가능 

router.post('/uploadfiles', (req, res) => { // req : 'files' from ondrop 
	//비디오를 서버에 저장 npm install multer --save할 차례 
    upload(req, res, err => {
		if (err){
			return res.json({ success: false, err})
		}
		return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
	}) // url : 파일을 저장하는 경로 
})


module.exports = router;