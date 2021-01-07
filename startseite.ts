

namespace Verleih {

    interface Produkt {
        name: string;
        beschreibung: string;
        bild: string;
        ausleihGebuehr: number;
        status: Status;
    }

    enum Status{
        FREI, AUSGELIEHEN, RESERVIERT
    }


    async function produkteAnzeigen(){
        let result: Response = await fetch("http://127.0.0.1:5001/Produkte");
        let produkte: Produkt[] = JSON.parse(await result.text());

        for(let i: number = 0; i < produkte.length; i++){ 
        let divElement = document.createElement("div");
        document.querySelector("#produkteDiv").appendChild(divElement);
        divElement.innerHTML = produkte[i].name;
        }
        
    }

    produkteAnzeigen();
}