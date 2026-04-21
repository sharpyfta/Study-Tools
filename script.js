let allContent = [];

// Load the JSON Data
async function loadContent() {
    try {
        const response = await fetch('games.json');
        allContent = await response.json();
        renderGrid(allContent);
    } catch (e) { console.error("Error loading games:", e); }
}

// Render the Cards
function renderGrid(data) {
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = data.map(item => `
        <div class="card" onclick="launchApp('${item.url}')">
            <div class="badge">${item.tag}</div>
            <img src="${item.img}" alt="${item.name}">
            <div class="card-title">${item.name}</div>
        </div>
    `).join('');
}

// Search Filter
function filterContent() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filtered = allContent.filter(item => item.name.toLowerCase().includes(query));
    renderGrid(filtered);
}

// The Professional Cloaker (About:Blank)
function launchApp(url) {
    const win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    const iframe = win.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = url;
    win.document.body.appendChild(iframe);
}

// Modal Data
const modals = {
    settings: "<h2>Settings</h2><p>Tab Cloaking: ON<br>Theme: Dark</p>",
    info: "<h2>About</h2><p>Study Tools v2.0 - Built for speed.</p>",
    contact: "<h2>Contact</h2><p>Find us on Discord or GitHub @SharpyFTA</p>",
    rules: "<h2>Rules</h2><p>1. No spamming.<br>2. Use responsibly.</p>"
};

function showModal(type) {
    document.getElementById('modalContent').innerHTML = modals[type];
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

loadContent();
