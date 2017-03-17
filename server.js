const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()

const saveImageDir = path.resolve(__dirname, "images")

app.use(bodyParser());
app.use(express.static(`${__dirname}`))

app.get('/', (req, res) => {
    console.log("皮皮虾我们倒着走")
    res.redirect('/examples')
})
app.post('/examples/uploadImage', (req, res) => {
    existsSync(saveImageDir);
    let { image } = req.body;
    const type = image.match(/^data:image\/(\w*)/)[1] || "png";        //拿到当前是什么图片 jpeg/png
    let base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    let imageData = new Buffer(base64Data, 'base64');         //使用 Buffer转换成二进制
    fs.writeFile(`${saveImageDir}/${Date.now()}.${type}`, imageData, err => {
        if (!err) {
            res.send({ success: 1 })
        }
    });
})

function existsSync(path) {
    const isExists = fs.existsSync(path)
    if (!isExists) {
        fs.mkdirSync(path)
    }
}

app.set('port', process.env.PORT || 1996)
const port = app.get('port')

app.listen(port, () => console.log(`皮皮虾我们走 :port=> ${port}`))
