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
    let myURL = new Url.URL(_request.url, "https://example.com");
    let parameter = myURL.searchParams;
    switch (pathName) {
        case "/Produkte":
            let produktArray = await mongoClient.db("Asta-Verleih").collection("Produkte").find().toArray();
            _response.write(JSON.stringify(produktArray));
            break;
        case "/Verleih":
            // console.log(_request.url);
            let parseProdukte = JSON.parse(parameter.get("produkte"));
            let eingetragenePerson = parameter.get("name");
            // console.log(parseProdukte);
            for (let i = 0; i < parseProdukte.length; i++) {
                console.log(parseProdukte[i].bild);
                console.log(parseProdukte[i].name);
                console.log(parseProdukte[i]._id);
                //ObjectID wird benötigt da es nicht nur ein String ist sondern ein Object https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
                let findQuery = {
                    _id: new Mongo.ObjectID(parseProdukte[i]._id),
                };
                //https://stackoverflow.com/a/38883596  zum updaten des Werts
                let updateQuery = { $set: { studentName: eingetragenePerson, status: "reserviert" } };
                //FindOneAndUpdate: Mongodb Dokumentation: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/#examples (Erster Parameter sucht, zweiter Paramater updatet das gefundene)
                await mongoClient.db("Asta-Verleih").collection("Produkte").findOneAndUpdate(findQuery, updateQuery);
            }
            break;
        case "/AstaIntern":
            let produkteArray = await mongoClient.db("Asta-Verleih").collection("Produkte").find().toArray();
            // console.log(produkteArray);
            _response.write(JSON.stringify(produkteArray));
            break;
        case "/AstaIntern/statusUpdate":
            let statusParamter = parameter.get("status");
            let idParamter = parameter.get("id");
            let findQueryStatus = { _id: new Mongo.ObjectID(idParamter) };
            let updateQueryStatus;
            if (statusParamter == "ausgeliehen") {
                updateQueryStatus = { $set: { status: "ausgeliehen" } };
            }
            else if (statusParamter == "freigegeben") {
                updateQueryStatus = { $set: { status: "frei", studentName: "" } };
            }
            await mongoClient.db("Asta-Verleih").collection("Produkte").findOneAndUpdate(findQueryStatus, updateQueryStatus);
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