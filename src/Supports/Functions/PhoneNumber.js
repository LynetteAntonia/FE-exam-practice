// PHONE NUMBER VALIDATION
// 1. Nomor harus diawali dengan 0
// 2. Nomor memiliki panjang minimal 9 digit & panjang maksimal 12 digit

function PhoneNumberValidator(inputPhoneNumber){
    if(inputPhoneNumber[0] !== '0'){
        return 'Nomor Harus Diawali Dengan 0'
    } 

    if(inputPhoneNumber.length >= 9 && inputPhoneNumber.length <= 12){
        for(let i = 0; i < inputPhoneNumber.length; i++){
            if(!(inputPhoneNumber[i] >= 0)){
                return 'Nomor Harus Berupa Angka'
            }else if(inputPhoneNumber[i] === ' '){
                return 'Nomor Tanpa Spasi'
            }
        }
    }else{
        return 'Nomor Harus 9-12 Digit'
    }

    return true
}

export default PhoneNumberValidator