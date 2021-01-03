"use strict";
async function sendOrder() {
    let result = await fetch("http://127.0.0.1:5001/Produkte");
    console.log(await result.text());
}
sendOrder();
//# sourceMappingURL=test.js.map