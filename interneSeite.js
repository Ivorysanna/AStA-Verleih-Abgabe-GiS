"use strict";
var Verleih;
(function (Verleih) {
    async function produkteAstaAnzeigen() {
        let result = await fetch(Verleih.serverUrl + "AstaIntern");
        let produkte = JSON.parse(await result.text());
        console.log(produkte);
        for (let i = 0; i < produkte.length; i++) {
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
            //Studenten Name
            let studentenNameDiv = produktDiv.appendChild(document.createElement("div"));
            studentenNameDiv.classList.add("studentenNameDiv");
            studentenNameDiv.innerHTML = produkte[i].studentName;
            //Status zum sortieren, da man verschiedene Buttons braucht je nach Status
            if (produkte[i].status == "reserviert") {
                //Button für ausgeliehen wechseln
                let ausgeliehenButton = produktDiv.appendChild(document.createElement("button"));
                ausgeliehenButton.classList.add("ausgeliehenButton");
                ausgeliehenButton.setAttribute("type", "button");
                ausgeliehenButton.innerHTML = "Ausgeliehen";
                ausgeliehenButton.setAttribute("ArtikelIndex", i.toString());
                ausgeliehenButton?.addEventListener("click", ausgeliehenMarkieren);
            }
            else if (produkte[i].status == "ausgeliehen") {
                //Button wieder freigeben
                let freigebenButton = produktDiv.appendChild(document.createElement("button"));
                freigebenButton.classList.add("freigebenButton");
                freigebenButton.setAttribute("type", "button");
                freigebenButton.innerHTML = "Wieder freigeben";
                freigebenButton.setAttribute("ArtikelIndex", i.toString());
                freigebenButton?.addEventListener("click", freiMarkieren);
            }
        }
        async function ausgeliehenMarkieren(_event) {
            let target = _event.target;
            let index = parseInt(target.getAttribute("ArtikelIndex"));
            let idIndex = produkte[index]._id;
            let UrlAusgeliehen = Verleih.serverUrl + "AstaIntern/statusUpdate";
            UrlAusgeliehen = UrlAusgeliehen + "?id=" + idIndex + "&status=" + "ausgeliehen";
            await fetch(UrlAusgeliehen);
            location.reload();
        }
        async function freiMarkieren(_event) {
            let target = _event.target;
            let index = parseInt(target.getAttribute("ArtikelIndex"));
            let idIndex = produkte[index]._id;
            let UrlAusgeliehen = Verleih.serverUrl + "AstaIntern/statusUpdate";
            UrlAusgeliehen = UrlAusgeliehen + "?id=" + idIndex + "&status=" + "freigegeben";
            await fetch(UrlAusgeliehen);
            location.reload();
        }
    }
    produkteAstaAnzeigen();
})(Verleih || (Verleih = {}));
//# sourceMappingURL=interneSeite.js.map