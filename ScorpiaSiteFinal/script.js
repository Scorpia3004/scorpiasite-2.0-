alert("Bem-vindo à Scorp Store!");
/* ---------    ANIMAÇÃO DE SCROLL    --------- */

const mensagem = document.getElementById("mensagem");

if(mensagem){
    mensagem.onclick = function(){
        alert("Nova coleção chegando!");
    }
}

const elementos = document.querySelectorAll(".animar");

function animarScroll(){

    const topoTela = window.innerHeight * 0.85;

    elementos.forEach((elemento) =>{

        const posicao = elemento.getBoundingClientRect().top;

        if(posicao < topoTela){
            elemento.classList.add("apareceu");
        }

    });

}

window.addEventListener("scroll", animarScroll);

animarScroll();

/*  -------    CARRINHO DE COMPRAS    --------- */

const botoes = document.querySelectorAll(".comprar");

botoes.forEach((botao)=>{

    botao.addEventListener("click", ()=>{

        alert("Item adicionado ao carrinho!");

    });

});

function irCarrinho(){

window.location.href = "carrinho.html";

}

const botao = document.querySelectorAll(".botao-compra");

botao.forEach(botao => {

botao.addEventListener("click", function(){

const nome = this.dataset.nome;
const preco = this.dataset.preco;

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

carrinho.push({
nome: nome,
preco: preco
});

localStorage.setItem("carrinho", JSON.stringify(carrinho));

window.location.href = "carrinho.html";

});

});

/*----------- MENU MOBILE -----------*/
const menuBtn = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuBtn.addEventListener('click', () => {
  // O "toggle" adiciona a classe se não tiver, e remove se já tiver
  navList.classList.toggle('active');
});