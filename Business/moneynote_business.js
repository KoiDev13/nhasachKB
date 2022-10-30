import Moneynote from '../Entities/Moneynote.js'
class moneynote_business {
    checkData(Data) {
        if (Data.Person == null) {
            return 'Dữ liệu khách hàng không tồn tại trong hệ thống'
        }else {
            let moneynote = new Moneynote(null,Data.Person,false,Data.MoneyCollect,Data.IsCreated)
            let info = moneynote.checkClass()
            if(typeof info === 'string'){
                return info
            }else{
                return moneynote
            }
        }
    }

    sendData(Data){

    }
}
export default moneynote_business