let express = require('express');
let app = express();
let bodyParser = require('body-parser')
let book_data = require('./data/book_data')
let customer_data = require('./data/customer_data');
let moneynote_data = require('./data/moneynote_data')
let receipt_data = require('./data/receipt_data')
let regulation_data = require('./data/regulation_data')
let bookform_data = require('./data/bookform_data')
let user_data = require('./data/user_data')
let customer = new customer_data();
let book = new book_data()
let regulation = new regulation_data();
let moneynote = new moneynote_data();
let receipt = new receipt_data();
let bookform = new bookform_data();
let user = new user_data();
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
    // models.User.sync().then(res.send('Sync Complete'))
    //res.send('Dùng để tạo Table')
})
app.get('/send', (req, res) => {
    let data = {
        fullname : 'Bot Test',
        phone : '1',
        debt : 0,
        createdAt : Sequelize.literal('NOW()'),
        updatedAt : Sequelize.literal('NOW()')
    }
    customer.insertData(data).then(data => {console.log(data)}).catch(error => console.log(error))
    //res.send('Dùng để tạo Data')
})
// User Database
app.get('/user', (req, res, next) => {
    res.send('Load users')
})
app.post('/user', (req, res, next) => {
    if (req.body.data) {
        let data = JSON.parse(req.body.data)
        data.createdAt = Sequelize.literal('NOW()')
        data.updatedAt = Sequelize.literal('NOW()')
        user.insertData(data)
            .then(insert => {
                console.log(insert)
                res.json({ info: "Thêm tài khoản thành công" })
            })
            .catch(error => next(error))
    } else {
        let query = {};
        if (req.query.title) {
            query.isDeleted = req.query.title
        }
        user.loadData(query)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
})
app.put('/user', (req, res, next) => {
    let data = JSON.parse(req.body.data)
    user.updateData(data)
        .then(update => {
            console.log(update)
            res.json({ info: "Cập nhật tài khoản thành công" })
        })
        .catch(error => next(error))
})
app.delete('/user', (req, res, next) => {
    let data = JSON.parse(req.body.data)
    console.log(data)
    user.deleteData(data)
        .then(erase => {
            console.log(erase)
            res.json({ info: "Xóa tài khoản thành công" })
        })
        .catch(error => next(error))
})
app.post('/user/account',(req,res)=>{
    let data = JSON.parse(req.body.data)
    user.findData(data)
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))
})
// Book Database
app.get('/book', (req, res) => {
    res.send("Load books")
})
app.post('/book', (req, res, next) => {
    book.loadData()
        .then(data => { res.json(data) })
        .catch(error => next(error))
})
// Cutomer Database
app.get('/customer', (req, res) => {
    res.send("Load customers")
})
app.post('/customer', (req, res, next) => {
    customer.loadData()
        .then(data => { res.json(data) })
        .catch(error => next(error))
})
// Regulation Database
app.get('/regulation', (req, res) => {
    res.send("Load regulations")
})
app.post('/regulation', (req, res, next) => {
    regulation.loadData(req.query.title)
        .then(data => { res.json(data) })
        .catch(error => next(error))
})
app.put('/regulation', (req, res) => {
    let data = JSON.parse(req.body.data)
    regulation.updateDetailData(data)
        .then(update => {
            console.log(update)
            res.json({ info: "Cập nhật quy định thành công" })
        })
        .catch(error => next(error))
})
// Moneynote Database
app.get('/moneynote', (req, res) => {
    res.send("Load money notes")
})
app.post('/moneynote', (req, res, next) => {
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
                    .catch(error => next(error))
            })
            .catch(error => next(error))
    } else {
        let query = {};
        if (req.query.title) {
            query.isDeleted = req.query.title
        }
        moneynote.loadData(query)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
})
app.put('/moneynote', (req, res, next) => {
    let data = JSON.parse(req.body.data)
    moneynote.updateData(data)
        .then(update => {
            console.log(update)
            customer.updateData(data.customer)
                .then(update => {
                    console.log(update)
                    res.json({ info: "Cập nhật phiếu thu thành công" })
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
})
app.delete('/moneynote', (req, res, next) => {
    let data = JSON.parse(req.body.data)
    moneynote.deleteData(data)
        .then(erase => {
            console.log(erase)
            res.json({ info: "Xóa phiếu thu thành công" })
        })
        .catch(error => next(error))
})
// Receipt Database
app.get('/receipt', (req, res) => {
    res.send("Load receipts")
})
app.post('/receipt', (req, res, next) => {
    if (req.body.data) {
        let data = JSON.parse(req.body.data)
        data.customerId = data.customer.id
        data.createdAt = Sequelize.literal('NOW()')
        data.updateAt = Sequelize.literal('NOW()')
        receipt.insertData(data)
            .then(id => {
                for (let i = 0; i < data.detail.length; i++) {
                    let updateDetail = {
                        numberBook: data.detail[i].numberBook,
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
                                .catch(error => next(error))
                        })
                        .catch(error => next(error))
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
            .catch(error => next(error))
    } else {
        let query = {};
        if (req.query.title) {
            query.isDeleted = req.query.title
        }
        receipt.loadData(query)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
})
app.put('/receipt', (req, res, next) => {
    let data = JSON.parse(req.body.data)
    receipt.updateData(data)
        .then(update => {
            console.log(update)
            customer.updateData(data.customer)
                .then(update => {
                    console.log(update)
                    res.json({ info: "Cập nhật hóa đơn thành công" })
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
})
app.delete('/receipt', (req, res, next) => {
    let data = JSON.parse(req.body.data)
    receipt.deleteData(data)
        .then(erase => {
            console.log(erase)
            res.json({ info: "Xóa hóa đơn thành công" })
        })
        .catch(error => next(error))
})
// Bookform Database
app.get('/bookform', (req, res) => {
    res.send("Load receipts")
})
app.post('/bookform', (req, res, next) => {
    if (req.body.data) {
        let data = JSON.parse(req.body.data)
        data.createdAt = Sequelize.literal('NOW()')
        data.updateAt = Sequelize.literal('NOW()')
        bookform.insertData(data)
            .then(id => {
                for (let i = 0; i < data.detail.length; i++) {
                    let insertDetail = {
                        numberBook: data.detail[i].numberBook,
                        bookformId: id,
                        bookId: data.detail[i].id,
                        createdAt: Sequelize.literal('NOW()'),
                        updateAt: Sequelize.literal('NOW()')
                    }
                    bookform.insertDetailData(insertDetail)
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
                        .catch(error => next(error))
                }
                res.json({ info: "Thêm phiếu nhập sách thành công" })
            })
            .catch(error => next(error))
    } else {
        let query = {};
        if (req.query.title) {
            query.isDeleted = req.query.title
        }
        bookform.loadData(query)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
})
app.put('/bookform', (req, res) => {
    let data = JSON.parse(req.body.data)
    for (let i = 0; i < data.detail.length; i++) {
        let updateDetail = {
            numberBook: data.detail[i].numberBook,
            bookformId: data.id,
            bookId: data.detail[i].id,
        }
        bookform.updateData(updateDetail)
            .then(update => {
                console.log(update)
                let updateBook = {
                    quantity: data.detail[i].quantity,
                    id: data.detail[i].id
                }
                book.updateData(updateBook)
                    .then(update => console.log(update))
                    .catch(error => next(error))
            })
            .catch(error => next(error))
    }
    res.json({ info: "Cập nhật phiếu nhập sách thành công" })
})
app.delete('/bookform', (req, res, next) => {
    let data = JSON.parse(req.body.data)
    bookform.deleteData(data)
        .then(erase => {
            console.log(erase)
            res.json({ info: "Xóa phiếu nhập thành công" })
        })
        .catch(error => next(error))
})

//---------------------
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`)
})