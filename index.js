const express = require('express');
const app = express();
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const sharp = require('sharp');
const fs = require('fs')
require('dotenv').config()
app.use(cors());
app.get('/', (req, res) => {
    res.send('I m Live')
})
app.post('/upload', upload.array('files', 12), function (req, res) {
    const files_array = req.files[0]
    console.log(files_array)
    res.send('file Uploaded')
    sharp(files_array.path)
        .toFile('./Image/' + files_array.originalname, (err, info) => {
            if (err) {
                console.error(err);
            } else {
                console.log(info);
                fs.unlinkSync(files_array.path);
            }
        });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server running")
})