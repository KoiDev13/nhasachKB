import Regulation from '../Entities/Regulation.js';
class regulation_business{
    loadData(title) {
        return new Promise((resolve, reject) => {
            $.post(`http://localhost:5000/regulation?title=${title}`, function (data) {
                resolve(new Regulation(data.id,data.title,data.description,data.Rules[0]))
            }).then(error => reject(error));
        })
    }

}
export default regulation_business