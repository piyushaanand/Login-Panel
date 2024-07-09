const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const app = express();
const ejs = require('ejs')
// require('./config')
const collection = require('./config')

app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.set('views', path.join(__dirname,'../views'));
app.set('view engine','ejs')

app.use('/public', express.static(path.join(__dirname, '../public')));
// app.use('/public',express.static("public"))


app.get('/',(req,res) =>{
    res.render('login')
})
app.get('/signup',(req,res) =>{
    res.render('signup')
})

app.post('/signup', async (req,res) =>{
    const data = {
        name: req.body.username,
        password: req.body.password  
    }
    const existinguser = await collection.findOne({name:data.name})
    if(existinguser){
        res.send(`User Already Exist use different Username`)
    }else{  
        //Hash The Pass
        const saltRound = 10; //Number of salt round for bcrypt
        const hashedpass = await bcrypt.hash(data.password,saltRound)
        data.password = hashedpass
        const userdata = await collection.insertMany(data)
        console.log(userdata)
    }
  
})

app.post('/login', async (req,res) =>{
try{
    const check = await collection.findOne({name:req.body.username})
    if(!check){
        res.send("user name cannot found")
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password,check.password)
    if(isPasswordMatch){
        res.render("home")
    }else{
        res.send("Wrong password")
    }
}catch{
    res.send("Wrong Details")
}
})

const port = 5000
app.listen(port, () =>{
console.log(`Server is Running in Port ${port}`)
})