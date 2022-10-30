let express = require('express');
let app = express();
let book_data = require('./data/book_data')
let customer_data = require('./data/customer_data');
let regulation_data = require('./data/regulation_data')
let customer = new customer_data();
let book = new book_data()
let regulation = new regulation_data();
let Sequelize = require('sequelize')
//let receive = new book_received_data()
//let book_received_data = require('./data/book_received_data')
//------------------------
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
})
//Phần quản lý
app.get('/sync',(req,res)=>{
    // let models = require('./models')
    // models.Rule.sync().then(res.send('Sync Complete'))
    //res.send('Dùng để tạo Table')
})
app.get('/send',(req,res)=>{
    // let data = {
        
    // }
    // regulation.insertData(data).then(data => {res.send(data)}).catch(error => console.log(error))
    //res.send('Dùng để tạo Data')
})
// Book Database
app.get('/book',(req,res)=>{
    res.send("Load books")
})

app.post('/book',(req,res)=>{
    book.loadData()
    .then(data => {res.json(data)})
    .catch(error => console.log(error))
})
// Cutomer Database
app.get('/customer',(req,res)=>{
    res.send("Load customers")
})

app.post('/customer',(req,res)=>{
    customer.loadData()
    .then(data => {res.json(data)})
    .catch(error => console.log(error))
})
// Regulation Database
app.get('/regulation',(req,res)=>{
    res.send("Load regulations")
})

app.post('/regulation',(req,res)=>{
    regulation.loadData(req.query.title)
    .then(data => {res.json(data)})
    .catch(error => console.log(error))
})

// Book Received Note Database
// app.get('/receive/bsync',(req,res)=>{
//     receive.syncBookReceiveData()
//     .then(data =>{
//         res.send(data)
//     })
//     .catch(error => console.log(error))
// })

// app.get('/receive/rsync',(req,res)=>{
//     receive.syncReceiveData()
//     .then(data =>{
//         res.send(data)
//     })
//     .catch(error => console.log(error))
// })

// app.get('/receive',(req,res)=>{
//     data = {
//         isDeleted : false,
//         createdAt : Sequelize.literal('NOW()'),
//         updatedAt : Sequelize.literal('NOW()'),
//         books : [
//         {
//             receivedQuantity : 30,
//             bookId : 1
//         },
//         {
//             receivedQuantity : 40,
//             bookId : 2
//         },
//         {
//             receivedQuantity : 50,
//             bookId : 3
//         }
//         ]
//     }
//     receive.insertData(data).then(data => {res.send(data)}).catch(error =>{console.log(error)})
// })


//---------------------
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`)
})