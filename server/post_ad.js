const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/',limits: {
    fieldSize: 50 * 1024 * 1024,
    fileSize: 50 * 1024 * 1024
  }})

const router = express.Router()
router.get('/',(request,response)=>{
    const connection = db.connect()
    const statement = `select c.cat_name,u.uname,p.ad_id,p.ad_title,p.ad_description,p.price_original,p.price_final,p.thumbnail from Post_ad p
    INNER JOIN Category c ON(c.cat_id = p.cat_id)
    INNER JOIN User u ON(u.uid = p.uid)`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

// router.post('/',(request,response)=>{

//     const {cat_id,uid,ad_title,ad_description,price_original,price_final} = request.body
//     const connection = db.connect()
//     console.log(request.body)
//     const statement = `insert into Post_ad(cat_id,uid,ad_title,ad_description,price_original,price_final) values(${cat_id},${uid},'${ad_title}','${ad_description}',${price_original},${price_final})`
//     console.log(statement)
//     connection.query(statement,(error,data)=>{
//         console.log(error)
//         connection.end()
//         response.send(utils.createResult(error,data))
//     })
// })
router.post('/', upload.single('thumbnail'), (request, response) => {
    const {cat_id,uid,ad_title,ad_description,price_original,price_final} = request.body
    console.log(request)
    const thumbnail = request.file.filename
    //console.log(thumbnail)
    const connection = db.connect()
    const statement = `insert into Post_ad(cat_id,uid,ad_title,ad_description,price_original,price_final,thumbnail) values(${cat_id},${uid},'${ad_title}','${ad_description}',${price_original},${price_final},'${thumbnail}')`
    connection.query(statement, (error, data) => {
       console.log(data)
        connection.end()
       
       response.send(utils.createResult(error, data))
    response.send()
     })
})

// router.post('/', upload.single('thumbnail'), (request, response) => {
//     // const {cat_id,uid,ad_title,ad_description,price_original,price_final} = request.body
//     const thumbnail = request.file.filename
//     console.log(thumbnail)
//     const connection = db.connect()
//     const statement = `insert into Post_ad(cat_id,uid,ad_title,ad_description,price_original,price_final,thumbnail) values(${cat_id},${uid},'${ad_title}','${ad_description}',${price_original},${price_final},'${thumbnail}')`
//     connection.query(statement, (error, data) => {
//         console.log(data)
//         connection.end()
//         response.send(utils.createResult(error, data))
//     })
// })

// router.post('/',(request,response)=>{
//     const {cat_id,uid,ad_title,ad_description,price_original,price_final,thumbnail} = request.body
//     const connection = db.connect()
//     const statement = `insert into Post_ad(cat_id,uid,ad_title,ad_description,price_original,price_final,thumbnail) values(${cat_id},${uid},'${ad_title}','${ad_description}',${price_original},${price_final},'${thumbnail}')`
//     connection.query(statement, (error, data) => {
//         connection.end()
//         response.send(utils.createResult(error, data))
//     })

// })
router.delete('/:ad_id',(request,response)=>{
    const {ad_id} = request.params
    const connection = db.connect()
    const statement = `delete from Post_ad where ad_id = ${ad_id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
router.get('/details/:ad_id', (request, response) => {
    const {ad_id} = request.params
    const connection = db.connect()
    const statement = `select c.cat_name,u.uname,u.mobile_no,u.email,u.address,p.ad_id,p.ad_title,p.ad_description,p.price_original,p.price_final,p.thumbnail from Post_ad p
    INNER JOIN Category c ON(c.cat_id = p.cat_id)
    INNER JOIN User u ON(u.uid = p.uid) where ad_id= ${ad_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        if (data.length > 0) {
            response.send(utils.createResult(error, data[0]))
        } else {
            response.send(utils.createResult('ad does not exist'))
        }
    })
})
router.get('/myAd/:uid', (request, response) => {
    const {uid} = request.params
    const connection = db.connect()
    const statement = `select * from Post_ad where uid = ${uid}`
    connection.query(statement, (error, data) => {
        console.log(statement)
        connection.end()
        response.send(utils.createResult(error, data))
    })
})
router.get('/edit/:ad_id', (request, response) => {
    const {ad_id} = request.params
    const connection = db.connect()
    const statement = `select * from Post_ad where ad_id = ${ad_id}`
    connection.query(statement, (error, data) => {
        console.log(statement)
        connection.end()
        response.send(utils.createResult(error, data))
    })
})
router.get('/myAd/:email', (request, response) => {
    const {uid} = request.params
    const connection = db.connect()
    const statement = `select * from Post_ad where email = '${email}'`
    connection.query(statement, (error, data) => {
        console.log(statement)
        connection.end()
        response.send(utils.createResult(error, data))
    })
})
router.put('/update/:ad_id',  (request, response) => {
    const {cat_id,uid,ad_title,ad_description,price_original,price_final} = request.body
    const {ad_id} = request.params
    //const thumbnail = request.file.filename
    //console.log(thumbnail)
    const connection = db.connect()
    const statement = `update Post_ad set cat_id=${cat_id},uid=${uid},ad_title = '${ad_title}',ad_description = '${ad_description}',price_original = ${price_original},price_final = ${price_final} where ad_id = ${ad_id} `
    connection.query(statement, (error, data) => {
        console.log(data)
       // const user = users[0]
        // const info = {
        //     ad_id: user['ad_id']
        // }
        connection.end()

        response.send(utils.createResult(error, data))
    })
})

module.exports = router