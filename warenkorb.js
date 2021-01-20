"use strict";
var Verleih;
(function (Verleih) {
    let produkteImWarenkorb = document.querySelector(".produktWarenkorb");
    let lokaleSachen = JSON.parse(localStorage.getItem("warenkorb"));
    // produkteImWarenkorb.appendChild(lokaleSachen);
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
    }
    //Funktion zum löschen von Produkten
    function deleteProdukt(_event) {
        let target = _event.target;
        let index = parseInt(target.getAttribute("ArtikelIndex"));
        lokaleSachen.splice(index, 1);
        localStorage.setItem("warenkorb", JSON.stringify(lokaleSachen));
        location.reload();
    }
})(Verleih || (Verleih = {}));
//# sourceMappingURL=warenkorb.js.map