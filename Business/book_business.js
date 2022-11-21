import Book from '../Entities/Book.js'
class book_business {
    //Phần xử lý liên quan dữ liệu của Book
    loadData() {
        return new Promise((resolve, reject) => {
            $.post("http://localhost:5000/book", function (data) {
                let books = []
                for (let i = 0; i < data.length; i++) {
                    books.push(new Book(data[i].id, data[i].title,
                        data[i].genre, data[i].author, data[i].quantity, data[i].price))
                }
                resolve(books)
            }).then(error => reject(error));
        })
    }
    //Phần xử lý liên quan giao diện của Book
    showData(data) {
        let list = ``
        for (let i = 0; i < data.length; i++) {
            list += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].genre}</td>
                            <td>${data[i].author}</td>
                            <td>${data[i].quantity}</td>
                        </tr>
                        `
        }
        return list
    }
}
export default book_business