const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/'})
const router = express.Router()



router.post('/',upload.single('thumbnail'),(request,response)=>{
    const {thumbnail} = request.body
    const thumbnail = request.file.filename
    const connection = db.connect()
    const statement = `insert into image(thumbanil) values('${thumbnail}')`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
module.exports = router