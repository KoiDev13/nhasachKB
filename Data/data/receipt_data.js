let models = require('../models')
let Receipt = models.Receipt
let Detailreceipt = models.Detailreceipt
class receipt_data {
    insertData(data) {
        return new Promise((resolve, reject) => {
            Receipt.create(data)
                .then(data => resolve(data.dataValues.id))
                .catch(error => reject(new Error(error)))
        })
    }

    updateData(data){
        return new Promise((resolve, reject) => {
            Receipt.update(data,{where:{id : data.id}})
                .then(resolve("Update Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    deleteData(data){
        return new Promise((resolve, reject) => {
            Receipt.update({isDeleted : true},{where:{id : data}})
                .then(resolve("Delete Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    loadData(query) {
        return new Promise((resolve, reject) => {
            Receipt.findAll({
                attributes: ['id', 'totalValue', 'pay', 'createdAt'],
                include: [{ model: models.Customer },
                {
                    model: models.Detailreceipt,
                    attributes: ['numberBook'],
                    include: [{
                        model: models.Book,
                    }]
                }],
                where: query
            })
                .then(data => {
                    let receipt = []
                    //console.log(data[0].dataValues.Detailreceipts[0])
                    data.forEach(element => {

                        let detail = []
                        for (let i = 0; i < element.dataValues.Detailreceipts.length; i++) {
                            let book = element.dataValues.Detailreceipts
                            detail.push(book[i].dataValues.Book.dataValues)
                            detail[i].numberBook = book[i].dataValues.numberBook
                        }
                        receipt.push({
                            id: element.dataValues.id,
                            totalValue: element.dataValues.totalValue,
                            pay: element.dataValues.pay,
                            createdAt: element.dataValues.createdAt.toLocaleDateString(),
                            Customer: element.dataValues.Customer.dataValues,
                            Detail: detail
                        })
                    });
                    resolve(receipt)
                })
                .catch(error => reject(new Error(error)))
        })
    }

    insertDetailData(data) {
        return new Promise((resolve, reject) => {
            Detailreceipt.create(data)
                .then(resolve("Insert Complete"))
                .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = receipt_data