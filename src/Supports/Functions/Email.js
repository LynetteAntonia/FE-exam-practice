// EMAIL VALIDATOR
// Ex. ryan.fandy@gmail.com;
// 1. Index paling awal tidak boleh dimulai menggunakan angka
// 2. Terdapat string sebelum & sesudah @
// 3. Sesudah @, ada string. Setelah string harus ada .
// 4. Setelah . harus ada string lagi


function EmailValidator(inputEmail){
    // Email dipisah berdasarkan @
    let emailSplit = inputEmail.split('@')

    // Kalo emailSplit > 2 element -> false
    if(emailSplit.length !== 2) return false
    let emailName = emailSplit[0]
    let hostingEmail = emailSplit[1]

    // Kalo diawali dengan angka -> false
    if(emailName[0] >= 0) return false // #redundant

    // Hosting dipisah berdasarkan .
    let hostingEmailSplit = hostingEmail.split('.') // Untuk memisahkan gmail dan com
    console.log(hostingEmailSplit)

    if(hostingEmailSplit.length <= 1) return false
    for(let i = 0; i < hostingEmailSplit.length; i++){
        if(hostingEmailSplit[i] === '' || hostingEmailSplit[i] === ' '){
            return false
        }
    }

    return true
}

export default EmailValidator