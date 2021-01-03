async function sendOrder(){
    let result: Response = await fetch("http://127.0.0.1:5001/Produkte");
    console.log(await result.text());
}

sendOrder();