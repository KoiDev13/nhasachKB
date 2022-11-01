let models = require('../models')
let Moneynote = models.Moneynote
class moneynote_data{
    insertData(data){
        return new Promise((resolve,reject)=>{
            Moneynote.create(data)
            .then(resolve("Insert Completed"))
            .catch(error => reject(new Error(error)))
        })
    }

    updateData(data){
        return new Promise((resolve, reject) => {
            Moneynote.update(data,{where:{id : data.id}})
                .then(resolve("Update Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    deleteData(data){
        return new Promise((resolve, reject) => {
            Moneynote.update({isDeleted : true},{where:{id : data}})
                .then(resolve("Delete Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    loadData() {
        return new Promise((resolve, reject) => {
            Moneynote.findAll({
                attributes: ['id', 'moneyCollect', 'createdAt'],
                include:[{model : models.Customer}],
                where : {isDeleted : false}
            })
                .then(data => {
                    let moneynote = []
                    data.forEach(element => {
                        moneynote.push({
                            id : element.dataValues.id,
                            moneyCollect : element.dataValues.moneyCollect,
                            createdAt : element.dataValues.createdAt.toLocaleDateString(),
                            Customer : element.dataValues.Customer.dataValues
                        })
                    })
                    resolve(moneynote);
                })
                .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = moneynote_data