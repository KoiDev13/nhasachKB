class report_business {
    showDebtReport(Moneynotes, Receipts, reports) {
        for (let i = 0; i < reports.length; i++) {
            let arr = Moneynotes.filter(x => x.customer.fullname == reports[i].name &&
                new Date(x.isCreated).getMonth() == new Date().getMonth())
            for (let a = 0; a < arr.length; a++) {
                reports[i].change += arr[a].moneyCollect
            }
        }
        for (let i = 0; i < reports.length; i++) {
            let arr = Receipts.filter(x => x.customer.fullname == reports[i].name &&
                new Date(x.isCreated).getMonth() == new Date().getMonth())
            for (let a = 0; a < arr.length; a++) {
                reports[i].change -= (arr[a].totalValue - arr[a].pay)
            }
        }
        for (let i = 0; i < reports.length; i++) {
            reports[i].first = reports[i].last + reports[i].change
        }
        return reports
    }

    showQuantityReport(Receipts, Bookforms, reports) {
        for (let i = 0; i < reports.length; i++) {
            let arr = Receipts.filter(x => x.detail.some(y => y.title == reports[i].name))
            for (let a = 0; a < arr.length; a++) {
                let obj = arr[a].detail.find(x => x.title == reports[i].name)
                reports[i].change += obj.numberBook
            }
        }
        for (let i = 0; i < reports.length; i++) {
            let arr = Bookforms.filter(x => x.detail.some(y => y.title == reports[i].name))
            for (let a = 0; a < arr.length; a++) {
                let obj = arr[a].detail.find(x => x.title == reports[i].name)
                reports[i].change -= obj.numberBook
            }
        }
        for (let i = 0; i < reports.length; i++) {
            reports[i].first = reports[i].last + reports[i].change
        }
        return reports
    }

    showData(data) {
        let list = ``
        for (let i = 0; i < data.length; i++) {
            list += `
                        <tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].first}</td>
                            <td>${data[i].change * -1}</td>
                            <td>${data[i].last}</td>
                        </tr>
                        `
        }
        return list
    }
}
export default report_business