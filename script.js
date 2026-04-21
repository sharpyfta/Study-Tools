let gameData = [];

// 1. --- LOAD GAMES FROM JSON ---
// This looks for your games.json file and puts them on the screen
async function loadGames() {
    try {
        const response = await fetch('games.json');
        gameData = await response.json();
        displayGames(gameData);
    } catch (error) {
        console.error("Could not load games.json. Make sure the file exists!", error);
    }
}

// 2. --- DISPLAY GAMES IN GRID ---
function displayGames(games) {
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = games.map(game => `
        <div class="card" onclick="launchGame('${game.url}')">
            <img src="${game.image}" alt="${game.name}">
            <div class="card-info">
                <h3>${game.name}</h3>
                <span class="badge">${game.tag || 'New'}</span>
            </div>
        </div>
    `).join('');
}

// 3. --- SEARCH FUNCTION ---
function filterContent() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filtered = gameData.filter(game => 
        game.name.toLowerCase().includes(query)
    );
    displayGames(filtered);
}

// 4. --- TAB CLOAKING SYSTEM ---
function setCloak(title, iconUrl) {
    document.title = title;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = iconUrl;
    localStorage.setItem('cloakTitle', title);
    localStorage.setItem('cloakIcon', iconUrl);
}

// 5. --- LAUNCH GAME (ABOUT:BLANK CLOAKER) ---
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

// 6. --- MODAL POPUP CONTENT ---
const modals = {
    settings: `
        <h2>Settings & Cloaking</h2>
        <p>Change how this tab looks in your history:</p>
        <input type="text" id="customTitle" placeholder="Custom Tab Title..." style="width:80%; padding:8px; margin-bottom:10px; background:#0d1117; border:1px solid #30363d; color:white;">
        <div class="cloak-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <button class="nav-btn" onclick="setCloak(document.getElementById('customTitle').value || 'My Drive', 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png')">Google Drive</button>
            <button class="nav-btn" onclick="setCloak('Canvas', 'https://ok2static.oktacdn.com/assets/img/logos/canvas.0543666f7f2bba689f53e0f0665977a4.png')">Canvas</button>
            <button class="nav-btn" onclick="setCloak('Classes', 'https://www.gstatic.com/classroom/favicon.png')">Classroom</button>
            <button class="nav-btn" onclick="setCloak('Study Tools', 'favicon.ico')">Reset</button>
        </div>
    `,
    info: `
        <h2>Project Info</h2>
        <p><b>Study Tools</b> is a high-performance gaming hub.</p>
        <p><b>Creator:</b> Sharpy / SharpyFTA</p>
    `,
    contact: `
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:sharpzfta12@gmail.com" style="color:var(--accent)">sharpzfta12@gmail.com</a></p>
    `,
    rules: `
        <h2>Submit a Game</h2>
        <form action="mailto:sharpzfta12@gmail.com" method="post" enctype="text/plain">
            <input type="text" name="GameName" placeholder="Game Name" required style="width:90%; margin-bottom:10px; background:#0d1117; border:1px solid #30363d; color:white; padding:8px;"><br>
            <button type="submit" class="nav-btn">Send Request</button>
        </form>
    `
};

function openModal(type) {
    document.getElementById('modalBody').innerHTML = modals[type];
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

// 7. --- INITIALIZE ON LOAD ---
window.onload = () => {
    const savedTitle = localStorage.getItem('cloakTitle');
    const savedIcon = localStorage.getItem('cloakIcon');
    if (savedTitle) document.title = savedTitle;
    if (savedIcon) setCloak(savedTitle, savedIcon);
    loadGames();
};
