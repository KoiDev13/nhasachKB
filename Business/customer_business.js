import Customer from '../Entities/Customer.js'
class customer_business {
    //Phần xử lý liên quan dữ liệu của Customer
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
}
export default customer_business