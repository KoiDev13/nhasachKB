let express = require('express');
let app = express();
let bodyParser = require('body-parser')
let book_data = require('./data/book_data')
let customer_data = require('./data/customer_data');
let moneynote_data = require('./data/moneynote_data')
let receipt_data = require('./data/receipt_data')
let regulation_data = require('./data/regulation_data')
let customer = new customer_data();
let book = new book_data()
let regulation = new regulation_data();
let moneynote = new moneynote_data();
let receipt = new receipt_data();
let Sequelize = require('sequelize')

//Phần cấu hình
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
})
//Phần quản lý
app.get('/sync', (req, res) => {
    // let models = require('./models')
    // models.Detailreceipt.sync().then(res.send('Sync Complete'))
    //res.send('Dùng để tạo Table')
})
app.get('/send', (req, res) => {
    // let data = {

    // }
    // receipt.insertData(data).then(data => {console.log(data)}).catch(error => console.log(error))
    //res.send('Dùng để tạo Data')
})
// Book Database
app.get('/book', (req, res) => {
    res.send("Load books")
})
app.post('/book', (req, res) => {
    book.loadData()
        .then(data => { res.json(data) })
        .catch(error => console.log(error))
})
// Cutomer Database
app.get('/customer', (req, res) => {
    res.send("Load customers")
})
app.post('/customer', (req, res) => {
    customer.loadData()
        .then(data => { res.json(data) })
        .catch(error => console.log(error))
})
// Regulation Database
app.get('/regulation', (req, res) => {
    res.send("Load regulations")
})
app.post('/regulation', (req, res) => {
    regulation.loadData(req.query.title)
        .then(data => { res.json(data) })
        .catch(error => console.log(error))
})
// Moneynote Database
app.get('/moneynote', (req, res) => {
    res.send("Load money notes")
})
app.post('/moneynote', (req, res) => {
    if (req.body.data) {
        let data = JSON.parse(req.body.data)
        data.customerId = data.customer.id
        data.createdAt = Sequelize.literal('NOW()')
        data.updatedAt = Sequelize.literal('NOW()')
        moneynote.insertData(data)
            .then(insert => {
                console.log(insert)
                customer.updateData(data.customer)
                    .then(update => {
                        console.log(update)
                        res.json({ info: "Thêm phiếu thu thành công" })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    } else {
        let query = {};
        if (req.query.title) {
            query.isDeleted = req.query.title
        }
        moneynote.loadData(query)
            .then(data => res.json(data))
            .catch(error => console.log(error))
    }
})
app.put('/moneynote', (req, res) => {
    let data = JSON.parse(req.body.data)
    moneynote.updateData(data)
        .then(update => {
            console.log(update)
            customer.updateData(data.customer)
                .then(update => {
                    console.log(update)
                    res.json({ info: "Cập nhật phiếu thu thành công" })
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})
app.delete('/moneynote', (req, res) => {
    let data = JSON.parse(req.body.data)
    moneynote.deleteData(data)
        .then(erase => {
            console.log(erase)
            res.json({ info: "Xóa phiếu thu thành công" })
        })
        .catch(error => console.log(error))
})
// Receipt Database
app.get('/receipt', (req, res) => {
    res.send("Load receipts")
})
app.post('/receipt', (req, res) => {
    if (req.body.data) {
        let data = JSON.parse(req.body.data)
        data.customerId = data.customer.id
        data.createdAt = Sequelize.literal('NOW()')
        data.updateAt = Sequelize.literal('NOW()')
        receipt.insertData(data)
            .then(id => {
                for (let i = 0; i < data.detail.length; i++) {
                    let updateDetail = {
                        numberBook: data.detail[i].change,
                        receiptId: id,
                        bookId: data.detail[i].id,
                        createdAt: Sequelize.literal('NOW()'),
                        updateAt: Sequelize.literal('NOW()')
                    }
                    receipt.insertDetailData(updateDetail)
                        .then(insert => {
                            console.log(insert)
                            return `Cập nhật sách thứ ${i + 1}`
                        })
                        .then(text => {
                            console.log(text)
                            let updateBook = {
                                id: data.detail[i].id,
                                quantity: data.detail[i].quantity
                            }
                            book.updateData(updateBook)
                                .then(update => console.log(update))
                                .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                }
                return "Cập nhật khách hàng"
            })
            .then(text => {
                console.log(text)
                customer.updateData(data.customer)
                    .then(update => {
                        console.log(update)
                        res.json({ info: "Thêm hóa đơn bán sách thành công" })
                    })
            })
            .catch(error => console.log(error))
    } else {
        let query = {};
        if (req.query.title) {
            query.isDeleted = req.query.title
        }
        receipt.loadData(query)
            .then(data => res.json(data))
            .catch(error => console.log(error))
    }
})
app.put('/receipt',(req,res)=>{
    let data = JSON.parse(req.body.data)
    receipt.updateData(data)
        .then(update => {
            console.log(update)
            customer.updateData(data.customer)
                .then(update => {
                    console.log(update)
                    res.json({ info: "Cập nhật hóa đơn thành công" })
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})
app.delete('/receipt', (req, res) => {
    let data = JSON.parse(req.body.data)
    receipt.deleteData(data)
        .then(erase => {
            console.log(erase)
            res.json({ info: "Xóa hóa đơn thành công" })
        })
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