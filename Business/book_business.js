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


    searchData(Data, keyword) {
        let results = []
        for (let i = 0; i < Data.length; i++) {
            if (Data[i].Title.includes(keyword)) {
                results.push(Data[i])
            }
        }
        if (results.length == 0) {
            return data
        } else {
            return results
        }

    }

    showData(Data) {
        let list = ``
        for (let i = 0; i < Data.length; i++) {
            list += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${Data[i].Title}</td>
                            <td>${Data[i].Genre}</td>
                            <td>${Data[i].Author}</td>
                            <td>${Data[i].Quantity}</td>
                        </tr>
                        `
        }
        return list
    }

    genreData(Data) {
        let genre = []
        for (let i = 0; i < Data.length; i++) {
            if (!genre.includes(Data[i].Genre)) {
                genre.push(Data[i].Genre)
            }
        }
        return genre
    }

    selectData(Data, keyword) {
        let results = []
        for (let i = 0; i < Data.length; i++) {
            if (Data[i].Genre == keyword) {
                results.push(Data[i])
            }
        }
        if (keyword == "Thể loại") {
            return Data
        } else {
            return results
        }
    }

}
export default book_business