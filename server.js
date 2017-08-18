const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const multiparty = require('multiparty')

const saveImageDir = path.resolve(__dirname, "images") 
const saveFileDir = path.resolve(__dirname, "files") 

app.use(bodyParser.json());
app.use(express.static(`${__dirname}`))
app.use(bodyParser.urlencoded({ extended: false })) // 转换 application/x-www-form-urlencoded

app.get('/', (req, res) => {
    console.log("皮皮虾我们倒着走")
    res.redirect('/examples/clip_upload_example.html')
})
app.post('/examples/uploadFile',(req,res)=>{
    existsSync(saveFileDir);
    const form = new multiparty.Form();
    
    form.parse(req, (err, fields, files) => {
        let fileInfo = []
        if (err) throw err
        files.file.forEach((item,index)=>{
            let {path,originalFilename,size} = item
            const name = originalFilename.replace(/.*(\..*)/,`${Date.now()}$1`)
            const f = fs.readFileSync(path)
            fs.writeFileSync(`${saveFileDir}/${name}`,f,'binary')
            fileInfo.push({
                fileName:originalFilename,
                size:`${size}kb`
            })
        })
        res.send({
            code:"SUCCESS",
            result:fileInfo
        })
    })
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

app.set('port', process.env.PORT || 3000)
const port = app.get('port')

app.listen(port, () => console.log(`皮皮虾我们走 :port=> ${port}`))
