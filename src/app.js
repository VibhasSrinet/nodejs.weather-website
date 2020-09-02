const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const express= require('express')
const path= require('path')
const hbs= require('hbs')
const app= express()
//define paths for express config
const pathofdir= path.join(__dirname, '../public')
const viewpath= path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname, '../templates/partials')
// set up handlebar engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)
//set up static directory to sedrve
app.use(express.static(pathofdir))

app.get('', (req, res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Vibhas Singh'
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Vibhas Singh'
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'This is something Helpful',
        name: 'Vibhas Singh'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You need to provide address'
        })
    }
    geocode(req.query.address, (error, {longitude, lattitude, place}={})=>{
        if(error){
       return  res.send({
             error: error
         })
        }
    forecast(longitude, lattitude, (error, data) => {
        if(error){
          return  res.send({
                error: error
            })
        }
        res.send({
            address: place,
            data: data
        })
      })
    })
    
})
app.get('/help/*',(req, res)=>{
    res.render('error',{
        title : 'Error 404!',
        name : 'Vibhas Singh',
        type: 'Help Article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('error',{
        title : 'Error 404!',
        name : 'Vibhas Singh',
        type: 'Page not found'
    })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
}) 