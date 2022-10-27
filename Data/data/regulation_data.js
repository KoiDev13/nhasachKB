let models = require('../models')
let Regulation = models.Regulation
let Rule = models.Rule
let Rules = Regulation.hasMany(Rule,{as:'rules'})
class regulation_data {
    insertData(data) {
        return new Promise((resolve, reject) => {
            Regulation.create(data,{include:[{
                association: Rules,
                as : 'rules'
            }]})
                .then(resolve("Insert Completed"))
                .catch(error => reject(new Error(error)))
        })
    }

    loadData(query) {
        return new Promise((resolve, reject) => {
            Regulation.findOne({
                where:{title : query},
                include:[{model : models.Rule}],
            })
                .then(data => {
                    resolve(data.dataValues);
                })
                .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = regulation_data