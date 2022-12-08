// Main file
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"nriTest@",
    database:"test"
})

app.use(express.json())
app.use(cors())

// to reach backend server and print hello this is backend when we go to homepage
app.get("/", (req, res)=>{
    res.json("hello this is the backend");
})

//return all books from our db
app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

// return all nri data from our db
app.get("/csvdata", (req, res)=>{
    const q = "SELECT * FROM csvdata"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

//send book details to database to make new book for mySql
app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created sucessfully");
    });
})

// ,`category`,`lot title`,`lot location`,`lot condition`, `pre-tax amount`,`tax name`,`tax amount`
app.post("/", (req, res)=>{
    const q = "INSERT INTO csvdata (`date`,`category`,`lotTitle`,`lotLocation`,`lotCondition`, `preTaxAmount`,`taxName`,`taxAmount`) VALUES (?)";
    console.log("test")
    //console.log(req.body[0].date)
    //console.log(req.body)
    let values = req.body; 
    for(let i = 0; i < req.body.length; i++){
        /* values[i].date = req.body[i].date;
        values[i].category = req.body[i].category;
        values[i].lotTitle = req.body[i].lotTitle;
        values[i].lotLocation = req.body[i].lotLocation
        values[i].lotCondition = req.body[i].lotCondition
        values[i].preTaxAmount = req.body[i].preTaxAmount
        values[i].taxName = req.body[i].taxName
        values[i].taxAmount = req.body[i].taxAmount */
        values = [req.body[i].date, req.body[i].category, req.body[i].lotTitle, req.body[i].lotLocation, req.body[i].lotCondition, req.body[i].preTaxAmount, req.body[i].taxName, req.body[i].taxAmount];
        console.log(values)

        db.query(q, [values, (err, data) => {
            if(err) return res.json(err)
            return res.json("Data uploaded sucessfully")
        }])
    } 
    
})

app.listen(8800, () => {
    console.log("Connected to backend");
})