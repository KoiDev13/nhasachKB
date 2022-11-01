let models = require('../models')
let Receive = models.Receive
let Bookreceive = models.Bookreceive
let Books = Receive.hasMany(Bookreceive,{as:'books'})
class book_received_data{
    insertData(data){
        return new Promise((resolve, reject) => {
            Receive.create(data, { include: [{
                association: Books,
                as : 'books'
            }]})
            .then(resolve("Insert Completed"))
            .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = book_received_data