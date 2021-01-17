"use strict";
let produkteImWarenkorb = document.querySelector("produktWarenkorb");
let lokaleSachen = JSON.parse(localStorage.getItem("warenkorb"));
produkteImWarenkorb.appendChild(lokaleSachen);
for (let i = 0; lokaleSachen.length; i++) {
    //Produkte rein laden , Bild, Name, Preis sollte reichen denke ich
}
//# sourceMappingURL=warenkorb.js.map