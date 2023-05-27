const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const urlencodedParser = express.urlencoded({extended : false});
require('dotenv').config();


const mailScript = require('./js/send.js');



app.use(express());
// app.use(express.static(__dirname + 'index.html'))
app.use(express.static(__dirname + "/js"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/pics"));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.set('views', __dirname +'/views');
app.set('view engine', 'ejs');

app.get('/',(request,response) =>{
    response.render('index.ejs',{
        user: '',
    })
})

app.post('/',urlencodedParser, function(request,response){
    if(!request.body) response.sendStatus(400)
    let user = request.body;
    console.log(user);
    //здесь вставляем функцию/скрипт отправки письма (send.js)
     mailScript.sendMail(user); //потом передавать в эту функцию параметры из request.body, также в send.js добавить эти параметры черех ${}
    response.render('index.ejs',{
        user: request.body,
    })
})


app.listen(port,() =>{
    console.log(`Server is started at port ${port}`);
      
});