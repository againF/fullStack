const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/"

const server = http.createServer((req, res) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            throw err;
        }
        const dbo = db.db("demo");
        dbo.collection("menu").find({}).toArray((err, result) => {
            if (err) {
                throw err;
            }
            console.log(result);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', "*")
            res.end(JSON.stringify(result));
        })

    })

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

});