/* carrinho.js - lógica do carrinho + menu mobile (usado em todas as páginas) */
(function () {
    const CHAVE = "carrinho";
    const WHATSAPP = "5561982989746";

    const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    // Lê o carrinho e descarta itens inválidos (lixo antigo no localStorage)
    function lerCarrinho() {
        try {
            const dados = JSON.parse(localStorage.getItem(CHAVE)) || [];
            return dados
                .filter((i) => i && i.nome && !isNaN(Number(i.preco)))
                .map((i) => ({
                    nome: i.nome,
                    preco: Number(i.preco),
                    imagem: i.imagem || "",
                    quantidade: Math.max(1, parseInt(i.quantidade) || 1),
                }));
        } catch (e) {
            return [];
        }
    }

    function salvarCarrinho(carrinho) {
        localStorage.setItem(CHAVE, JSON.stringify(carrinho));
        atualizarContador();
    }

    function atualizarContador() {
        const qtd = lerCarrinho().reduce((s, i) => s + i.quantidade, 0);
        document.querySelectorAll(".contador-carrinho").forEach((el) => {
            el.textContent = qtd;
            el.style.display = qtd > 0 ? "inline-block" : "none";
        });
    }

    function aviso(texto) {
        const t = document.createElement("div");
        t.textContent = texto;
        t.style.cssText =
            "position:fixed;bottom:25px;left:50%;transform:translateX(-50%);background:#4f4a4d;color:#fff;" +
            "padding:12px 22px;border-radius:20px;z-index:3000;font-family:'Cinzel Decorative',cursive;" +
            "font-size:14px;box-shadow:0 6px 18px rgba(0,0,0,.3);text-align:center;max-width:90%;";
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2200);
    }

    window.adicionarCarrinho = function (nome, preco, imagem) {
        const carrinho = lerCarrinho();
        const existente = carrinho.find((i) => i.nome === nome);
        if (existente) existente.quantidade += 1;
        else carrinho.push({ nome, preco: Number(preco), imagem, quantidade: 1 });
        salvarCarrinho(carrinho);
        aviso(nome + " adicionado ao carrinho!");
    };

    window.alterarQuantidade = function (index, delta) {
        const carrinho = lerCarrinho();
        if (!carrinho[index]) return;
        carrinho[index].quantidade += delta;
        if (carrinho[index].quantidade < 1) carrinho.splice(index, 1);
        salvarCarrinho(carrinho);
        mostrarCarrinho();
    };

    window.removerItem = function (index) {
        const carrinho = lerCarrinho();
        carrinho.splice(index, 1);
        salvarCarrinho(carrinho);
        mostrarCarrinho();
    };

    window.mostrarCarrinho = function () {
        const lista = document.getElementById("lista-carrinho");
        const totalEl = document.getElementById("valor-total");
        if (!lista) return;

        const carrinho = lerCarrinho();
        lista.innerHTML = "";
        let total = 0;

        if (carrinho.length === 0) {
            lista.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        }

        carrinho.forEach((p, index) => {
            const subtotal = p.preco * p.quantidade;
            total += subtotal;
            const item = document.createElement("div");
            item.classList.add("item-carrinho");
            item.innerHTML = `
                <img src="${esc(p.imagem)}" alt="${esc(p.nome)}">
                <div class="info-produto">
                    <span class="nome-produto">${esc(p.nome)}</span>
                    <span class="preco-produto">Unitário: ${brl(p.preco)}</span>
                    <div class="controle-qtd">
                        <button onclick="alterarQuantidade(${index}, -1)" aria-label="Diminuir">−</button>
                        <span>${p.quantidade}</span>
                        <button onclick="alterarQuantidade(${index}, 1)" aria-label="Aumentar">+</button>
                    </div>
                    <span class="subtotal-produto">Subtotal: ${brl(subtotal)}</span>
                </div>
                <button class="remover-item" onclick="removerItem(${index})">Remover</button>
            `;
            lista.appendChild(item);
        });

        if (totalEl) totalEl.textContent = brl(total);
    };

    // Envia o pedido pelo WhatsApp
    window.finalizarCompra = function () {
        const carrinho = lerCarrinho();
        if (carrinho.length === 0) {
            aviso("Seu carrinho está vazio!");
            return;
        }
        let total = 0;
        let msg = "Olá! Gostaria de finalizar meu pedido na Scorpia Store:\n\n";
        carrinho.forEach((p) => {
            const sub = p.preco * p.quantidade;
            total += sub;
            msg += `• ${p.quantidade}x ${p.nome} - ${brl(sub)}\n`;
        });
        msg += `\nTotal: ${brl(total)}`;
        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    // Menu mobile
    const menuBtn = document.getElementById("mobile-menu");
    const navList = document.getElementById("nav-list");
    if (menuBtn && navList) {
        menuBtn.addEventListener("click", () => navList.classList.toggle("active"));
    }

    mostrarCarrinho();
    atualizarContador();
})();
