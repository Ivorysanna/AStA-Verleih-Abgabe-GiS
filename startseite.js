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
            let produktDiv = document.createElement("div");
            produktDiv.classList.add("produktDiv");
            document.querySelector("#produkteContainer").appendChild(produktDiv);
            let nameDiv = produktDiv.appendChild(document.createElement("div"));
            nameDiv.classList.add("produktName");
            nameDiv.innerHTML = produkte[i].name;
            let bild = produktDiv.appendChild(document.createElement("img"));
            bild.classList.add("produktBild");
            bild.setAttribute("src", produkte[i].bild);
            let beschreibungDiv = produktDiv.appendChild(document.createElement("div"));
            beschreibungDiv.classList.add("produktBeschreibung");
            beschreibungDiv.innerHTML = produkte[i].beschreibung;
            let ausleihGebuehrDiv = produktDiv.appendChild(document.createElement("div"));
            ausleihGebuehrDiv.classList.add("gebuehrenDiv");
            ausleihGebuehrDiv.innerHTML = produkte[i].ausleihGebuehr.toString() + " €";
        }
    }
    produkteAnzeigen();
})(Verleih || (Verleih = {}));
//# sourceMappingURL=startseite.js.map