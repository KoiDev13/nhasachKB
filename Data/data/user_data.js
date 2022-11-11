let models = require('../models')
let User = models.User
class user_data {
    insertData(data){
        return new Promise((resolve,reject)=>{
            User.create(data)
            .then(resolve("Insert Completed"))
            .catch(error => reject(new Error(error)))
        })
    }

    updateData(data){
        return new Promise((resolve, reject) => {
            User.update(data,{where:{id : data.id}})
                .then(resolve("Update Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    deleteData(data){
        return new Promise((resolve, reject) => {
            User.update({isDeleted : true},{where:{id : data}})
                .then(resolve("Delete Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    loadData(query) {
        return new Promise((resolve, reject) => {
            User.findAll({
                where : query
            })
            .then(data => {
                let user = []
                data.forEach(element => {
                    user.push(element.dataValues)
                })
                resolve(user);
            })
            .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = user_data