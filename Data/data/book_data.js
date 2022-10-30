let models = require('../models')
let Book = models.Book
class book_data {
    insertData(data){
        return new Promise((resolve,reject)=>{
            Book.create(data)
            .then(resolve("Insert Completed"))
            .catch(error => reject(new Error(error)))
        })
    }

    loadData() {
        return new Promise((resolve, reject) => {
            Book.findAll({
                attributes: ['id', 'title', 'genre', 'author', 'quantity','price']
            })
            .then(data => {
                let book = []
                data.forEach(element => {
                    book.push(element.dataValues)
                })
                resolve(book);
            })
            .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = book_data