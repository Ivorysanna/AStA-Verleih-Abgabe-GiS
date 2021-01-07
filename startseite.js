"use strict";
var Verleih;
(function (Verleih) {
    let Status;
    (function (Status) {
        Status[Status["FREI"] = 0] = "FREI";
        Status[Status["AUSGELIEHEN"] = 1] = "AUSGELIEHEN";
        Status[Status["RESERVIERT"] = 2] = "RESERVIERT";
    })(Status || (Status = {}));
    async function produkteAnzeigen() {
        let result = await fetch("http://127.0.0.1:5001/Produkte");
        let produkte = JSON.parse(await result.text());
        for (let i = 0; i < produkte.length; i++) {
            let divElement = document.createElement("div");
            document.querySelector("#produkteDiv").appendChild(divElement);
            divElement.innerHTML = produkte[i].name;
        }
    }
    produkteAnzeigen();
})(Verleih || (Verleih = {}));
//# sourceMappingURL=startseite.js.map