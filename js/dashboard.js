const DASHBOARD_PASSWORD = 'dhawan369';

const SHEET_CONFIG = {
    spreadsheetId: '1SedmOoJlN0RDqUjh_nZcn5lqsQB5hvw_K-_SEs7togo',
    clientEmail: 'dhawanwebsite@dhawan-asso.iam.gserviceaccount.com',
    privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkEWwaCznqImEh
V3BT+h5E5plWbKhOhJj5j6WalnLBJYjP3/lz+iu9T+MakGuuwU15/2znkRMAp4pA
lZi4Zld3Gf1MJkHCJrcHNFAOyf2jH5EovSZyNztQHWMzg5GDyxpEDHF8nw2b6/ap
UX+EIFn8M0UdQx0D9N+CeCdUBVeJrOzNfOyP4pDtg6KHpKQ4k8jbN94+2znM6uEn
AmK+K+jtLygx2q9mWmnUUYuMDfVXIUPLbgPTQj9wEeLmc6QgLkfBSXf96RKBvTAi
Vdp+r9DZoDlV4XS6mrJfXYoray7YpDCOXO7F+5fq3cWnh0oTxzYqzkFWAW/qxyHm
BgcUyEQzAgMBAAECggEAN9MBwD7Pnt3BxNF2k+xHvlPkGqbwAX9WeZup0lachyGZ
Unm37AFUPp7e/Bvlt9ln3jnNuWEAYTmgbec4xo1z9z9tkyp1N3Vq01W2Y8HQvl8w
SfdKDJTEZrcJGO8MZRaHQl4lgyyvOb1o+SWUyMUlOQ3M128NgVohbsgpQYprxZj4
l+dGR5udLbN789oIiSFDGKmw9mlATQyx5/ywKiVaxExvME0TwlixtaEpYu41o1if
SlisHo0pPBKW8Yc4zsRijn2R5Z2tBAXQHWhAxhu1aLQOFxAwVGDJZPC5Uglt4+R+
DjspKtGZuut5Kh6B7G2eFyTLabtDt4bRf9MXOCbUCQKBgQDS6TWcgfDYm4hiKJnp
whHiqBkMIAIGLIQ9akaqFcmbjVO465Qm07dNqjK0jtW7vQMeb0fzs22PDrdBWDgI
3i6TcswWajZW6Z1rE+JUWEOBVnSP5bsnsXZqOjuZqiDyovKBAAOf95A5UEVlHgIX
cSNNkw/gzOF0XoxaUfDLxy2bdwKBgQDHJJTZSrAZ0bFMkizsgPrUmegBqM4gXt8I
zWJp/xPYvPu8F6x9WgW8p+l3sJfQsydD94Yi9gQmsaZGWr3bxwTvhgqqSo/WOHjP
RXvYXjwlB8k7Wg7pNSrfx8vMrXsM6DV7CWSCEPZMWwyaYTpkNUirG1gUtqXuFW+6
A0ZSMTCUJQKBgDiBTmGt1m7RzIovwnyEB/Kngn5jHOe2iX9Ct8fdqnPIO0PxqXF1
i0h9brQ9CDoR+4Ht4mMCEToggSw6jFij3eqW+OKQdhp24DvNyfc65msCVJwwuiF6
Q/VVwJ38nHMlAL9a153F35fbT5w1m+3X29NusPRTL5vTsNqJ1W9i328lAoGAOLHf
dqVe0VrzoRsUkxh9UL2oYaCPXoPj93uRgx/NpKzY9km/H8jbTUR4oUyzTAVVLnJv
y9BCikmVTv5Sgxl7/D0rGCQ2IwTc0BW2FnltohU/YxhWmmo6lI8rJFBXcetCHo8k
ACuYE1Dwm5sGprTMxXn5b5w4TTnpHwoDoS7D58kCgYEAoqhzg4Oz/mEgH/ZCWPZb
4vrlN/gk8hQ5hJui+MhVO+E2ufKc/FNgjhKUYuOzlACkwu0fCTaE+m+HNPtNHecS
JshHAtwAzwgF1e6fDLDtAw173VgtCgYGoHFXJtGAJqADy4OxVIaIB+ORC3F6h3y3
CTZ909S1lvSjMbMkKQbQdmQ=
-----END PRIVATE KEY-----`
};

const COLUMNS = ['Timestamp', 'from_name', 'from_email', 'phone', 'service', 'location', 'purpose', 'message', 'form'];

function b64url(s) {
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToDer(pem) {
    const b64 = pem.replace(/-----BEGIN [\w\s]+-----/, '').replace(/-----END [\w\s]+-----/, '').replace(/\s/g, '');
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
}

async function getAccessToken() {
    const now = Math.floor(Date.now() / 1000);
    const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const claim = b64url(JSON.stringify({
        iss: SHEET_CONFIG.clientEmail,
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now
    }));
    const sigInput = header + '.' + claim;

    const key = await crypto.subtle.importKey('pkcs8', pemToDer(SHEET_CONFIG.privateKey),
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(sigInput));
    const jwt = sigInput + '.' + b64url(String.fromCharCode(...new Uint8Array(sig)));

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + jwt
    });
    const tokenData = await tokenRes.json();
    return tokenData.access_token;
}

async function fetchSheetData() {
    const accessToken = await getAccessToken();
    const range = 'Sheet1!A:I';
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_CONFIG.spreadsheetId}/values/${range}`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    return response.json();
}

function getTodayStr() {
    const d = new Date();
    return d.toLocaleDateString();
}

function isToday(timestampStr) {
    if (!timestampStr) return false;
    return timestampStr.startsWith(getTodayStr());
}

function buildTable(rows, searchTerm) {
    if (!rows || rows.length < 2) {
        return `<div class="empty-state"><div class="icon">&#x1F4ED;</div><p>No submissions yet</p></div>`;
    }

    let filtered = rows.slice(1);
    if (searchTerm) {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(row =>
            row.some(cell => cell && cell.toString().toLowerCase().includes(q))
        );
    }

    if (filtered.length === 0) {
        return `<div class="empty-state"><div class="icon">&#x1F50D;</div><p>No results found</p></div>`;
    }

    let html = '<table><thead><tr>';
    COLUMNS.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';

    filtered.reverse().forEach(row => {
        html += '<tr>';
        row.forEach((cell, i) => {
            let val = cell || '';
            if (i === 8 && val) {
                const cls = val.toLowerCase().includes('contact') ? 'contact' :
                            val.toLowerCase().includes('schedule') ? 'schedule' : 'footer';
                val = `<span class="form-badge ${cls}">${val}</span>`;
            }
            html += `<td>${val}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}

function updateStats(rows) {
    if (!rows || rows.length < 2) {
        document.getElementById('totalCount').textContent = '0';
        document.getElementById('todayCount').textContent = '0';
        document.getElementById('contactCount').textContent = '0';
        document.getElementById('scheduleCount').textContent = '0';
        return;
    }

    const data = rows.slice(1);
    document.getElementById('totalCount').textContent = data.length;
    document.getElementById('todayCount').textContent = data.filter(r => isToday(r[0])).length;
    document.getElementById('contactCount').textContent = data.filter(r => r[8] && r[8].toLowerCase().includes('contact')).length;
    document.getElementById('scheduleCount').textContent = data.filter(r => r[8] && r[8].toLowerCase().includes('schedule')).length;
}

async function loadDashboard() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const tableContent = document.getElementById('tableContent');
    const rowCount = document.getElementById('rowCount');

    tableContent.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading submissions...</p></div>`;

    try {
        const result = await fetchSheetData();
        const rows = result.values || [];

        updateStats(rows);

        if (rows.length > 1) {
            rowCount.textContent = `${rows.length - 1} submission${rows.length - 1 !== 1 ? 's' : ''}`;
        } else {
            rowCount.textContent = '0 submissions';
        }

        tableContent.innerHTML = buildTable(rows, searchTerm);
    } catch (err) {
        console.error(err);
        tableContent.innerHTML = `<div class="empty-state"><div class="icon">&#x26A0;</div><p>Failed to load data. Check console for details.</p></div>`;
    }
}

function unlockDashboard() {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('loginError').style.display = 'none';
    sessionStorage.setItem('dashboard_unlocked', 'true');
    loadDashboard();
    document.getElementById('refreshBtn').addEventListener('click', loadDashboard);
    let searchTimer;
    document.getElementById('searchInput').addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(loadDashboard, 400);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('dashboard_unlocked') === 'true') {
        unlockDashboard();
        return;
    }

    const loginBtn = document.getElementById('loginBtn');
    const pwInput = document.getElementById('loginPassword');

    function attemptLogin() {
        if (pwInput.value === DASHBOARD_PASSWORD) {
            unlockDashboard();
        } else {
            document.getElementById('loginError').style.display = 'block';
            pwInput.value = '';
            pwInput.focus();
        }
    }

    loginBtn.addEventListener('click', attemptLogin);
    pwInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') attemptLogin();
    });
    pwInput.focus();
});
