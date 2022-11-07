import Bookform from "../Entities/Bookform.js"
class bookform_business {
    loadData(title) {
        return new Promise((resolve, reject) => {
            $.post(`http://localhost:5000/bookform?title=${title}`, function (data) {
                let bookforms = []
                for (let i = 0; i < data.length; i++) {
                    bookforms.push(new Bookform(data[i].id, data[i].Detail, title, data[i].createdAt))
                }
                resolve(bookforms)
            }).then(error => reject(error));
        })
    }

    updateData(data) {
        $.ajax({
            url: 'http://localhost:5000/bookform',
            data: { data: JSON.stringify(data) },
            type: 'PUT',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUpAndDelBookForm')
                location.reload()
            }
        });
    }

    deleteData(data) {
        $.ajax({
            url: 'http://localhost:5000/bookform',
            data: { data: JSON.stringify(data) },
            type: 'DELETE',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUpAndDelBookForm')
                location.reload()
            }
        });
    }

    sendData(data) {
        $.ajax({
            url: 'http://localhost:5000/bookform',
            data: { data: JSON.stringify(data) },
            type: 'POST',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcAddBookForm')
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
                <td><input type="button" value="Cập Nhật" data-toggle="modal" data-target="#modelBookform" onclick="Update(${i})"></td>
                <td><input type="checkbox" class="bookform" id="${data[i].id}"></td>
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
                row.children[3].innerHTML = book.author
                row.children[4].children[0].dataset.quantity = book.quantity
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

    addData(row) {
        if (!row.children[1].children[0].value) {
            alert("Chưa nhập tên sách")
        } else if (!row.children[4].children[0].value) {
            alert("Chưa nhập số lượng")
        } else {
            let tr = document.createElement('tr')
            tr.id = ""
            tr.innerHTML = `
            <td>${document.getElementById('list').childElementCount + 1}</td>
            <td><input type="text" onchange="titleBook(this)"></td>
            <td></td>
            <td></td>
            <td><input type="text" style="width: 100px;" onchange="quantityBook(this)"></td>
            <td><button class="btn btn-success" onclick="delRow(this)">Xóa</button></td>
            `
            document.getElementById('list').appendChild(tr)
        }
    }

    quantityData(element, QD) {
        let oldQuantity = parseInt(element.getAttribute('data-quantity'))
        let newQuantity = parseInt(element.value)
        if (!newQuantity){
            alert('Chưa nhập số lượng sách nhập')
            element.value = QD.rules.minReceive
        }else if (oldQuantity >= QD.rules.minQuantityBeforeReceive) {
            alert('Số lượng của đầu sách này hiện đã đủ theo quy định về nhập sách')
            element.value = ""
        } else if (newQuantity < QD.rules.minReceive) {
            alert('Số lượng sách nhập chưa đúng theo quy định')
            element.value = QD.rules.minReceive
        }
    }

    saveData(elements) {
        let data = []
        for (let i = 0; i < elements.length; i++) {
            let dataBook = {
                id: parseInt(elements[i].id),
                title: elements[i].children[1].children[0].value,
                genre: elements[i].children[2].innerHTML,
                author: elements[i].children[3].innerHTML,
                quantity: parseInt(elements[i].children[4].children[0].getAttribute('data-quantity')),
                numberBook: parseInt(elements[i].children[4].children[0].value)
            }
            data.push(dataBook)
        }
        let date = new Date()
        let bookform = new Bookform(null, data, false, date.toLocaleDateString())
        return bookform
    }

    modalData(data, keyword) {
        let detail = ''
        data[keyword].detail.forEach(element => {
            detail += `
            <tr>
                <td>${element.title}</td>
                <td>${element.numberBook}</td>
                <td><input type="number" data-quantity="${element.quantity - element.numberBook}" style="width: 100px;"
                onchange="quantityBook(this)" value="${element.numberBook}"></td>
            </tr>
            `
        });
        return `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Sách</th>
                    <th>Số lượng đã nhập</th>
                    <th>Số lượng điều chỉnh</th>
                </tr>
            </thead>
            <tbody id="modal-detail-update">
                ${detail}
            </tbody>
        </table>
        Lưu ý số lượng nhập điều chỉnh phải tuân thủ theo quy định nhập sách
        `
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
export default bookform_business