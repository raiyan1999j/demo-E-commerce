const express = require('express');
const app = express();
const mysql= require('mysql');
const multer= require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());


// =============
// configure multer
// =============

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload = multer({storage:storage});

// =============
// configure mysql
// =============
const connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'raiyanKhan@317',
    database:'ecommerce'
});

// =============
// verification
// =============
app.post('/verify/:number',(req,res)=>{
    const verifyNumber = req.params.number;
    const val = req.body.email;

    const transport = nodemailer.createTransport({
        service:'gmail',
        port:587,
        secure:false,
        auth:{
            user:'boomboomraiyan@gmail.com',
            pass:'bsdaqdictgpertwn'
        }
    })

    const mailOpt = {
        from:'boomboomraiyan@gmail.com',
        to:`${val}`,
        subject:'verification number',
        text:`${verifyNumber}`
    }

    transport.sendMail(mailOpt,(error,info)=>{
        if(error){
            console.log(error);
            res.status(500).send('failed to send code');
        }else{
            res.send('sent to mail')
        }
    })
});
// =============
// create-account
// =============

app.post('/verifyServer',(req,res)=>{
    const pass = req.body.pass;
    const mail = req.body.mail;

    const sql = `insert into userList (mail,pass) values ("${mail}","${pass}")`;

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send('failed to add data')
        }else{
            res.send('data added to server')
        }
    })
})
// =============
// log-in
// =============

app.get('/logInInfo',(req,res)=>{
    const sql = 'select * from userList';

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error);
            res.send('failed to fetch')
        }else{
            res.send(result)
        }
    })
})
// =============
// addServer
// =============
//   app.post('/addServer',(req,res)=>{
//       const fishReg = req.body.fishReg;
//       const {name,amount,stocks,opinion,image} = req.body.val;

//       const sql = `insert into adminPanel (fishReg,name,amount,stocks,opinion,image) values ("${fishReg}","${name}","${amount}","${stocks}","${opinion}","${image}")`;
    
//       connect.query(sql,(error,result)=>{
//           if(error){
//               console.log(error)
//           }else{
//               res.send('added to server')
//           }
//       })
//   })
 app.post('/addServer',upload.single('image'),(req,res)=>{
     const {fishReg,name,amount,stocks,opinion} = req.body;
     const image = btoa(req.file.filename);
     const sql = `insert into adminpanel (fishReg,name,amount,stocks,opinion,image) values ("${fishReg}","${name}","${amount}","${stocks}","${opinion}","${image}")`;

     connect.query(sql,(error,result)=>{
         if(error){
             console.log(error)
         }else{
             res.send(result)
         }
     })
 })
// =============
// add-order
// =============
app.post('/addOrder/:refNum',(req,res)=>{
    const refNum = req.params.refNum;
    const {fishReg}=req.body;

    const sql = `insert into customer (fishReg,revolve,customerId) values ("${fishReg}","${1}","${refNum}")`;

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send('added to cutomer order')
        }
    })
})
// =============
// update-order
// =============
app.put('/updateOrder/:refNum',(req,res)=>{
    const refNum = req.params.refNum;
    const {fishReg,count} = req.body;

    const sql = `update customer set revolve = "${count+1}" where customerId="${refNum}" and fishReg="${fishReg}" `;

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.send('updated to orderList')
        }
    })
})
// =============
// remove-order
// =============
app.delete('/removeOrder',(req,res)=>{
    const {refNum,fishReg} = req.body;

    let sql;
    if(refNum===undefined || null){
        sql = `delete from customer where fishReg="${fishReg}")`;
    }else{
        sql = `delete from customer where customerId = "${refNum}" and fishReg="${fishReg}"`;
    }

     

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.send('remove item from order')
        }
    })
})

// =============
// update-item
// =============
app.put('/updateItem/:refNum',upload.single('image'),(req,res)=>{
    const refNum = req.params.refNum;
    const {name,amount,stocks,opinion,fishReg} = req.body;
    const image = btoa(req.file.filename);

    const sql = `update adminPanel set name="${name}", amount="${amount}", stocks="${stocks}", opinion="${opinion}", image="${image}" where fishReg="${fishReg}"`;

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send('updated value')
        }
    })
})  
// =============
// remove-item
// =============
app.delete('/removeItem',(req,res)=>{
    const {fishReg} = req.body;

    const sql=`delete from adminPanel where fishReg="${fishReg}"`;

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.send('item remove from panel')
        }
    })
})

// =============
// retrieve-admin
// =============
app.get('/retrieveAdmin',(req,res)=>{
    const sql = 'select * from adminPanel';

    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(result);
        }
    })
})
// =============
// retrieve-order
// =============
app.get('/retrieveOrder/:refNum',(req,res)=>{
    const refNum = req.params.refNum;
    const sql = `select * from customer where customerId = "${refNum}"`;
    
    connect.query(sql,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    })
})

app.listen(5000,()=>{
    console.log('check it');
})