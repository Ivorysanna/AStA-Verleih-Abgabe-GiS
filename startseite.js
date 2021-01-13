"use strict";
var Verleih;
(function (Verleih) {
    // enum Status {
    //     FREI, AUSGELIEHEN, RESERVIERT
    // }
    async function produkteAnzeigen() {
        let result = await fetch("http://127.0.0.1:5001/Produkte");
        let produkte = JSON.parse(await result.text());
        console.log(produkte);
        // Erstellen von Divs für Produkte
        for (let i = 0; i < produkte.length; i++) {
            let produktDiv = document.createElement("div");
            produktDiv.classList.add("produktDiv");
            document.querySelector("#produkteContainer").appendChild(produktDiv);
            let nameDiv = produktDiv.appendChild(document.createElement("div"));
            nameDiv.classList.add("produktName");
            nameDiv.innerHTML = produkte[i].name;
            let bild = produktDiv.appendChild(document.createElement("img"));
            bild.classList.add("produktBild");
            bild.setAttribute("src", "Bilder/Objekte/" + produkte[i].bild);
            let beschreibungDiv = produktDiv.appendChild(document.createElement("div"));
            beschreibungDiv.classList.add("produktBeschreibung");
            beschreibungDiv.innerHTML = produkte[i].beschreibung;
            let ausleihGebuehrDiv = produktDiv.appendChild(document.createElement("div"));
            ausleihGebuehrDiv.classList.add("gebuehrenDiv");
            ausleihGebuehrDiv.innerHTML = produkte[i].ausleihGebuehr.toString() + " €";
            let statusImg = produktDiv.appendChild(document.createElement("img"));
            statusImg.classList.add("statusBild");
            statusImg.setAttribute("src", "Bilder/" + produkte[i].status + ".png");
        }
    }
    produkteAnzeigen();
})(Verleih || (Verleih = {}));
//# sourceMappingURL=startseite.js.map