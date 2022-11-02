import Moneynote from '../Entities/Moneynote.js'
class moneynote_business {
    loadData(title) {
        return new Promise((resolve, reject) => {
            $.post(`http://localhost:5000/moneynote?title=${title}`, function (data) {
                let moneynotes = []
                for (let i = 0; i < data.length; i++) {
                    moneynotes.push(new Moneynote(data[i].id, data[i].Customer,
                        title, data[i].moneyCollect, data[i].createdAt))
                }
                resolve(moneynotes)
            }).then(error => reject(error));
        })
    }

    checkData(data) {
        if (data.Person == null) {
            return 'Dữ liệu khách hàng không tồn tại trong hệ thống'
        } else {
            let moneynote = new Moneynote(null, data.Person, false, data.MoneyCollect, data.IsCreated)
            let info = moneynote.checkClass(null)
            if (typeof info === 'string') {
                return info
            } else {
                return moneynote
            }
        }
    }

    sendData(data) {
        $.ajax({
            url: 'http://localhost:5000/moneynote',
            data: { data: JSON.stringify(data) },
            type: 'POST',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcAddMoneyNote')
                location.reload()
            }
        });
    }

    updateData(data) {
        $.ajax({
            url: 'http://localhost:5000/moneynote',
            data: { data: JSON.stringify(data) },
            type: 'PUT',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUpAndDelMoneyNote')
                location.reload()
            }
        });
    }

    deleteData(data) {
        $.ajax({
            url: 'http://localhost:5000/moneynote',
            data: { data: JSON.stringify(data) },
            type: 'DELETE',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUpAndDelMoneyNote')
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
                <td>${data[i].moneyCollect}</td>
                <td><input type="button" value="Cập Nhật" data-toggle="modal" data-target="#modelMoneynote" onclick="Update(${i})"></td>
                <td><input type="checkbox" class="moneynote" id="${data[i].id}"></td>
            </tr>
                        `
        }
        return list
    }

    modalData(data, keyword) {
        return `
        <h5>Khách hàng : ${data[keyword].customer.fullname}</h5>
        <h5>Tiền nợ mới nhất : ${data[keyword].customer.debt}</h5>
        <h5>Số tiền theo phiếu thu là : ${data[keyword].moneyCollect}</h5>
        <hr style="background-color:black">
        <label>Số tiền cần điều chỉnh : </label>
        <input type="number" id="moneynote_update" style="width:80px"> <br>
        Lưu ý số tiền được chỉnh trong khoảng lớn hơn 0 và nhỏ hơn tiền nợ trước khi có phiếu thu nhập này
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
export default moneynote_business