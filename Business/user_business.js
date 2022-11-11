import User from '../Entities/User.js'
class user_business {
    loadData(title) {
        return new Promise((resolve, reject) => {
            $.post(`http://localhost:5000/user?title=${title}`, function (data) {
                let users = []
                for (let i = 0; i < data.length; i++) {
                    users.push(new User(data[i].id, data[i].username, data[i].password, data[i].role, title))
                }
                resolve(users)
            }).then(error => reject(error));
        })
    }

    updateData(data) {
        $.ajax({
            url: 'http://localhost:5000/user',
            data: { data: JSON.stringify(data) },
            type: 'PUT',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUser')
                location.reload()
            }
        });
    }

    deleteData(data) {
        $.ajax({
            url: 'http://localhost:5000/user',
            data: { data: JSON.stringify(data) },
            type: 'DELETE',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUser')
                location.reload()
            }
        });
    }
    
    sendData(data) {
        $.ajax({
            url: 'http://localhost:5000/user',
            data: { data: JSON.stringify(data) },
            type: 'POST',
            success: function (result) {
                alert(result.info)
                localStorage.setItem('func', 'funcUser')
                location.reload()
            }
        });
    }

    checkData(data) {
        let user = new User(null, data.username, data.password, data.role, false)
        let info = user.checkClass();
        if (typeof info === 'string') {
            return info
        } else {
            return user
        }
    }

    showData(data) {
        let list = ``
        for (let i = 0; i < data.length; i++) {
            list += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].username}</td>
                <td>${data[i].role}</td>
                <td><input type="button" value="Cập Nhật" data-toggle="modal" data-target="#modelUserUpdate" onclick="Update(${i})"></td>
                <td><input type="checkbox" class="user" id="${data[i].id}"></td>
            </tr>
                        `
        }
        return list
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
export default user_business