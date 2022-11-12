import Receipt from "../Entities/Receipt.js"
class receipt_business {
    loadData(title) {
        return new Promise((resolve, reject) => {
            $.post(`http://localhost:5000/receipt?title=${title}`, function (data) {
                let receipts = []
                for (let i = 0; i < data.length; i++) {
                    receipts.push(new Receipt(data[i].id, data[i].Customer, data[i].Detail,
                        title, data[i].totalValue, data[i].pay, data[i].createdAt))
                }
                resolve(receipts)
            }).then(error => reject(error));
        })
    }

    sendData(data) {
        $.ajax({
            url: 'http://localhost:5000/receipt',
            data: { data: JSON.stringify(data) },
            type: 'POST',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcAddReceipt')
                location.reload()
            }
        });
    }

    updateData(data) {
        $.ajax({
            url: 'http://localhost:5000/receipt',
            data: { data: JSON.stringify(data) },
            type: 'PUT',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUpAndDelReceipt')
                location.reload()
            }
        });
    }

    deleteData(data) {
        $.ajax({
            url: 'http://localhost:5000/receipt',
            data: { data: JSON.stringify(data) },
            type: 'DELETE',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUpAndDelReceipt')
                location.reload()
            }
        });
    }

    showData(data) {
        let list = ``
        for (let i = 0; i < data.length; i++) {
            list += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].isCreated}</td>
                <td>${data[i].customer.fullname}</td>
                <td>${data[i].customer.phone}</td>
                <td>${data[i].pay}</td>
                <td><input type="button" value="Cập Nhật" data-toggle="modal" data-target="#modelReceipt" onclick="Update(${i})"></td>
                <td><input type="checkbox" class="receipt" id="${data[i].id}"></td>
            </tr>
                        `
        }
        return list
    }

    titleData(row, book, list) {
        let index = parseInt(row.children[0].innerHTML)
        if (book) {
            if (!list.includes(book.title)) {
                row.children[2].innerHTML = book.genre
                row.children[3].children[0].dataset.quantity = book.quantity
                row.children[3].children[0].value = ''
                row.children[4].innerHTML = book.price
                row.id = book.id
                list[index - 1] = book.title
            } else {
                alert("Sách hiện đang có trong hóa đơn")
                if (!list[index - 1]) {
                    row.children[1].children[0].value = ""
                } else {
                    row.children[1].children[0].value = list[index - 1]
                }
            }
        } else {
            alert("Sách không tồn tại trong hệ thống")
            if (!list[index - 1]) {
                row.children[1].children[0].value = ""
            } else {
                row.children[1].children[0].value = list[index - 1]
            }
        }
    }

    quantityData(element, minQuantityAfterSell) {
        let oldQuantity = parseInt(element.getAttribute('data-quantity'))
        let newQuantity = parseInt(element.value)
        if (oldQuantity - newQuantity < minQuantityAfterSell || newQuantity <= 0) {
            alert('Số lượng đầu sách đang thấp hơn theo quy định')
            if (oldQuantity == minQuantityAfterSell) {
                element.value = ""
            } else {
                element.value = (oldQuantity - minQuantityAfterSell <= 0) ? '' : oldQuantity - minQuantityAfterSell
            }
        } 
    }

    addData(row) {
        if (!row.children[1].children[0].value) {
            alert("Chưa nhập tên sách")
        } else if (!row.children[3].children[0].value) {
            alert("Chưa nhập số lượng")
        } else {
            let tr = document.createElement('tr')
            tr.id = ""
            tr.innerHTML = `
            <td>${document.getElementById('list').childElementCount + 1}</td>
            <td><input type="text" onchange="titleBook(this)"></td>
            <td></td>
            <td><input type="number" style="width: 100px;" onchange="quantityBook(this)"></td>
            <td></td>
            <td><button class="btn btn-success" onclick="delRow(this)">Xóa</button></td>
            `
            document.getElementById('list').appendChild(tr)
        }
    }

    removeData(element, list) {
        let row = element.parentElement.parentElement
        let index = parseInt(row.children[0].innerHTML)
        row.remove()
        let rows = document.getElementById('list').children
        for (let i = 0; i < rows.length; i++) {
            rows[i].children[0].innerHTML = i + 1
        }
        list.splice(index - 1, 1)
    }

    modalData(data, keyword) {
        let detail = ''
        data[keyword].detail.forEach(element => {
            detail += `
            <tr>
                <td>${element.title}</td>
                <td>${element.numberBook}</td>
                <td>${element.price}</td>
            </tr>
            `
        });
        return `
        <h5>Khách hàng : ${data[keyword].customer.fullname}</h5>
        <h5>Tổng giá trị hóa đơn : ${data[keyword].totalValue}</h5>
        <h5>Số tiền đã thanh toán : ${data[keyword].pay}</h5>
        <hr style="background-color:black">
        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sách</th>
                                    <th>Số lượng đã mua</th>
                                    <th>Đơn giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${detail}
                            </tbody>
                        </table>
        <label>Số tiền cần điều chỉnh : </label>
        <input type="number" id="receipt_update" style="width:80px" value="0"> <br>
        Lưu ý số tiền được chỉnh phải nhỏ hơn tổng giá trị hóa đơn này
        `
    }

    checkData(customer, maxDebt, list, date) {
        if (customer) {
            document.getElementById('buttonShow').dataset.toggle = "modal"
            if (customer.debt > maxDebt) {
                document.getElementById('modal-body').innerHTML =
                    `<h5>Tài khoản khách hàng hiện đang nợ vượt quá quy định.<br>
                    Khách hàng không thể thực hiện mua bán theo hóa đơn hiện có.<br>
                    Liên hệ với bộ phận thu tiền để biết thêm chi tiết</h5>`
                document.getElementById('buttonSave').style.display = "none"
            } else {
                document.getElementById('buttonSave').style.display = ""
                let data = []
                for (let i = 0; i < list.length; i++) {
                    let dataBook = {
                        id: parseInt(list[i].id),
                        title: list[i].children[1].children[0].value,
                        genre: list[i].children[2].innerHTML,
                        author: null,
                        quantity: parseInt(list[i].children[3].children[0].getAttribute('data-quantity')),
                        price: parseInt(list[i].children[4].innerHTML),
                        numberBook: parseInt(list[i].children[3].children[0].value)
                    }
                    data.push(dataBook)
                }
                let receipt = new Receipt(null, customer, data, false, null, null, date.toLocaleDateString())
                document.getElementById('fullname').innerHTML = `Khách hàng : ${receipt.customer.fullname}`
                let bookDetail = ''
                let total = 0
                for (let i = 0; i < receipt.detail.length; i++) {
                    bookDetail += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${receipt.detail[i].title}</td>
                        <td>${receipt.detail[i].numberBook}</td>
                        <td>${receipt.detail[i].price}</td>
                    </tr>
                    `
                    total = receipt.detail[i].sumPrice(total)
                }
                document.getElementById('detail').innerHTML = bookDetail
                receipt.totalValue = total
                document.getElementById('total').innerHTML = `Tổng giá trị thanh toán : ${total}`
                return receipt
            }
        } else {
            alert("Khách hàng không tồn tại trên hệ thống")
            document.getElementById('buttonShow').dataset.toggle = ""
        }
    }

    listData(data) {
        let id = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].checked) {
                id.push(parseInt(data[i].id))
            }
        }
        return id
    }
}
export default receipt_business