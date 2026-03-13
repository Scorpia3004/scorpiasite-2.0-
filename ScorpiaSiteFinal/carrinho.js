/* carrinho.js */

// Função para adicionar produto ao carrinho
function adicionarCarrinho(nome, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        // Se já existe, apenas aumenta a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Se é novo, adiciona com quantidade inicial de 1
        carrinho.push({ 
            nome: nome, 
            preco: Number(preco), 
            imagem: imagem, 
            quantidade: 1 
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nome} adicionado ao carrinho!`);
}

// Função para mostrar os produtos no carrinho
function mostrarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("valor-total");
    if (!lista) return;

    lista.innerHTML = "";
    const dados = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = 0;

    dados.forEach((produto, index) => {
        if (!produto.nome || produto.preco == null) return;

        // Calcula o subtotal deste item (preço x quantidade)
        const subtotalItem = produto.preco * produto.quantidade;

        const item = document.createElement("div");
        item.classList.add("item-carrinho");
        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="info-produto">
                <span class="nome-produto"><strong>${produto.quantidade}x</strong> ${produto.nome}</span>
                <span class="preco-produto">Unitário: R$ ${produto.preco.toFixed(2)}</span>
                <span class="subtotal-produto">Subtotal: R$ ${subtotalItem.toFixed(2)}</span>
            </div>
            <button class="remover-item" onclick="removerItem(${index})">Remover</button>
        `;

        lista.appendChild(item);
        total += subtotalItem;
    });

    totalEl.textContent = "R$ " + total.toFixed(2);
}
// Função para remover item do carrinho
function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarCarrinho();
}

// Inicializa carrinho ao carregar a página
mostrarCarrinho();

/*----------- MENU MOBILE -----------*/
const menuBtn = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}