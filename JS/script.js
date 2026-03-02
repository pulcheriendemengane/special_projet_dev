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
        // On crée le HTML de la card avec image + titre
          const card = `
        <div class="card ${concert.type} hidden">

            ${concert.image ? `<img src="${concert.image}" alt="${concert.nom}">` : ""}

            <h2>${concert.nom}</h2>

        </div>
        `;
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
      const viewport = document.querySelector(".liste__viewport");

  // Si le slider n’existe pas sur la page → arrêter le script
  if (!viewport) return;

  /*
    Initialisation du carousel Embla
    Options :
    - loop : désactive le défilement infini
    - align : les slides commencent à gauche
    - slidesToScroll : nombre de slides qui défilent par clic
  */
  const embla = EmblaCarousel(viewport, {
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  /*
    Sélection des boutons navigation du slider
  */
  const prevBtn = document.querySelector(".embla__button--prev");
  const nextBtn = document.querySelector(".embla__button--next");

  /*
    Sélection de la barre de progression du slider
  */
  const progressBar = document.querySelector(".liste__progress__bar");

  /*
    Met à jour l’état des boutons (actif / désactivé)
    selon la position actuelle du carousel
  */
  const updateButtons = () => {
    if (!embla) return;

    prevBtn?.classList.toggle(
      "liste__boutton--disabled",
      !embla.canScrollPrev()
    );

    nextBtn?.classList.toggle(
      "liste__boutton--disabled",
      !embla.canScrollNext()
    );
  };

  /*
    Met à jour la barre de progression du slider.
    La progression est calculée entre 0 et 1.
  */
  const updateProgress = () => {
    if (!embla || !progressBar) return;

    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));

    progressBar.setAttribute(
      "style",
      `transform: translate3d(${progress * 100}%,0,0)`
    );
  };

  /*
    Gestion des clics sur les boutons navigation
  */
  prevBtn?.addEventListener("click", () => embla.scrollPrev());
  nextBtn?.addEventListener("click", () => embla.scrollNext());

  /*
    Mise à jour automatique quand le carousel change d’état
  */
  embla.on("select", () => {
    updateButtons();
    updateProgress();
  });

  /*
    Mise à jour si le carousel est réinitialisé (ex : resize fenêtre)
  */
  embla.on("reInit", updateButtons);

  /*
    Initialisation de l’état du slider
  */
  updateButtons();
  updateProgress();


  /* ⭐ Recherche */
  document.getElementById("searchForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    let value = document.getElementById("searchInput").value
      .toLowerCase()
      .trim();

    if(value === "actualité"){
        window.location.href = "actualité.html";
    }
    else if(value === "contact"){
        window.location.href = "contact.html";
    }
    else if(value === "communauté"){
        window.location.href = "communauté.html";
    }
    else{
        alert("Aucun résultat trouvé");
    }
  });
});
    

