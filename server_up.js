const express = require('express');
const path = require('path');
const multer = require('multer');
const exec = require('child_process').exec;
const os = require('os');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/upload.html"));
});

app.post('/', multer({
    dest: '/tmp/samplefup/'
}).single('file'), (req, res, next) => {
    // multerが/tmp/samplefup/配下にファイルを作成
    console.log(req.file);
    console.log(os.userInfo().homedir);
    // req.file.pathでmulterが作成したファイルのパスを取得可能
    const option_0 = 'tf-pose-estimation/run_video3.py';
    const option_1 = ' --model=mobilenet_thin --resize=432x368';
    const option_2 = ` --video=${req.file.path}`;
    const option_3 = ` --write_video=${os.userInfo().homedir}/Desktop/out.mp4`;
    const cmd = 'python ' + path.join(__dirname, option_0) + option_1 + option_2 + option_3;

    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
        console.log(stdout);
    });

    res.sendFile(path.join(__dirname, "public/upload.html"));
});

app.listen(process.env.port || port, () => {
    console.log(`Example app listening on port!`)
});