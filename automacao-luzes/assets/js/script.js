class CentralDeLuzes {
    static instance;

    constructor() {
        if (CentralDeLuzes.instance) return CentralDeLuzes.instance;

        this.luzes = {};
        CentralDeLuzes.instance = this;
    }

    static getInstance() {
        if (!CentralDeLuzes.instance) {
            CentralDeLuzes.instance = new CentralDeLuzes();
        }
        return CentralDeLuzes.instance;
    }

    ligar(comodo) {
        const luz = document.querySelector(`.${comodo} .light`);
        const botao = document.querySelector(`button[data-comodo="${comodo}"]`);
        if (luz && botao) {
            luz.style.backgroundColor = "yellow";
            luz.style.boxShadow = "0 0 15px 5px yellow";
            this.luzes[comodo] = true;
            this.mostrarPopup(`Luz da ${botao.title} ligada`);
        }
    }

    desligar(comodo) {
        const luz = document.querySelector(`.${comodo} .light`);
        const botao = document.querySelector(`button[data-comodo="${comodo}"]`);
        if (luz && botao) {
            luz.style.backgroundColor = "#444";
            luz.style.boxShadow = "none";
            this.luzes[comodo] = false;
            this.mostrarPopup(`Luz da ${botao.title} desligada`);
        }
    }

    alternar(comodo) {
        if (this.luzes[comodo]) {
            this.desligar(comodo);
        } else {
            this.ligar(comodo);
        }
        console.log(this.luzes[comodo]);
    }


    mostrarPopup(mensagem) {
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.textContent = mensagem;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add("fade-out");
            popup.addEventListener("transitionend", () => popup.remove());
        }, 2000);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button[data-comodo]").forEach(botao => {
        botao.addEventListener("click", () => {
            const comodo = botao.dataset.comodo;
            const central = CentralDeLuzes.getInstance();
            central.alternar(comodo);
        });
    });
});