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
            //Name reinladen
            document.querySelector("#produkteContainer").appendChild(produktDiv);
            let nameDiv = produktDiv.appendChild(document.createElement("div"));
            nameDiv.classList.add("produktName");
            nameDiv.innerHTML = produkte[i].name;
            //Bild reinladen
            let bild = produktDiv.appendChild(document.createElement("img"));
            bild.classList.add("produktBild");
            bild.setAttribute("src", "Bilder/Objekte/" + produkte[i].bild);
            //Produktbeschreibung
            let beschreibungDiv = produktDiv.appendChild(document.createElement("div"));
            beschreibungDiv.classList.add("produktBeschreibung");
            beschreibungDiv.innerHTML = produkte[i].beschreibung;
            //Gebühren 
            let ausleihGebuehrDiv = produktDiv.appendChild(document.createElement("div"));
            ausleihGebuehrDiv.classList.add("gebuehrenDiv");
            ausleihGebuehrDiv.innerHTML = produkte[i].ausleihGebuehr.toString() + " €";
            //Statusbild
            let statusImg = produktDiv.appendChild(document.createElement("img"));
            statusImg.classList.add("statusBild");
            statusImg.setAttribute("src", "Bilder/" + produkte[i].status + ".png");
            //Button für Warenkorb
            let warenkorbButton = produktDiv.appendChild(document.createElement("button"));
            warenkorbButton.classList.add("warenkorbButton");
            warenkorbButton.setAttribute("type", "button");
            warenkorbButton.innerHTML = "Reservieren";
            warenkorbButton.setAttribute("ArtikelIndex", i.toString());
            //Event zum Waren in Warenkorb hinzufügen
            warenkorbButton?.addEventListener("click", addWarenkorb);
        }
        function addWarenkorb(_event) {
            //Produkte selektieren durch Button druck
            let target = _event.target;
            console.log(produkte[parseInt(target.getAttribute("ArtikelIndex"))]);
            //In den Warenkorb hinzufügen
            let getProdukte = JSON.parse(localStorage.getItem("ArtikelIndex"));
        }
    }
    produkteAnzeigen();
})(Verleih || (Verleih = {}));
//# sourceMappingURL=startseite.js.map