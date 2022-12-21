const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(cors());
//parse application

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));


//set database

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"emp01",
    port:3306

});


//checking connection to db if successful 

con.connect(function(err){
    if(err) throw err

    console.log("connection successful at emp01 database");
})

//getting all data

app.get('/db',function(req,res){
    let sqlqry = `SELECT * FROM db `;

    con.query(sqlqry,function(err,result){
        if(err) throw err

        if(result.length>0)

        res.send({
            message:"getting all data",
                    data:result

        });

    });
});

//now get data by id

app.get('/db/:ID',function(req,res){
    let gid = req.params.ID;
    let sqlqry = `SELECT * FROM db WHERE ID = ${gid} `;

    con.query(sqlqry,function(err,result){
        if(err) throw err;

        if(result.length>0){

        
        res.send({
            message:"get data by id ",
                    data:result
            });
        }
        else{res.send({message:"data not found .... invalid id"})};


    });
    // console.log(result)
});


//now create data using post method

app.post("/db",function(req,res){

    console.log(req.body,"create data");
    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;
    let Email = req.body.Email;
    let Salary = req.body.Salary;

    let sqlqry = `INSERT INTO db (FirstName, LastName , Email , Salary) values('${FirstName}','${LastName}','${Email}','${Salary}')`;
    con.query(sqlqry,(err,result)=>{
                if(err) throw err;

                res.send({
                    message:"your data has been inserted"
                });
    });
});

//now let us update the data by user entered id
app.put("/db/:ID",function(req,res){
    console.log(req.body,"update data");
    
    let gid = req.params.ID;

    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;
    let Email = req.body.Email;
    let Salary = req.body.Salary;

    let sqlqry = `UPDATE db SET FirstName='${FirstName}', LastName = '${LastName}', Email ='${Email}', Salary = '${Salary}' WHERE ID = ${gid} `;

    con.query(sqlqry,function(err,result){
        if(err) throw err

        res.send({
            message:"data updated",
                             
        });
    });
});


//now let us delete the data based on id 

app.delete("/db/:ID",function(req,res){
    console.log(req.body,"delete data");

    let gid= req.params.ID;

    let sqlqry = `DELETE FROM db WHERE ID = '${gid}'`;

    con.query(sqlqry,function(err,result){
        if (err) throw err;

        res.send({
            message:"the data has been deleted " +gid
        });
    });

});



//this app should listen and run on port 3000
app.listen(3000,()=>{
    console.log("event connected on port 3000");
})

