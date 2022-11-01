let models = require('../models')
let Customer = models.Customer
class customer_data {
    insertData(data) {
        return new Promise((resolve, reject) => {
            Customer.create(data)
                .then(resolve("Insert Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    updateData(data){
        return new Promise((resolve, reject) => {
            Customer.update(data,{where:{id : data.id}})
                .then(resolve("Update Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    loadData() {
        return new Promise((resolve, reject) => {
            Customer.findAll({
                attributes: ['id', 'fullname', 'address', 'phone', 'email', 'debt']
            })
                .then(data => {
                    let customer = []
                    data.forEach(element => {
                        customer.push(element.dataValues)
                    })
                    resolve(customer);
                })
                .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = customer_data