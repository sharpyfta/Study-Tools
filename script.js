// --- Configuration & State ---
const container = document.getElementById('container');
const searchBar = document.getElementById('searchBar');
const zoneViewer = document.getElementById('zoneViewer');
const iframe = zoneViewer.querySelector('iframe');
const zoneTitle = document.getElementById('zoneTitle');
const zoneId = document.getElementById('zoneId');
const body = document.body;

// --- 1. Search Logic ---
// Efficiently filters items based on the title or ID
searchBar.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.zone-item');

    items.forEach(item => {
        const title = item.querySelector('h3')?.innerText.toLowerCase() || "";
        const id = item.dataset.id?.toLowerCase() || "";
        
        if (title.includes(term) || id.includes(term)) {
            item.style.display = 'block';
            item.style.opacity = '1';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
});

// --- 2. Modal/Viewer Logic ---
// Handles opening and closing the zone iframe
function openZone(url, title, id) {
    zoneTitle.innerText = title;
    zoneId.innerText = `ID: ${id}`;
    iframe.src = url;
    
    zoneViewer.style.display = 'block';
    // Small timeout to allow CSS transitions to trigger
    setTimeout(() => zoneViewer.style.opacity = '1', 10);
}

function closeZone() {
    zoneViewer.style.opacity = '0';
    setTimeout(() => {
        zoneViewer.style.display = 'none';
        iframe.src = ''; // Clear source to stop audio/video
    }, 300);
}

// Event Delegation: Better for performance with many items
container.addEventListener('click', (e) => {
    const item = e.target.closest('.zone-item');
    if (item) {
        const url = item.dataset.url;
        const title = item.querySelector('h3').innerText;
        const id = item.dataset.id;
        openZone(url, title, id);
    }
});

// --- 3. Dark Mode Toggle ---
const darkModeToggle = document.getElementById('darkModeToggle');

// Check for saved preference
if (localStorage.getItem('theme') === 'light') {
    body.classList.remove('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference to LocalStorage
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Smooth rotation/icon change feedback
    darkModeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => darkModeToggle.style.transform = 'scale(1)', 100);
});

// --- 4. Close Modal on Escape Key ---
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeZone();
});
