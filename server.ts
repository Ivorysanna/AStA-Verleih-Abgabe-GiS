import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

interface Produkt {
    _id: string;
    name: string;
    beschreibung: string;
    bild: string;
    ausleihGebuehr: number;
    status: string;
    studentName: string;
}

let server: Http.Server = Http.createServer();

let port: number | string | undefined = process.env.PORT;
if (port == undefined) {
    port = 5001;
}

server.listen(port);
console.log("Listening on Port" + port);

server.addListener("request", handleRequest);

async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    let pathName: string = Url.parse(_request.url).pathname;
    // console.log(pathName);

    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://testUser:123@cluster0.df1mb.mongodb.net/Asta-Verleih?retryWrites=true&w=majority", {});
    //wartet auf den connect von der Datenbank
    await mongoClient.connect();

    let myURL: Url.URL = new Url.URL(_request.url, "https://example.com");
    let parameter: URLSearchParams = myURL.searchParams;
    switch (pathName) {
        case "/Produkte":
            let produktArray: Produkt[] = await mongoClient.db("Asta-Verleih").collection("Produkte").find().toArray();

            _response.write(JSON.stringify(produktArray));

            break;
        case "/Verleih":
            // console.log(_request.url);
            let parseProdukte: Produkt[] = JSON.parse(parameter.get("produkte"));
            let eingetragenePerson: string = parameter.get("name");
            // console.log(parseProdukte);

            for (let i: number = 0; i < parseProdukte.length; i++) {
                console.log(parseProdukte[i].bild);
                console.log(parseProdukte[i].name);
                console.log(parseProdukte[i]._id);

                //ObjectID wird benötigt da es nicht nur ein String ist sondern ein Object https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
                let findQuery: Object = {
                    _id: new Mongo.ObjectID(parseProdukte[i]._id),
                };

                //https://stackoverflow.com/a/38883596  zum updaten des Werts
                let updateQuery: Object = { $set: { studentName: eingetragenePerson } };

                //FindOneAndUpdate: Mongodb Dokumentation: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/#examples (Erster Parameter sucht, zweiter Paramater updatet das gefundene)
                 await mongoClient.db("Asta-Verleih").collection("Produkte").findOneAndUpdate(findQuery, updateQuery);
            }
            break;
        case "/AstaIntern":
            let produkteArray: Produkt[] = await mongoClient.db("Asta-Verleih").collection("Produkte").find().toArray();
            console.log(produkteArray);
            _response.write(JSON.stringify(produkteArray));
            break;

        case "/AstaIntern/statusUpdate":
            let statusParamter: string = parameter.get("status");

            let findQueryStatus: Object = {status: statusParamter};
            let updateQueryStatus: Object;

            if(statusParamter == "ausgeliehen"){
                updateQueryStatus = {$set: {status: "ausgeliehen"}};
                
            }else if(statusParamter == "freigestellt"){
                updateQueryStatus = {$set: {status: "frei"}};
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
