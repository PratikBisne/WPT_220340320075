
const express = require('express');
const app = express();
// const cors = require('cors');
const mysql = require('mysql2');

// app.use(cors());


// const bodyParser = require('body-parser');
// const { connect } = require('http2');






app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not
app.get('/getbook',(req,resp)=>{
	console.log("ajax called");
	const dbobject = {
		host: 'LocalHost',
		user: 'Pratik',
		password: 'cdac',
		database: 'book',
		port:3306
	}
	
	const connection = mysql.createConnection(dbobject);
	
	let output = { status: false ,detail: {bookid :0,bookname :"",price:""}}
	let bookid = req.query.bookid;
	
	console.log(bookid);
	
	connection.query('select * from book where bookid =? ',[bookid],(error,rows)=>{
		if(error){
			console.log(error);
		}
		else {
			if(rows.length >0){
				output.status = true;
				output.detail=rows[0];
			}
			else{
				console.log("no book id");
			}
		}
		console.log(output);
		resp.send(output);
	});
	
	
	});



app.get('/updateprice',(req,resp)=>{
console.log("ajax called");
const dbobject = {
	host: 'LocalHost',
    user: 'Pratik',
    password: 'cdac',
    database: 'book',
	port:3306
}

const connection = mysql.createConnection(dbobject);

let output = { status: false}
let bookid = req.query.bookid;
let bookname = req.query.bookname;
let price = req.query.price;
console.log(bookid);

connection.query('update book set price = ? where bookid = ?',[price,bookid],(error,res1)=>{
	if(error){
		console.log(error);
	}
	else {
		if(res1.affectedRows >0){
			output.status = true;
		}
		else{
			console.log("did not update");
		}
	}
	console.log(output);
	resp.send(output);
});


});

app.listen(8081, function () {
    console.log("server listening at port 8081...");
});