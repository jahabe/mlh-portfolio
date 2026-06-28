// ── Canvas setup ─────────────────────────────────────────
const canvas = document.getElementById('game');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const TILE = 48;

// ── Colors ───────────────────────────────────────────────
const C = {
    grass:      '#6ab04c',
    path:       '#c8a96e',
    pathEdge:   '#b8915a',
    pathPebble: '#b0936a',
    flowerStem: '#4a7c2f',
    sign:       '#8b6432',
    signText:   '#f5e6c8',
};

// ── Tilemap ──────────────────────────────────────────────
// 0 = grass, 1 = path
// 2 = about, 3 = education, 4 = experience, 5 = projects (popup)
// 7 = contact (future page)
//
// Row 14 is the walkable path.
// Above beds (rows 11-13): about (col 3), experience (col 13), contact (col 23)
// Below beds (rows 15-17): education (col 8), projects (col 18)
const COLS = 30;
const ROWS = 25;

const map = [
//col:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 0
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 1
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 2
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 3
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 4
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 5
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 6
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 7
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 8
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 9
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 10
    [   0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0  ], // row 11
    [   0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0  ], // row 12
    [   0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0  ], // row 13
    [   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6  ], // row 14
    [   0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 15
    [   0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 16
    [   0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 17
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 18
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 19
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 20
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 21
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 22
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 23
    [   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ], // row 24
];

// ── Flower beds ──────────────────────────────────────────
// Evenly spaced every 5 cols, alternating above/below path
// type 'popup' → opens a popup
// type 'page'  → will link to another page (shows [ENTER] for now)
const beds = [
    { id: 'about',    tile: 2, col: 3,  row: 11, label: 'ABOUT ME', color: '#e74c3c', type: 'popup',
        imgDx: 0, imgDy: 0, imgW: 144, imgH: 144 },
    { id: 'education',  tile: 3, col: 8,  row: 15, label: 'EDUCATION',  color: '#3498db', type: 'popup', 
        imgDx: -70, imgDy: -80, imgW: 288, imgH: 288 },
    { id: 'experience', tile: 4, col: 13, row: 11, label: 'EXPERIENCE', color: '#f39c12', type: 'popup',
        imgDx: 0, imgDy: 0, imgW: 144, imgH: 144 },
    { id: 'projects', tile: 5, col: 18, row: 15, label: 'PROJECTS', color: '#9b59b6', type: 'popup',
        imgDx: -30, imgDy: -50, imgW: 200, imgH: 200 },
    { id: 'contact', tile: 7, col: 23, row: 11, label: 'CONTACT', color: '#e84393', type: 'popup' },
    
];

// ── Tile helpers ─────────────────────────────────────────
function tileAt(col, row) {
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return -1;
    return map[row][col];
}

function isWalkable(col, row) {
    const t = tileAt(col, row);
    return t === 1 || t === 6;
}

// ── Character images ─────────────────────────────────────
const DIRS = ['south', 'north', 'east', 'west'];
const images = {};

DIRS.forEach(dir => {
    ['idle', 'walking'].forEach(state => {
        const img = new Image();
        img.src = `/static/img/character/${state}/rotations/${dir}.png`;
        images[`${state}_${dir}`] = img;
    });
});

// ── Bed images (optional per-bed custom image) ───────────
// Add an entry here to replace a bed's flower art with an image.
// The image file should be in static/img/.
const bedImages = {};

const uwImg = new Image();
uwImg.src = '/static/img/UofW.png';
bedImages['education'] = uwImg;

const buildingImg = new Image();
buildingImg.src = '/static/img/building.png';
bedImages['experience'] = buildingImg;

const houseImg = new Image();
houseImg.src = '/static/img/house.png';
bedImages['about'] = houseImg;

const constructionImg = new Image();
constructionImg.src = '/static/img/construction_transparent.png';
bedImages['projects'] = constructionImg;

// 저장된 위치 있으면 그걸로 시작, 없으면 기본값
const savedCol = parseInt(localStorage.getItem('playerCol')) || 0;
const savedRow = parseInt(localStorage.getItem('playerRow')) || 14;

const player = {
    col: savedCol, row: savedRow,
    x: savedCol * TILE, y: savedRow * TILE,
    targetCol: savedCol, targetRow: savedRow,
    moveProgress: 1,
    MOVE_SPEED: 0.12,
    dir: 'east',
    moving: false,
};

// ── Camera ───────────────────────────────────────────────
const cam = { x: 0, y: 0 };

function updateCamera() {
    const W = canvas.width;
    const H = canvas.height;

    const targetX = player.x + TILE / 2 - W / 2;
    const targetY = player.y + TILE / 2 - H / 2;

    cam.x = Math.max(0, Math.min(COLS * TILE - W, targetX));
    cam.y = Math.max(0, Math.min(ROWS * TILE - H, targetY - 100));
}

// ── Keyboard input ───────────────────────────────────────
const keys = {};

window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
    if ((e.key === 'Enter' || e.key === ' ') && !popupOpen) tryInteract();
    if (e.key === 'Escape' && popupOpen) closePopup();
});

window.addEventListener('keyup', e => { keys[e.key] = false; });

// ── Popup content builders ───────────────────────────────

function buildAboutHTML() {
    return `
        <div class="popup-section">
            <img src="/static/img/Jane_hackathon_refined.jpg" class="profile-pic">
            <p>Hello! I'm Jane Choi, a Computer Science student at the University of Washington.</p>
            <p>I love building things at the intersection of AI, systems, and design.
            I'm driven by curiosity, collaboration, and the belief that good software should feel good to use.</p>
        </div>
    `;
}

function buildEducationHTML() {
    return `
        <div class="popup-section">
            ${FLASK_EDUCATIONS.map(edu => `
                <div class="exp-item">
                    <div class="exp-company">${edu.school.toUpperCase()}</div>
                    <div class="exp-role">${edu.degree}</div>
                    <div class="exp-duration">${edu.duration}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function buildExperienceHTML() {
    return `
        <div class="popup-section">
            ${FLASK_EXPERIENCES.map(exp => `
                <div class="exp-item">
                    <div class="exp-company">${exp.company.toUpperCase()}</div>
                    <div class="exp-role">${exp.role}</div>
                    <div class="exp-duration">${exp.duration}</div>
                    <ul>
                        ${exp.description.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
}

function buildProjectsHTML() {
    return `
        <div class="popup-section">
            ${FLASK_PROJECTS.map(proj => `
                <div class="exp-item">
                    <div class="exp-company">${proj.company}</div>
                    <div class="exp-role">${proj.role}</div>
                    <div class="exp-duration">${proj.duration}</div>
                    <ul>
                        ${proj.description.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
}

function buildContactHTML() {
    return `
        <p style="text-align: center;">Feel free to reach out! :) </p>
        <div style="display: flex; justify-content: center; align-items: center; gap: 40px; padding: 40px 0;">
            <a href="https://linkedin.com/in/jane026/" target="_blank" title="LinkedIn">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" width="48" height="48" style="filter: invert(0.3);">
            </a>
            <a href="https://github.com/jahabe" target="_blank" title="GitHub">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" width="48" height="48" style="filter: invert(0.3);">
            </a>
            <a href="https://devpost.com/jahabe" target="_blank" title="Devpost">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/devpost.svg" width="48" height="48" style="filter: invert(0.3);">
            </a>
            <a href="mailto:janechoius03@gmail.com" target="_blank" title="Email">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg" width="48" height="48" style="filter: invert(0.3);">
            </a>
        </div>
    `;
}

// ── Popup data ───────────────────────────────────────────
// Built after page load so FLASK_* variables are available
const popupData = {
    about:      { title: '🌸 ABOUT ME',        html: buildAboutHTML()      },
    education:  { title: '🎓 EDUCATION',        html: buildEducationHTML()  },
    experience: { title: '💼 WORK EXPERIENCE',  html: buildExperienceHTML() },
    projects:   { title: '🔭 PROJECTS',         html: buildProjectsHTML()   },
    contact:    { title: '📬 CONTACT',          html: buildContactHTML()    },
};

// ── Popup open / close ───────────────────────────────────
let popupOpen = false;

function navigateTo(url) {
    let opacity = 0;
    const fade = setInterval(() => {
        opacity += 0.05;
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (opacity >= 1) {
            clearInterval(fade);
            window.location.href = url;
        }
    }, 16);
}

function tryInteract() {
    const { col, row } = player;
    const adjacentTiles = [
        [col, row - 1], [col, row + 1], [col - 1, row], [col + 1, row],
    ];

    // tile 6(hobbies zone)
    if (tileAt(player.col, player.row) === 6) {
        navigateTo('/jane/hobbies');
        return;
    }
    for (const bed of beds) {
        for (const [ac, ar] of adjacentTiles) {
            if (tileAt(ac, ar) === bed.tile) {
                if (bed.type === 'popup') openPopup(bed.id);
                else if (bed.type === 'page') navigateTo(bed.url);
                return;
            }
        }
    }
}

function openPopup(id) {
    const data = popupData[id];
    if (!data) { console.warn('No popup data for id:', id); return; }
    popupOpen = true;
    document.getElementById('popup-title').textContent = data.title;
    document.getElementById('popup-body').innerHTML    = data.html;
    document.getElementById('popup-overlay').classList.add('active');
}

function closePopup() {
    popupOpen = false;
    document.getElementById('popup-overlay').classList.remove('active');
}

document.getElementById('popup-close').addEventListener('click', closePopup);

// ── Grass texture dots ───────────────────────────────────
const grassDots = [];
for (let i = 0; i < 300; i++) {
    grassDots.push({
        x:     Math.floor(Math.random() * COLS * TILE),
        y:     Math.floor(Math.random() * ROWS * TILE),
        size:  Math.random() < 0.5 ? 1 : 2,
        color: Math.random() < 0.5 ? '#5a9a3c' : '#7ec854',
    });
}

// ── Cherry blossom petals ─────────────────────────────────
const petals = [];
for (let i = 0; i < 60; i++) {
    petals.push({
        x:      Math.random() * 1920,   // 화면 너비보다 넉넉히
        y:      Math.random() * 1080,   // 처음엔 랜덤 위치에서 시작
        size:   Math.random() * 6 + 3,
        speedX: Math.random() * 1 - 0.5,  // 좌우로 살짝 흔들림
        speedY: Math.random() * 1 + 0.5,  // 아래로 떨어지는 속도
        angle:  Math.random() * Math.PI * 2,
        spin:   Math.random() * 0.05 - 0.025,
        opacity: Math.random() * 0.6 + 0.4,
        color:  ['#ffb7c5', '#ffc0cb', '#ff91a4', '#ffd1dc'][Math.floor(Math.random() * 4)],
    });
}

// ── Draw: world ──────────────────────────────────────────
function drawScene() {
    const W = canvas.width;
    const H = canvas.height;

    ctx.fillStyle = C.grass;
    ctx.fillRect(0, 0, W, H);

    for (const dot of grassDots) {
        ctx.fillStyle = dot.color;
        ctx.fillRect(dot.x - cam.x, dot.y - cam.y, dot.size, dot.size);
    }

    // Path (row 14, full width)
    for (let ci = 0; ci < COLS; ci++) {
        const px = ci * TILE - cam.x;
        const py = 14 * TILE - cam.y;

        ctx.fillStyle = C.path;
        ctx.fillRect(px, py, TILE, TILE);

        ctx.fillStyle = C.pathEdge;
        ctx.fillRect(px, py,            TILE, 2);
        ctx.fillRect(px, py + TILE - 2, TILE, 2);

        ctx.fillStyle = C.pathPebble;
        ctx.fillRect(px + 6,  py + 10, 3, 2);
        ctx.fillRect(px + 18, py + 20, 2, 2);
        ctx.fillRect(px + 30, py + 8,  3, 2);
    }

    for (const bed of beds) {
        drawFlowerBed(bed);
    }

    // Title text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '48px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('JANE CHOI', canvas.width / 2, 100);
    ctx.textAlign = 'left';

    // Hobbies hint at the right end of the path
    const blinkOpacity = Math.abs(Math.sin(Date.now() / 750));
    ctx.fillStyle = `rgba(255, 255, 255, ${blinkOpacity})`;
    ctx.font = '8px "Press Start 2P"';
    ctx.textAlign = 'center';

    const hintX = 29 * TILE - cam.x;
    const hintY = 14 * TILE - cam.y + TILE / 2 - 30;
    ctx.fillText('HOBBIES →', hintX, hintY);
    ctx.textAlign = 'left';

    // Cherry blossom petals
    for (const p of petals) {
        // 위치 업데이트
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.spin;

        // 화면 밖으로 나가면 위에서 다시 시작
        if (p.y > canvas.height + 10) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }

        // 꽃잎 그리기 (타원형)
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawFlowerBed(bed) {
    const px = bed.col * TILE - cam.x;
    const py = bed.row * TILE - cam.y;
    const bw = 3 * TILE;
    const bh = 3 * TILE;

    // If this bed has a custom image, draw it instead of the default flowers
    const customImg = bedImages[bed.id];
    if (customImg && customImg.complete && customImg.naturalWidth > 0) {
        const dx = bed.imgDx ?? 0;
        const dy = bed.imgDy ?? 0;
        const iw = bed.imgW  ?? bw;
        const ih = bed.imgH  ?? bh;
        ctx.drawImage(customImg, px + dx, py + dy, iw, ih);
    } else {
        const flowerPositions = [
            [px + 40, py + 50], [px + 56, py + 44], [px + 76, py + 52],
            [px + 44, py + 72], [px + 64, py + 66], [px + 88, py + 70],
            [px + 38, py + 94], [px + 58, py + 90], [px + 80, py + 96],
            [px + 48, py + 110],[px + 72, py + 104],[px + 92, py + 110],
        ];
        const flowerColors = [bed.color, '#f9ca24', '#ff7979'];

        flowerPositions.forEach(([fx, fy], i) => {
        // 꽃마다 다른 타이밍으로 흔들리게 offset 줌
        const sway = Math.sin(Date.now() / 600 + i * 0.8) * 3;
        const bob  = Math.cos(Date.now() / 800 + i * 0.5) * 2;

        // Stem (흔들림 반영)
        ctx.fillStyle = C.flowerStem;
        ctx.fillRect(fx + sway * 0.5, fy + 4, 2, 8);

        // Petal
        ctx.fillStyle = flowerColors[i % flowerColors.length];
        ctx.beginPath();
        ctx.arc(fx + 1 + sway, fy + bob, 4, 0, Math.PI * 2);
        ctx.fill();

        // Center dot
        ctx.fillStyle = '#fff176';
        ctx.beginPath();
        ctx.arc(fx + 1 + sway, fy + bob, 1.5, 0, Math.PI * 2);
        ctx.fill();
    });
    }

    // Sign below the bed
    const signY = py + bh + 4;
    ctx.fillStyle = C.sign;
    ctx.fillRect(px + 2, signY, bw - 4, 20);
    ctx.fillStyle = C.signText;
    ctx.font = '8px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText(bed.label, px + bw / 2, signY + 14);
    ctx.textAlign = 'left';

    // [ ENTER ] prompt when player is nearby
    const { col, row } = player;
    const adjacentToPlayer = [
        [col, row - 1], [col, row + 1], [col - 1, row], [col + 1, row],
    ];
    const playerIsNearby = adjacentToPlayer.some(([ac, ar]) => tileAt(ac, ar) === bed.tile);

    if (playerIsNearby && !popupOpen) {
        ctx.fillStyle = '#fff176';
        ctx.font = '6px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('[ ENTER ]', px + bw / 2, py - 8);
        ctx.textAlign = 'left';
    }
}

// ── Draw: player ─────────────────────────────────────────
function drawPlayer() {
    const px = player.x - cam.x + TILE / 2;
    const py = player.y - cam.y + TILE / 2;

    const useWalkFrame = player.moving && Math.floor(Date.now() / 200) % 2 === 0;
    const imgKey = useWalkFrame ? `walking_${player.dir}` : `idle_${player.dir}`;
    const img    = images[imgKey];
    const size   = TILE * 1.8;

    if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, px - size / 2, py - size * 0.85, size, size);
    } else {
        ctx.fillStyle = '#4a90d9';
        ctx.fillRect(px - 8, py - 24, 16, 18);
        ctx.fillStyle = '#f5cba7';
        ctx.fillRect(px - 6, py - 38, 12, 14);
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(px - 7, py - 42, 14, 8);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.beginPath();
    ctx.ellipse(px, py - 8, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();
}

// ── Game update ──────────────────────────────────────────
function update() {
    if (popupOpen || player.moveProgress < 1) return;

    let dc = 0, dr = 0;

    if      (keys['ArrowLeft'])  { dc = -1; player.dir = 'west';  }
    else if (keys['ArrowRight']) { dc =  1; player.dir = 'east';  }
    else if (keys['ArrowUp'])    { dr = -1; player.dir = 'north'; }
    else if (keys['ArrowDown'])  { dr =  1; player.dir = 'south'; }

    if (dc !== 0 || dr !== 0) {
        const nextCol = player.col + dc;
        const nextRow = player.row + dr;
        if (isWalkable(nextCol, nextRow)) {
            player.targetCol    = nextCol;
            player.targetRow    = nextRow;
            player.moveProgress = 0;
            player.moving       = true;
        }
    } else {
        player.moving = false;
    }
}

function updatePlayerPosition() {
    if (player.moveProgress >= 1) return;

    player.moveProgress = Math.min(1, player.moveProgress + player.MOVE_SPEED);
    player.x = (player.col + (player.targetCol - player.col) * player.moveProgress) * TILE;
    player.y = (player.row + (player.targetRow - player.row) * player.moveProgress) * TILE;

    if (player.moveProgress >= 1) {
        player.col = player.targetCol;
        player.row = player.targetRow;
        // 위치 저장
        localStorage.setItem('playerCol', player.col);
        localStorage.setItem('playerRow', player.row);
    }
}buildProjectsHTML

// ── Main loop ────────────────────────────────────────────
function loop() {
    update();
    updatePlayerPosition();
    updateCamera();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScene();
    drawPlayer();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);