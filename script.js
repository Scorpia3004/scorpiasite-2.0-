
/* ---------    BOTÃO DO FORMULÁRIO    --------- */
const mensagem = document.getElementById("mensagem");

if (mensagem) {
    mensagem.onclick = function (e) {
        e.preventDefault();
        alert("Nova coleção chegando!");
    };
}

/* ---------    ANIMAÇÃO DE SCROLL    --------- */
const elementos = document.querySelectorAll(".animar");

function animarScroll() {
    const topoTela = window.innerHeight * 0.85;
    elementos.forEach((elemento) => {
        const posicao = elemento.getBoundingClientRect().top;
        if (posicao < topoTela) {
            elemento.classList.add("apareceu");
        }
    });
}

window.addEventListener("scroll", animarScroll);
animarScroll();

/* O carrinho e o menu mobile agora ficam somente no carrinho.js */
