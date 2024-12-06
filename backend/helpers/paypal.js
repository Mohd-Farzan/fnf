const paypal = require('paypal-rest-sdk')


paypal.configure({
    mode:'sandbox',
    client_id:'AcgU_NoLyVQtkhkx8gJx9jmWv0pvKrzJRUPk8qED0HlL5fl09_F5YpqDK_c4broqcy-XUAxH2ZP0BbqX',
    client_secret:'EFBDlcVoJs64AF-7zn3INdfPzviJsYHIksrrMTZf4Y3LaHBF_sxghE5C1y2OyF5OnmZIp5b4NxtKqELu'

});
module.exports=paypal