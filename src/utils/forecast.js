const request = require("postman-request")

const forecast=(longitude, lattitude, callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=bce74781838c9ce43962890a33357672&query='+lattitude+','+longitude+'&units=m'
    request({url, json: true},(error, {body})=>{
       if(error){
           callback('Unable to connect to the internet', undefined)
       }
       else if(body.error){
           callback('Unable to find, please try another url', undefined)
       }
       else{
           callback(undefined, body.current.weather_descriptions+'. The temperature is '+ body.current.temperature + ' .It feels like '+ body.current.feelslike)
       }
    })

}

module.exports= forecast