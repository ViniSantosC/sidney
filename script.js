const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Configura o canvas para preencher a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres que vão cair (pode alterar pelos caracteres que preferir)
const chars =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
const charSize = 16;
const drops = [];

// Calcula quantas colunas são necessárias
const columns = canvas.width / charSize;

// Inicializa a posição de queda de cada coluna
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function draw() {
  // Efeito de fade para dar o rastro (transparência menor mantém o rastro mais longo)
  ctx.fillStyle = "rgba(5, 0, 16, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cor e fonte do texto
  ctx.fillStyle = "#9400D3"; // Tom de roxo (Violeta escuro)
  ctx.font = charSize + "px monospace";

  // Desenha os caracteres
  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * charSize, drops[i] * charSize);

    // Reinicia a gota no topo aleatoriamente quando ela atinge o fundo
    if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

// Atualiza o quadro a cada 33 milissegundos
setInterval(draw, 33);

// Ajusta o tamanho caso a janela seja redimensionada
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const btn = document.getElementById("aceitar");
const scene = document.getElementById("bill-scene");
const eye = document.querySelector(".bill-eye");

btn.addEventListener("click", () => {
  scene.classList.add("show");

  /* SOM */
  const audio = new Audio("bill.mp3");
  audio.volume = 0.4;
  audio.play();

  /* FECHAR */
  setTimeout(() => {
    scene.classList.remove("show");
  }, 7000);
});

/* OLHO SEGUINDO MOUSE */
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  eye.style.transform = `translate(${x}px, ${y}px)`;
});
const dipperBtn = document.getElementById("dipperBtn");
const dipperScene = document.getElementById("dipper-scene");

dipperBtn.addEventListener("click", () => {
  dipperScene.classList.add("show");

  const audio = new Audio("misterio.mp3");
  audio.volume = 0.4;
  audio.play();

  setTimeout(() => {
    dipperScene.classList.remove("show");
  }, 7000);
});