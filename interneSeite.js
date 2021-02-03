"use strict";
var Verleih;
(function (Verleih) {
    async function produkteAstaAnzeigen() {
        let result = await fetch("http://127.0.0.1:5001/AstaIntern");
        let produkte = JSON.parse(await result.text());
        console.log(produkte);
        for (let i = 0; produkte.length; i++) {
            let produktDiv = document.createElement("div");
            produktDiv.classList.add("produktDiv");
            //Name reinladen
            document.querySelector(".reservierteProdukte").appendChild(produktDiv);
            let nameDiv = produktDiv.appendChild(document.createElement("div"));
            nameDiv.classList.add("produktName");
            nameDiv.innerHTML = produkte[i].name;
            //Bild reinladen
            let bild = produktDiv.appendChild(document.createElement("img"));
            bild.classList.add("produktBild");
            bild.setAttribute("src", "Bilder/Objekte/" + produkte[i].bild);
            //Gebühren
            let gebuehrenDiv = produktDiv.appendChild(document.createElement("div"));
            gebuehrenDiv.classList.add("gebuehrenDiv");
            gebuehrenDiv.innerHTML = produkte[i].ausleihGebuehr.toString() + " €";
            //Statusbild
            let statusImg = produktDiv.appendChild(document.createElement("img"));
            statusImg.classList.add("statusBild");
            statusImg.setAttribute("src", "Bilder/" + produkte[i].status + ".png");
            if (produkte[i].status == "frei") {
                //mach mal nichts
            }
            else if (produkte[i].status == "reserviert") {
                //Button für ausgeliehen wechseln
                let ausgeliehenButton = produktDiv.appendChild(document.createElement("button"));
                ausgeliehenButton.classList.add("ausgeliehenButton");
                ausgeliehenButton.setAttribute("type", "button");
                ausgeliehenButton.innerHTML = "Ausgeliehen";
                ausgeliehenButton.setAttribute("ArtikelIndex", i.toString());
            }
            else {
                //Button wieder freigeben
                let freigebenButton = produktDiv.appendChild(document.createElement("button"));
                freigebenButton.classList.add("freigebenButton");
                freigebenButton.setAttribute("type", "button");
                freigebenButton.innerHTML = "Wieder freigeben";
                freigebenButton.setAttribute("ArtikelIndex", i.toString());
            }
        }
    }
    produkteAstaAnzeigen();
})(Verleih || (Verleih = {}));
//# sourceMappingURL=interneSeite.js.map