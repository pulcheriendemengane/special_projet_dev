console.log("Démo");

const texte = document.querySelectorAll(".img_presensation_paragraphe1")
const boutton = document.querySelectorAll(".bouton_présentation")
const cards = document.querySelector(".conteneur__carte")
const card = document.querySelectorAll(".conteneur__carte")
const bouton_concert = document.querySelector(".bouton_concert")

boutton.forEach((boutton, index) =>{
    boutton.addEventListener("click", () => {

        if(texte[index].classList.contains("visible")){
            texte[index].classList.remove("visible");
        }else{
            texte.forEach(t => t.classList.remove("visible"));
            texte[index].classList.add("visible");
        }
        });
});

//récupérer le fichier json
fetch("./data.json")
      .then(response => response.json())
      .then((data) => {
        data.Actualités.forEach((concert) =>{
            //On crée le HTML (card)
            const card = `<div class='card ${concert.type} hidden'> 
            <h2>${concert.nom}</h2>
            </div>`; 
            //On ajoute notre card dans le HTML
            cards.insertAdjacentHTML("beforeend", card);
        });

      }
    );


//Variable qui va stocker le filtre actuellement sélectionné
//Exemple : "concert" si le bouton concert est cliqué
//Si aucun filtre n'est actif | valeur = null

let filtreActuel = null

//Quand on clique sur le bouton concert
bouton_concert.addEventListener("click", () =>{
    // Si le filtre actuel est déjà "concert"
    // Cela veut dire que l'utilisateur a cliqué 2 fois sur le même bouton
    // Donc on recache toutes les cartes et on désactive le filtre
    if (filtreActuel === "concert"){

        //On cache toutes les cartes
        document.querySelectorAll(".card").forEach(card => {
            card.classList.add("hidden");
        });

        //On réintialise le filtre
        filtreActuel = null;
        return; //On stoppe la fonction ici
    }

    filtreActuel = "concert"

    //On affiche seulement les cartes concert
    document.querySelectorAll(".card").forEach(card =>{
    if(card.classList.contains("concert")){
        card.classList.remove("hidden");
     } else{
        card.classList.add("hidden");
    }
    })
    
})