import Book from '../Entities/Book.js'
class book_business {
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

    searchData(data, keyword) {
        let results = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.toLowerCase().includes(keyword.toLowerCase())) {
                results.push(data[i])
            }
        }
        if (results.length == 0) {
            return data
        } else {
            return results
        }

    }

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

    genreData(data) {
        let genre = []
        for (let i = 0; i < data.length; i++) {
            if (!genre.includes(data[i].genre)) {
                genre.push(data[i].genre)
            }
        }
        return genre
    }

    selectData(data, keyword) {
        let results = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].genre == keyword) {
                results.push(data[i])
            }
        }
        if (keyword == "Thể loại") {
            return data
        } else {
            return results
        }
    }

    existData(data, keyword) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.toLowerCase() == keyword.trim().toLowerCase()) {
                return data[i]
            }
        }
        return null
    }

}
export default book_business