"use strict";
var Verleih;
(function (Verleih) {
    async function produkteAnzeigen() {
        let result = await fetch(Verleih.serverUrl + "Produkte");
        let produkte = JSON.parse(await result.text());
        console.log(produkte);
        let localStorageArray = JSON.parse(localStorage.getItem("warenkorb"));
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
            let istImWarenkorb = false;
            for (let i = 0; i < localStorageArray.length; i++) {
                if (localStorageArray[i]._id == produkte[i]._id) {
                    istImWarenkorb = true;
                    break;
                }
            }
        }
        let warenkorbLocalStorage = "warenkorb";
        //Setzen von Warenkorb Array falls keiner vorhanden ist
        if (!localStorage.getItem(warenkorbLocalStorage)) {
            localStorage.setItem(warenkorbLocalStorage, "[]");
        }
        //
        function addWarenkorb(_event) {
            //Produkte selektieren durch Button druck
            let target = _event.target;
            let index = parseInt(target.getAttribute("ArtikelIndex"));
            let ausgewaehlterArtikel = produkte[index];
            //Abfrage ob Artikel vorhanden ist
            if (produkte[index].status == "frei") {
                //In den Warenkorb hinzufügen
                let warenkorb = JSON.parse(localStorage.getItem(warenkorbLocalStorage));
                console.log(warenkorb);
                let istImWarenkorb = false;
                for (let i = 0; i < warenkorb.length; i++) {
                    if (warenkorb[i]._id == ausgewaehlterArtikel._id) {
                        istImWarenkorb = true;
                        break;
                    }
                }
                if (istImWarenkorb == true) {
                    alert("Produkt befindet sich bereits im Warenkorb!");
                }
                else {
                    warenkorb.push(ausgewaehlterArtikel);
                    localStorage.setItem(warenkorbLocalStorage, JSON.stringify(warenkorb));
                }
                //dem div über dem Button eine Klasse hinzufügen
                target.parentElement.classList.add("clicked");
            }
            else {
                alert("Dieser Artikel ist momentan reserviert oder ausgeliehen!");
            }
        }
    }
    produkteAnzeigen();
})(Verleih || (Verleih = {}));
//# sourceMappingURL=startseite.js.map