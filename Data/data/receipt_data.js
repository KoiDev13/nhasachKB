let models = require('../models')
let Receipt = models.Receipt
let Detailreceipt = models.Detailreceipt
class receipt_data{
    insertData(data){
        return new Promise((resolve,reject)=>{
            Receipt.create(data)
            .then(data => resolve(data.dataValues.id))
            .catch(error => reject(new Error(error)))
        })
    }

    insertDetailData(data){
        return new Promise((resolve,reject)=>{
            Detailreceipt.create(data)
            .then(resolve("Insert Complete"))
            .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = receipt_data