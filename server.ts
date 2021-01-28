import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";



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
    
    switch (pathName) {
        case "/Produkte":
            let produktArray: any[] = await mongoClient.db("Asta-Verleih").collection("Produkte").find().toArray();

            _response.write(JSON.stringify(produktArray));
            
            break;
        case "/Verleih":
                
            let myURL: Url.URL =  new Url.URL(_request.url, "https://example.com");
            // console.log(_request.url);
            let parameter: URLSearchParams = myURL.searchParams;
            let parseProdukte: any[] = JSON.parse(parameter.get("produkte"));
             console.log(parameter.get("name"));
             // console.log(parseProdukte);
                
             for(let i:number = 0; i < parseProdukte.length; i++){
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


