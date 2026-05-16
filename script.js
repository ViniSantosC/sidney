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
const divObrigado = document.getElementById("obrigadoDiv")

btn.addEventListener("click", () => {
  scene.classList.add("show");
  divObrigado.classList.add("mostar")

  /* SOM */
  const audio = new Audio("bill.mp3");
  audio.volume = 0.4;
  audio.play();

  /* FECHAR */
  setTimeout(() => {
    scene.classList.remove("show");
  }, 5000);
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
  divObrigado.classList.add("mostar")

  const audio = new Audio("misterio.mp3");
  audio.volume = 0.4;
  audio.play();

  setTimeout(() => {
    dipperScene.classList.remove("show");
  }, 5000);
});

const button = document.getElementById("openMobile");

const overlay = document.getElementById("overlay");

const phone = document.querySelector(".phone");

const finalMessage = document.getElementById("finalMessage");

button.addEventListener("click", () => {
  overlay.classList.add("active");

  startParticles();

  /* depois de 10 segundos */

  setTimeout(() => {
    /* animação sumindo */

    phone.classList.add("hide");

    /* remove totalmente */

    setTimeout(() => {
      phone.style.display = "none";

      finalMessage.classList.add("show");
    }, 10000);
  }, 10000);
});

button.addEventListener("click", () => {
  overlay.classList.add("active");

  setTimeout(() => {
    message.classList.add("show");

    startParticles();
  }, 4000);
});

/* PARTICULAS */

function startParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  const textCanvas = document.createElement("canvas");
  const textCtx = textCanvas.getContext("2d");

  textCanvas.width = canvas.width;
  textCanvas.height = canvas.height;

  textCtx.fillStyle = "white";

  let fontSize = 140;

  if (window.innerWidth < 600) {
    fontSize = 70;
  }

  if (window.innerWidth < 400) {
    fontSize = 50;
  }

  textCtx.font = `bold ${fontSize}px Arial`;

  textCtx.textAlign = "center";

  textCtx.fillText("3DM te ama", canvas.width / 2, canvas.height / 2);

  const imageData = textCtx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < imageData.height; y += 6) {
    for (let x = 0; x < imageData.width; x += 6) {
      const index = (y * imageData.width + x) * 4;

      if (imageData.data[index + 3] > 128) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,

          targetX: x,
          targetY: y,

          size: 2,
        });
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += (p.targetX - p.x) * 0.015;
      p.y += (p.targetY - p.y) * 0.015;

      ctx.beginPath();

      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      ctx.fillStyle = "#00ffae";

      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00ffae";

      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

const digita = document.getElementById("digita");
let texto = `
Em apenas alguns meses… o senhor conseguiu deixar sua marca no 3DM.
`


let i = 0
let velocidade = 40
digita.innerHTML = "";

function digitar() {
  if(i < texto.length) {
    digita.textContent += texto.charAt(i);

    i++
    setTimeout(digitar, velocidade)
  }  
}
digitar()

