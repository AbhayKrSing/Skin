const express = require('express');
const app = express();
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { spawn } = require('child_process')
const sharp = require('sharp');
const fs = require('fs')
require('dotenv').config()
app.use(cors());
const path = require('path');
app.get('/', (req, res) => {
    res.send('I m Live')
})
app.post('/upload', upload.array('files', 12), function (req, res) {
    const files_array = req.files[0]
    // console.log(files_array) //to take one file
    sharp(files_array.path)
        .toFile('./Image/' + files_array.originalname, (err, info) => {
            if (err) {
                console.error(err);
            } else {
                // console.log(info);  //info of writed file like its format,size etc.
                console.log('./Image/' + files_array.originalname); //use karna hai model mey
                fs.unlinkSync(files_array.path);
                const py = spawn('python', ['script.py', './Image/' + files_array.originalname])
                py.stdout.on('data', (data) => {
                    console.log(data.toString())
                })
                py.on('close', (close) => {
                    console.log('Model close at', close);
                    fs.readdir('./Image', (err, files) => {
                        if (err) throw err;

                        for (const file of files) {
                            fs.unlink(path.join('./Image', file), (err) => {
                                if (err) throw err;
                            });
                        }
                    });
                })
                res.send({
                    success: true,
                    message: 'Image File Uploaded'
                })
            }
        });

});

app.listen(process.env.PORT || 3000, () => {
    console.log("server running")
})