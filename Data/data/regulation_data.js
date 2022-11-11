let models = require('../models')
let Regulation = models.Regulation
let Rule = models.Rule
class regulation_data {
    loadData(query) {
        return new Promise((resolve, reject) => {
            Regulation.findOne({
                where: { title: query },
                include: [{ model: models.Rule }],
            })
                .then(data => {
                    resolve(data.dataValues);
                })
                .catch(error => reject(new Error(error)))
        })
    }

    updateDetailData(data) {
        return new Promise((resolve, reject) => {
            Rule.update(data.rules, { where: { regulationId: data.id } })
                .then(resolve("Update Complete"))
                .catch(error => reject(new Error(error)))
        })
    }
}
module.exports = regulation_data