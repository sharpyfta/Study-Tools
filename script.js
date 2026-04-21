let gameData = [];

// 1. Fetch games from JSON
async function loadGames() {
    const response = await fetch('games.json');
    gameData = await response.json();
    displayGames(gameData);
}

// 2. Display games in the grid
function displayGames(games) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = games.map(game => `
        <div class="card" onclick="launchGame('${game.url}')">
            <img src="${game.image}" alt="${game.name}">
            <div class="card-info">
                <h3>${game.name}</h3>
                <span class="badge">${game.tag}</span>
            </div>
        </div>
    `).join('');
}

// 3. Search functionality
function filterGames() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filtered = gameData.filter(game => game.name.toLowerCase().includes(query));
    displayGames(filtered);
}

// 4. Tab Cloaker (About:Blank)
function launchGame(url) {
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

// 5. Modal Logic for Settings, Info, etc.
const modalContent = {
    settings: "<h2>Settings</h2><p>Toggle Dark Mode or Change Tab Icon here.</p>",
    info: "<h2>About</h2><p>This is a collection of high-performance study tools.</p>",
    contact: "<h2>Contact</h2><p>Find us on Discord or GitHub.</p>",
    rules: "<h2>Rules</h2><p>1. Don't spam.<br>2. Have fun.</p>"
};

function openModal(type) {
    document.getElementById('modalBody').innerHTML = modalContent[type];
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

loadGames();
