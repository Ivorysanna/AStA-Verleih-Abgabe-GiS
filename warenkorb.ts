namespace Verleih {
  let produkteImWarenkorb: HTMLDivElement = document.querySelector(
    ".produktWarenkorb"
  );
  let lokaleSachen: Produkt[] = JSON.parse(localStorage.getItem(warenkorbLocalStorage));
  // produkteImWarenkorb.appendChild(lokaleSachen);
  let summe: number = 0;

  let absendenDiv: HTMLDivElement = document.querySelector(".absenden");
  let absendenButton: HTMLButtonElement = absendenDiv.appendChild(
    document.createElement("button")
  );
  absendenButton.innerHTML = "Absenden";

  absendenButton?.addEventListener("click", absendenEvent);

  for (let i: number = 0; i < lokaleSachen.length; i++) {
    //Produkte rein laden , Bild, Name, Preis sollte reichen denke ich
    let produktDiv: HTMLDivElement = document.createElement("div");
    produktDiv.classList.add("produktDiv");
    produkteImWarenkorb.appendChild(produktDiv);

    //Bild reinladen
    let bild: HTMLImageElement = produktDiv.appendChild(
      document.createElement("img")
    );
    bild.classList.add("produktBild");
    bild.setAttribute("src", "Bilder/Objekte/" + lokaleSachen[i].bild);

    //Name
    let nameDiv: HTMLDivElement = produktDiv.appendChild(
      document.createElement("div")
    );
    nameDiv.classList.add("produktName");
    nameDiv.innerHTML = lokaleSachen[i].name;

    //Gebühren
    let ausleihGebuehrDiv: HTMLDivElement = produktDiv.appendChild(
      document.createElement("div")
    );
    ausleihGebuehrDiv.classList.add("gebuehrenDiv");
    ausleihGebuehrDiv.innerHTML = lokaleSachen[i].ausleihGebuehr.toString() + " €";

    //Button zum löschen von sachen
    let deleteButton: HTMLButtonElement = produktDiv.appendChild(
      document.createElement("button")
    );
    deleteButton.classList.add("deleteButton");
    deleteButton.setAttribute("type", "button");
    deleteButton.innerHTML = "Löschen";
    deleteButton.setAttribute("ArtikelIndex", i.toString());

    //Event löschen von Produkten
    deleteButton?.addEventListener("click", deleteProdukt);

    //Summe berechnen für Artikel im Warenkorb
    summe += lokaleSachen[i].ausleihGebuehr;
  }

  let warenkorbSumme: HTMLDivElement = document.querySelector(".summe");
  warenkorbSumme.innerHTML = "Summe: " + summe + "€";

  //Funktion zum löschen von Produkten
  function deleteProdukt(_event: Event): void {
    let target: HTMLElement = <HTMLElement>_event.target;
    let index: number = parseInt(target.getAttribute("ArtikelIndex"));

    lokaleSachen.splice(index, 1);

    localStorage.setItem(warenkorbLocalStorage, JSON.stringify(lokaleSachen));
    location.reload();
  }

  async function absendenEvent(_event: Event): Promise<void> {
    let nameFeld: HTMLInputElement = document.querySelector(".inputName");
    let nameFeldWert: string = nameFeld.value;

    //Name eingetragen Abfrage
    if(nameFeldWert != ""){
      let UrlVerleih: string = serverUrl +"Verleih";
      UrlVerleih = UrlVerleih + "?name=" + nameFeldWert + "&produkte=" + JSON.stringify(lokaleSachen);
      await fetch(UrlVerleih);
      
      localStorage.setItem(warenkorbLocalStorage, "[]");
      
      //Nachricht wenn Produkte erfolgreich verschickt wurden
      let removeDiv = document.querySelector(".produktWarenkorb");
      removeDiv.remove();
      
      let absendeNachricht: HTMLParagraphElement = document.createElement("p");
      document.querySelector(".absendeNachricht").appendChild(absendeNachricht);
      absendeNachricht.innerHTML = "Die Produkte wurden an das AstA-Team geschickt!";
    }else{
      alert("Bitte tragen Sie einen Namen ein");
    }
  }
}
