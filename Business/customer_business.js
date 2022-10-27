import Customer from '../Entities/Customer.js'
class customer_business {
    loadData() {
        return new Promise((resolve, reject) => {
            $.post("http://localhost:5000/customer", function (data) {
                let customers = []
                for (let i = 0; i < data.length; i++) {
                    customers.push(new Customer(data[i].id, data[i].fullname,
                        data[i].address, data[i].phone, data[i].email, data[i].debt))
                }
                resolve(customers)
            }).then(error => reject(error));
        })
    }

    existData(Data, keyword) {
        for (let i = 0; i < Data.length; i++) {
            if(Data[i].Phone == keyword){
                return Data[i]
            }
        }
        return null
    }
}
export default customer_business