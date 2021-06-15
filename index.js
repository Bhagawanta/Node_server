const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
let connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'bgm',
    user:'root',
    password:''
  })
  
  connection.connect((err)=>{
    if(!err)
    console.log("Connection Established Successfully");
    else
    console.log("Connected Failed!"+JSON.stringify(err,undefined,2));
  })

	app.get('/',(req,res)=>{
	res.send("Welcome to Node Js");
	})

//   Item Table API 
  app.get('/items', (req,res)=>{
    connection.query('SELECT * FROM item',  (error, results, fields)=> {
      if (!error)
          res.send(results)
          else
          console.log(error);
      });
  })
   app.get('/item/:id', (req ,res) =>{
     connection.query('select * from item where item_id = ?',[req.params.id],(err,rows)=>{
       if(!err)
       res.send(rows)
       else
       console.log(err);
     })
   });  
   app.get('/itemlist',(req,res)=>{
     connection.query('select item_id,item_name from item',(err,result)=>{
       if(!err)
       res.send(result)
       else
       console.log(err);
     })
   })
   app.get('/itemvalue/:id', (req ,res) =>{
    connection.query('select item_price from item where item_id = ?',[req.params.id],(err,rows)=>{
      if(!err)
      res.send(rows)
      else
      console.log(err);
    })
  });     app.post('/item',(req,res)=>{
    let { itemname, itemmake, itemprice} = req.body;
    connection.query('INSERT INTO item(item_name, item_make, item_price) VALUES(?,?,?)',[itemname,itemmake,itemprice],(error,results,fields)=>{
        if(!error)
        res.send(results)
        else
        console.log(error);
    })
  });

//   Item Table API End 

// Vendor table API 
  app.get('/vendors', (req,res)=>{
    connection.query('SELECT * FROM vendor',  (error, results, fields)=> {
      if (!error)
          res.send(results)
          else
          console.log(error);
      });
  })
   app.get('/vendor/:id', (req ,res) =>{
     connection.query('select * from vendor where vendor_id = ?',[req.params.id],(err,rows)=>{
       if(!err)
       res.send(rows)
       else
       console.log(err);
     })
   });  
   app.get('/vendorlist',(req, res)=>{
     connection.query('select vendor_id,vendor_name from vendor',(err, result)=>{
       if(!err)
       res.send(result);
       else
       console.log(err);
     })
   })
   app.post('/vendor',(req,res)=>{
    let { vname, vmobile, vaddress} = req.body;
    connection.query('INSERT INTO vendor(vendor_name, vendor_mobile, vendor_address) VALUES(?,?,?)',[vname, vmobile, vaddress],(error,results,fields)=>{
        if(!error)
        res.send(results)
        else
        console.log(error);
    })
  });

//   vendor table api end 

// order table api 

app.get('/orders', (req,res)=>{
    connection.query('SELECT * FROM ordertable',  (error, results, fields)=> {
      if (!error)
          res.send(results)
          else
          console.log(error);
      });
  })
   app.get('/order/:id', (req ,res) =>{
     connection.query('select * from ordertable where vendor_id = ?',[req.params.id],(err,rows)=>{
       if(!err)
       res.send(rows)
       else
       console.log(err);
     })
   });
   app.post('/order',(req,res)=>{
    let { poid,podate,iqty,ivalue,dod,doi,wyears,wupto,vendorid,itemid,vname,iname} = req.body;
    connection.query("INSERT INTO ordertable(po_id, po_date, item_qty, item_value, dod, doi, wyears, wupto, vendorid, itemid,vendor_name,item_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[poid,podate,iqty,ivalue,dod,doi,wyears,wupto,vendorid,itemid,vname,iname],(error,results,fields)=>{
        if(!error)
        res.send(results)
        else
        console.log(error);
    })
    // console.log(poid+podate+iqty+ivalue+dod+doi+wyears+wupto+vendorid+itemid);
  });


// order table api end 


app.listen(3001,()=>{
    console.log("Welcome to Node JS");
})
