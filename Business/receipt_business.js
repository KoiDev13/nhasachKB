import Receipt from "../Entities/Receipt.js"
class receipt_business {
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

    titleData(row, book, list) {
        let index = parseInt(row.children[0].innerHTML)
        if (book) {
            if (!list.includes(book.title)) {
                row.children[2].innerHTML = book.genre
                row.children[3].children[0].dataset.quantity = book.quantity
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
        if (oldQuantity - newQuantity < minQuantityAfterSell) {
            alert('Số lượng đầu sách đang thấp hơn theo quy định')
            element.value = oldQuantity - minQuantityAfterSell
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
            <td><input type="text" style="width: 100px;" onchange="quantityBook(this)"></td>
            <td></td>
            <td><button class="btn btn-success" onclick="delRow(this)">Xóa</button></td>
            `
            document.getElementById('list').appendChild(tr)
        }
    }

    removeData(element,list){
        let row = element.parentElement.parentElement
        let index = parseInt(row.children[0].innerHTML)
        row.remove()
        let rows = document.getElementById('list').children
        for (let i = 0; i < rows.length; i++) {
            rows[i].children[0].innerHTML = i + 1
        }
        list.splice(index - 1, 1)
    }

    modalData(customer, maxDebt, list, date) {
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
                let receipt = new Receipt(null, customer, list, false, null, null, date.toLocaleDateString())
                console.log(receipt)
                document.getElementById('fullname').innerHTML = `Khách hàng : ${receipt.customer.fullname}`
                let bookDetail = ''
                let total = 0
                for (let i = 0; i < receipt.detail.length; i++) {
                    bookDetail += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${receipt.detail[i].title}</td>
                        <td>${receipt.detail[i].change}</td>
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
}
export default receipt_business