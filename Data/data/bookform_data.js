let models = require('../models')
let Sequelize = require('sequelize')
let Op = Sequelize.Op
let Bookform = models.Bookform
let Detailbookform = models.Detailbookform
class bookform_data {
    insertData(data) {
        return new Promise((resolve, reject) => {
            Bookform.create(data)
                .then(data => resolve(data.dataValues.id))
                .catch(error => reject(new Error(error)))
        })
    }

    updateData(data) {
        return new Promise((resolve, reject) => {
            Detailbookform.update(data, {
                where: {
                    [Op.and]: [
                        { bookId: data.bookId },
                        { bookformId: data.bookformId }
                    ]
                }
            })
                .then(resolve("Update Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    deleteData(data){
        return new Promise((resolve, reject) => {
            Bookform.update({isDeleted : true},{where:{id : data}})
                .then(resolve("Delete Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    loadData(query) {
        return new Promise((resolve, reject) => {
            Bookform.findAll({
                attributes: ['id', 'createdAt'],
                include: [
                    {
                        model: models.Detailbookform,
                        attributes: ['numberBook'],
                        include: [{
                            model: models.Book,
                        }]
                    }
                ],
                where: query
            })
                .then(data => {
                    let bookform = []
                    data.forEach(element => {
                        let detail = []
                        for (let i = 0; i < element.dataValues.Detailbookforms.length; i++) {
                            let book = element.dataValues.Detailbookforms
                            detail.push(book[i].dataValues.Book.dataValues)
                            detail[i].numberBook = book[i].dataValues.numberBook
                        }
                        bookform.push({
                            id: element.dataValues.id,
                            createdAt: element.dataValues.createdAt.toLocaleDateString(),
                            Detail: detail
                        })
                    });
                    resolve(bookform)
                })
                .catch(error => reject(new Error(error)))
        })
    }

    insertDetailData(data) {
        return new Promise((resolve, reject) => {
            Detailbookform.create(data)
                .then(resolve("Insert Complete"))
                .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = bookform_data