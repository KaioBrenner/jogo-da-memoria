function setIcons() {
  const imgs = document.getElementsByTagName("img");

  //Chave das cartas e quantos ícones possuem nas cartas (máximo: 2)
  const techs = [
    {
      techSrc: "/images/bootstrap.png",
      techName: "bootstrap",
      Icons: 0,
    },
    {
      techSrc: "/images/css.png",
      techName: "css",
      Icons: 0,
    },
    {
      techSrc: "/images/electron.png",
      techName: "electron",
      Icons: 0,
    },
    {
      techSrc: "/images/firebase.png",
      techName: "firebase",
      Icons: 0,
    },
    {
      techSrc: "/images/html.png",
      techName: "html",
      Icons: 0,
    },
    {
      techSrc: "/images/javascript.png",
      techName: "javascript",
      Icons: 0,
    },
    {
      techSrc: "/images/jquery.png",
      techName: "jquery",
      Icons: 0,
    },
    {
      techSrc: "/images/mongo.png",
      techName: "mongo",
      Icons: 0,
    },
    {
      techSrc: "/images/node.png",
      techName: "node",

      Icons: 0,
    },
    {
      techSrc: "/images/react.png",
      techName: "react",
      Icons: 0,
    },
  ];

  //Disposição aleatória das imagens nas cartas
  for (let img of imgs) {
    while (img.src == "") {
      let i = Math.floor(Math.random() * 10);

      if (techs[i].Icons == 0) {
        img.setAttribute("src", techs[i].techSrc);
        img.parentNode.parentNode.children[0].setAttribute(
          "id",
          techs[i].techName + 1
        );
        techs[i].Icons++;
      } else if (techs[i].Icons == 1) {
        img.setAttribute("src", techs[i].techSrc);
        img.parentNode.parentNode.children[0].setAttribute(
          "id",
          techs[i].techName + 2
        );
        techs[i].Icons++;
      }
    }
  }
}

// Seção de virada de cartas

var flippedCards = 0;
var card1Name;
var card2Name;
var card1Id;
var card2Id;

function flipCard(e) {
  //Armazenamento de dados em relação às cartas que são o nome e id.
  if (flippedCards == 0) {
    if (e.getAttribute("flipped") == "false") {
      e.style.transform = "rotateY(180deg)";
      e.setAttribute("flipped", "true");
      card1Id = e.children[0].id;
      card1Name = card1Id.slice(0, card1Id.length - 1);
      flippedCards++;
    }
  } else if (flippedCards == 1) {
    if (e.getAttribute("flipped") == "false") {
      e.style.transform = "rotateY(180deg)";
      e.setAttribute("flipped", "true");
      card2Id = e.children[0].id;
      card2Name = card2Id.slice(0, card2Id.length - 1);
      let cardsContainers = document.getElementsByClassName("flipper");
      flippedCards++;

      //Passagem de flipped para true para todos os elementos para não haver mais de 2 cartas viradas para cima ao mesmo tempo
      for (let i = 0; i < cardsContainers.length; i++) {
        const e = cardsContainers[i];
        if (e.getAttribute("flipped") != "ended") {
          e.setAttribute("flipped", "true");
        }
      }

      //Verificação da igualdade das cartas (setTimeout para não ter conflito com o rotate do css)

      setTimeout(function verificateCards() {
        //Puxada dos elementos para as variáveis
        let card1 = document.getElementById(card1Id).parentNode;
        let card2 = document.getElementById(card2Id).parentNode;

        for (let i = 0; i < cardsContainers.length; i++) {
          const e = cardsContainers[i];
          if (e.getAttribute("flipped") != "ended") {
            e.setAttribute("flipped", "false");
          }
        }

        //Verificação da igualdade das cartas
        if (card1Name != card2Name) {
          card1.style.transform = "rotateY(0deg)";
          card2.style.transform = "rotateY(0deg)";
        } else {
          card1.setAttribute("flipped", "ended");
          card2.setAttribute("flipped", "ended");
        }
      }, 550);

      flippedCards = 0;
    }
  }
}

let terminateGame = false;

function endGame() {
  if (!terminateGame) {
    let cardsContainers = document.getElementsByClassName("flipper");
    let endedCards = 0;
    let finalScreen = document.getElementById("content");
    let main = document.getElementsByTagName("main")[0];
    let body = document.getElementsByTagName("body")[0];

    for (let i = 0; i < cardsContainers.length; i++) {
      const e = cardsContainers[i];

      if (e.getAttribute("flipped") == "ended") {
        endedCards++;
      }
    }

    if (endedCards == 20) {
      finalScreen.style.display = "flex";
      main.style.filter = "brightness(0.1)";
      body.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      terminateGame = true;
    }
  }
}

setInterval(endGame, 10);

function restart() {
  location.reload();
}
