твой.wsdl
---------
getValute 
getValutes
‹soap:address location="твой-server.js" />
=========
client.js
---------
url = "http://localhost/твой.wsdl"
soap.createClient (url, (err, client)=>{
    client.getValutes()
    client.getValute(...)
})
=========
твой-server.js
---------
ur1 = "http://cbr.ru/.wsd]"
function getValutes (){
    soap.createClient(url, (err, client) =› { client.GetCursOnDate }) 
    soap.createClient(url, (err, client) => { client.EnumValutes })
    return ...
}
function getValute(a, b, c){
    soap.createClient(url, (err, client) =› { client.GetCursOnDate }) 
    soap.createcilent (url, (err, client) => { client.EnumValutes })
    return ...
}
