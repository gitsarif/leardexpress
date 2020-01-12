if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express();
const  expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout', __dirname + '/views/layouts/layout')
app.use(expressLayouts);
app.use(express.static(__dirname +'/public')) 


const mangoose = require('mongoose')
mangoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser : true
})

const db = mangoose.connection
db.on('error', error => console.error(error))
db.on('open', () => console.log('connect to mongoose'))

app.use('/',indexRouter)
app.listen(process.env.PORT || 3000)