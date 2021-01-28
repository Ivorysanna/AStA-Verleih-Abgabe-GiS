"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
let server = Http.createServer();
let port = process.env.PORT;
if (port == undefined) {
    port = 5001;
}
server.listen(port);
console.log("Listening on Port" + port);
server.addListener("request", handleRequest);
async function handleRequest(_request, _response) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    let pathName = Url.parse(_request.url).pathname;
    // console.log(pathName);
    let mongoClient = new Mongo.MongoClient("mongodb+srv://testUser:123@cluster0.df1mb.mongodb.net/Asta-Verleih?retryWrites=true&w=majority", {});
    //wartet auf den connect von der Datenbank
    await mongoClient.connect();
    switch (pathName) {
        case "/Produkte":
            let produktArray = await mongoClient.db("Asta-Verleih").collection("Produkte").find().toArray();
            _response.write(JSON.stringify(produktArray));
            break;
        case "/Verleih":
            let myURL = new Url.URL(_request.url, "https://example.com");
            // console.log(_request.url);
            let parameter = myURL.searchParams;
            let parseProdukte = JSON.parse(parameter.get("produkte"));
            console.log(parameter.get("name"));
            // console.log(parseProdukte);
            for (let i = 0; i < parseProdukte.length; i++) {
                console.log(parseProdukte[i].bild);
                console.log(parseProdukte[i].name);
                console.log(parseProdukte[i].ausleihGebuehr);
            }
            break;
    }
    _response.end();
    // if(_request.url){
    //     let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
    //     for(let key in url.query){
    //         _response.write(key + ":" + url.query[key]);
    //     }  
    //     let jsonString: string = JSON.stringify(url.query);
    //     _response.write(jsonString);
    // }
    // _response.end();
}
//# sourceMappingURL=server.js.map