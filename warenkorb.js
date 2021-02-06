"use strict";
var Verleih;
(function (Verleih) {
    let produkteImWarenkorb = document.querySelector(".produktWarenkorb");
    let lokaleSachen = JSON.parse(localStorage.getItem(Verleih.warenkorbLocalStorage));
    // produkteImWarenkorb.appendChild(lokaleSachen);
    let summe = 0;
    let absendenDiv = document.querySelector(".absenden");
    let absendenButton = absendenDiv.appendChild(document.createElement("button"));
    absendenButton.innerHTML = "Absenden";
    absendenButton?.addEventListener("click", absendenEvent);
    for (let i = 0; i < lokaleSachen.length; i++) {
        //Produkte rein laden , Bild, Name, Preis sollte reichen denke ich
        let produktDiv = document.createElement("div");
        produktDiv.classList.add("produktDiv");
        produkteImWarenkorb.appendChild(produktDiv);
        //Bild reinladen
        let bild = produktDiv.appendChild(document.createElement("img"));
        bild.classList.add("produktBild");
        bild.setAttribute("src", "Bilder/Objekte/" + lokaleSachen[i].bild);
        //Name
        let nameDiv = produktDiv.appendChild(document.createElement("div"));
        nameDiv.classList.add("produktName");
        nameDiv.innerHTML = lokaleSachen[i].name;
        //Gebühren
        let ausleihGebuehrDiv = produktDiv.appendChild(document.createElement("div"));
        ausleihGebuehrDiv.classList.add("gebuehrenDiv");
        ausleihGebuehrDiv.innerHTML = lokaleSachen[i].ausleihGebuehr.toString() + " €";
        //Button zum löschen von sachen
        let deleteButton = produktDiv.appendChild(document.createElement("button"));
        deleteButton.classList.add("deleteButton");
        deleteButton.setAttribute("type", "button");
        deleteButton.innerHTML = "Löschen";
        deleteButton.setAttribute("ArtikelIndex", i.toString());
        //Event löschen von Produkten
        deleteButton?.addEventListener("click", deleteProdukt);
        //Summe berechnen für Artikel im Warenkorb
        summe += lokaleSachen[i].ausleihGebuehr;
    }
    let warenkorbSumme = document.querySelector(".summe");
    warenkorbSumme.innerHTML = "Summe: " + summe + "€";
    //Funktion zum löschen von Produkten
    function deleteProdukt(_event) {
        let target = _event.target;
        let index = parseInt(target.getAttribute("ArtikelIndex"));
        lokaleSachen.splice(index, 1);
        localStorage.setItem(Verleih.warenkorbLocalStorage, JSON.stringify(lokaleSachen));
        location.reload();
    }
    async function absendenEvent(_event) {
        let nameFeld = document.querySelector(".inputName");
        let nameFeldWert = nameFeld.value;
        //Name eingetragen Abfrage
        if (nameFeldWert != "") {
            let UrlVerleih = Verleih.serverUrl + "Verleih";
            UrlVerleih = UrlVerleih + "?name=" + nameFeldWert + "&produkte=" + JSON.stringify(lokaleSachen);
            await fetch(UrlVerleih);
            localStorage.setItem(Verleih.warenkorbLocalStorage, "[]");
            //Nachricht wenn Produkte erfolgreich verschickt wurden
            let removeDiv = document.querySelector(".produktWarenkorb");
            removeDiv.remove();
            let absendeNachricht = document.createElement("p");
            document.querySelector(".absendeNachricht").appendChild(absendeNachricht);
            absendeNachricht.innerHTML = "Die Produkte wurden an das AstA-Team geschickt!";
        }
        else {
            alert("Bitte tragen Sie einen Namen ein");
        }
    }
})(Verleih || (Verleih = {}));
//# sourceMappingURL=warenkorb.js.map