const galeria = document.getElementById("galeria");
const fotos = [...document.querySelectorAll(".card")];
const botoesFiltro = document.querySelectorAll("[data-filtro]");
const fundoModal = document.getElementById("fundo-modal");
const modalImagem = document.getElementById("modal-imagem");
const modalNome = document.getElementById("modal-nome");
const modalPosicao = document.getElementById("modal-posicao");
const modalDescricao = document.getElementById("modal-descricao");
const modalNumero = document.getElementById("modal-numero");
const modalLocal = document.getElementById("modal-local");
const contador = document.getElementById("contador");
const quantidade = document.getElementById("quantidade");

let categoriaAtual = "todos";
let fotosVisiveis = fotos;
let indiceAtual = 0;

function filtrarFotos(categoria) {
    categoriaAtual = categoria;

    botoesFiltro.forEach((botao) => {
        botao.classList.toggle("ativo", botao.dataset.filtro === categoria);
    });

    fotos.forEach((foto) => {
        const mostrar = categoria === "todos" || foto.dataset.categoria === categoria;
        foto.classList.toggle("escondido", !mostrar);
    });

    galeria.classList.toggle("filtrada", categoria !== "todos");
    fotosVisiveis = fotos.filter((foto) => !foto.classList.contains("escondido"));
    quantidade.textContent = `${fotosVisiveis.length} jogadores encontrados`;

    if (fundoModal.classList.contains("aberto")) {
        fecharModal();
    }
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => filtrarFotos(botao.dataset.filtro));
});

function abrirModal(foto) {
    fotosVisiveis = fotos.filter((item) => !item.classList.contains("escondido"));
    indiceAtual = fotosVisiveis.indexOf(foto);
    mostrarFoto();
    fundoModal.classList.add("aberto");
    fundoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function mostrarFoto() {
    const foto = fotosVisiveis[indiceAtual];
    const imagem = foto.querySelector("img");

    modalImagem.src = imagem.src;
    modalImagem.alt = imagem.alt;
    modalNome.textContent = foto.dataset.nome;
    modalPosicao.textContent = foto.dataset.posicao;
    modalDescricao.textContent = foto.dataset.descricao;
    modalNumero.textContent = foto.dataset.numero;
    modalLocal.textContent = foto.dataset.local;
    contador.textContent = `${indiceAtual + 1} de ${fotosVisiveis.length}`;
}

fotos.forEach((foto) => {
    foto.addEventListener("click", () => abrirModal(foto));
});

function fecharModal() {
    fundoModal.classList.remove("aberto");
    fundoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.getElementById("fechar").addEventListener("click", fecharModal);
fundoModal.addEventListener("click", (evento) => {
    if (evento.target === fundoModal) fecharModal();
});

document.getElementById("anterior").addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + fotosVisiveis.length) % fotosVisiveis.length;
    mostrarFoto();
});

document.getElementById("proximo").addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % fotosVisiveis.length;
    mostrarFoto();
});

document.addEventListener("keydown", (evento) => {
    if (!fundoModal.classList.contains("aberto")) return;

    if (evento.key === "Escape") fecharModal();
    if (evento.key === "ArrowRight") {
        indiceAtual = (indiceAtual + 1) % fotosVisiveis.length;
        mostrarFoto();
    }
    if (evento.key === "ArrowLeft") {
        indiceAtual = (indiceAtual - 1 + fotosVisiveis.length) % fotosVisiveis.length;
        mostrarFoto();
    }
});
