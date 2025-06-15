const canvas = document.getElementById('emoji-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const emojis = ['😀','😂','😎','🥳','😍','🤩','😜','😇','🤖','👻','😺','🙈'];
const particles = [];
const count = 40;

for (let i = 0; i < count; i++) {
    particles.push({
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 24 + Math.random() * 24,
        speedX: -1 + Math.random() * 2,
        speedY: -1 + Math.random() * 2
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.emoji, p.x, p.y);
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
    });
    requestAnimationFrame(update);
}
update();

document.getElementById('start-button').addEventListener('click', () => {
    window.location.href = 'game.html';
});
