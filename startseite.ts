namespace Verleih {

    export interface Produkt {
        _id: string;
        name: string;
        beschreibung: string;
        bild: string;
        ausleihGebuehr: number;
        status: string;
        studentName: string;
    }


    async function produkteAnzeigen(): Promise<void> {
        let result: Response = await fetch(serverUrl + "Produkte");
        let produkte: Produkt[] = JSON.parse(await result.text());
        console.log(produkte);


        // Erstellen von Divs für Produkte
        for (let i: number = 0; i < produkte.length; i++) {
            let produktDiv: HTMLDivElement = document.createElement("div");
            produktDiv.classList.add("produktDiv");

            //Name reinladen
            document.querySelector("#produkteContainer").appendChild(produktDiv);
            let nameDiv: HTMLDivElement= produktDiv.appendChild(document.createElement("div"));
            nameDiv.classList.add("produktName");
            nameDiv.innerHTML = produkte[i].name;

            //Bild reinladen
            let bild: HTMLImageElement = produktDiv.appendChild(document.createElement("img"));
            bild.classList.add("produktBild");
            bild.setAttribute("src", "Bilder/Objekte/" + produkte[i].bild);

            //Produktbeschreibung
            let beschreibungDiv: HTMLDivElement  = produktDiv.appendChild(document.createElement("div"));
            beschreibungDiv.classList.add("produktBeschreibung");
            beschreibungDiv.innerHTML = produkte[i].beschreibung;
            
            //Gebühren 
            let ausleihGebuehrDiv: HTMLDivElement = produktDiv.appendChild(document.createElement("div"));
            ausleihGebuehrDiv.classList.add("gebuehrenDiv");
            ausleihGebuehrDiv.innerHTML = produkte[i].ausleihGebuehr.toString() + " €";

            //Statusbild
            let statusImg: HTMLImageElement= produktDiv.appendChild(document.createElement("img"));
            statusImg.classList.add("statusBild");
            statusImg.setAttribute("src", "Bilder/" + produkte[i].status + ".png");

            //Button für Warenkorb
            let warenkorbButton: HTMLButtonElement = produktDiv.appendChild(document.createElement("button"));
            warenkorbButton.classList.add("warenkorbButton");
            warenkorbButton.setAttribute("type", "button");
            warenkorbButton.innerHTML = "Reservieren";
            warenkorbButton.setAttribute("ArtikelIndex", i.toString());

            //Event zum Waren in Warenkorb hinzufügen
           warenkorbButton?.addEventListener("click", addWarenkorb);

        }

        let warenkorbLocalStorage: string = "warenkorb";

        //Setzen von Warenkorb Array falls keiner vorhanden ist
        if(!localStorage.getItem(warenkorbLocalStorage)){
            localStorage.setItem(warenkorbLocalStorage, "[]");
        }


        //
        function addWarenkorb(_event: Event): void{
            //Produkte selektieren durch Button druck
            let target: HTMLElement = <HTMLElement>_event.target;
            let index: number = parseInt(target.getAttribute("ArtikelIndex"));
            let ausgewaehlterArtikel: Produkt = produkte[index];


            //Abfrage ob Artikel vorhanden ist
            if(produkte[index].status == "frei"){
                //In den Warenkorb hinzufügen
                let warenkorb: Produkt[] = JSON.parse(localStorage.getItem(warenkorbLocalStorage));
                console.log(warenkorb);

                let istImWarenkorb: boolean = false;
                for(let i: number = 0; i < warenkorb.length; i++){
                    if(warenkorb[i]._id == ausgewaehlterArtikel._id){
                        istImWarenkorb = true;
                        break;
                    }
                }
                
                if(istImWarenkorb == true){
                    alert("Produkt befindet sich bereits im Warenkorb!");
                }else{
                    warenkorb.push(ausgewaehlterArtikel);
                    localStorage.setItem(warenkorbLocalStorage, JSON.stringify(warenkorb));
                }
                
                //dem div über dem Button eine Klasse hinzufügen
                target.parentElement.classList.add("clicked");
            } else{
                alert("Dieser Artikel ist momentan reserviert oder ausgeliehen!");
            }
            
        }

    }

    produkteAnzeigen();
}