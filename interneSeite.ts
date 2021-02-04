namespace Verleih {
    async function produkteAstaAnzeigen() {
        let result: Response = await fetch(serverUrl + "AstaIntern");
        let produkte: Produkt[] = JSON.parse(await result.text());
        console.log(produkte);

        for (let i: number = 0; produkte.length; i++) {
            let produktDiv: HTMLDivElement = document.createElement("div");
            produktDiv.classList.add("produktDiv");

            //Name reinladen
            document.querySelector(".reservierteProdukte").appendChild(produktDiv);
            let nameDiv: HTMLDivElement = produktDiv.appendChild(document.createElement("div"));
            nameDiv.classList.add("produktName");
            nameDiv.innerHTML = produkte[i].name;

            //Bild reinladen
            let bild: HTMLImageElement = produktDiv.appendChild(document.createElement("img"));
            bild.classList.add("produktBild");
            bild.setAttribute("src", "Bilder/Objekte/" + produkte[i].bild);

            //Gebühren
            let gebuehrenDiv: HTMLDivElement = produktDiv.appendChild(document.createElement("div"));
            gebuehrenDiv.classList.add("gebuehrenDiv");
            gebuehrenDiv.innerHTML = produkte[i].ausleihGebuehr.toString() + " €";

            //Statusbild
            let statusImg: HTMLImageElement = produktDiv.appendChild(document.createElement("img"));
            statusImg.classList.add("statusBild");
            statusImg.setAttribute("src", "Bilder/" + produkte[i].status + ".png");

            //Studenten Name
            let studentenNameDiv: HTMLDivElement = produktDiv.appendChild(document.createElement("div"));
            studentenNameDiv.classList.add("studentenNameDiv");
            studentenNameDiv.innerHTML = produkte[i].studentName;

            //Status zum sortieren, da man verschiedene Buttons braucht je nach Status
            if (produkte[i].status == "reserviert") {
                //Button für ausgeliehen wechseln
                let ausgeliehenButton: HTMLButtonElement = produktDiv.appendChild(document.createElement("button"));
                ausgeliehenButton.classList.add("ausgeliehenButton");
                ausgeliehenButton.setAttribute("type", "button");
                ausgeliehenButton.innerHTML = "Ausgeliehen";
                ausgeliehenButton.setAttribute("ArtikelIndex", i.toString());

                ausgeliehenButton?.addEventListener("click", ausgeliehenMarkieren);
            } else if (produkte[i].status == "ausgeliehen") {
                //Button wieder freigeben
                let freigebenButton: HTMLButtonElement = produktDiv.appendChild(document.createElement("button"));
                freigebenButton.classList.add("freigebenButton");
                freigebenButton.setAttribute("type", "button");
                freigebenButton.innerHTML = "Wieder freigeben";
                freigebenButton.setAttribute("ArtikelIndex", i.toString());

                freigebenButton?.addEventListener("click", freiMarkieren);
            } 
        }

        async function ausgeliehenMarkieren(_event: Event): Promise<void> {
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("ArtikelIndex"));
            let idIndex: string  = produkte[index]._id;

            let UrlAusgeliehen: string = serverUrl + "AstaIntern/statusupdate";
            UrlAusgeliehen = UrlAusgeliehen + "?id=" + idIndex + "&status=" + "ausgeliehen";
            await fetch(UrlAusgeliehen);
        }

        async function freiMarkieren(_event: Event): Promise<void> {
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("ArtikelIndex"));
            let idIndex: string  = produkte[index]._id;

            let UrlAusgeliehen: string = serverUrl + "AstaIntern/statusupdate";
            UrlAusgeliehen = UrlAusgeliehen + "?id=" + idIndex + "&status=" + "freigegeben";
            await fetch(UrlAusgeliehen);
        }
    }

    produkteAstaAnzeigen();
}
