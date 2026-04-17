document.addEventListener('DOMContentLoaded', () => {
    const scanForm = document.getElementById('scan-form');
    const urlInput = document.getElementById('url-input');
    const scanBtn = document.getElementById('scan-btn');
    const loader = scanBtn.querySelector('.loader');
    const btnText = scanBtn.querySelector('.btn-text');
    
    const resultsArea = document.getElementById('results-area');
    const targetUrlSpan = document.getElementById('target-url');
    const vulnerabilityList = document.getElementById('vulnerability-list');
    
    const historyBody = document.getElementById('history-body');
    const navActions = document.getElementById('nav-actions');

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    // Initial Auth Check
    updateAuthUI();
    if (token) {
        fetchHistory();
    }

    function updateAuthUI() {
        if (token && userEmail) {
            navActions.innerHTML = `
                <a href="#scanner">Scanner</a>
                <a href="#history">Historical Logs</a>
                <div class="user-info">
                    <span class="user-email">${userEmail}</span>
                    <button class="btn-logout" id="logout-btn">Logout</button>
                </div>
            `;
            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('userEmail');
                window.location.reload();
            });
        } else {
            navActions.innerHTML = `
                <a href="#scanner">Scanner</a>
                <a href="auth.html" class="btn-login">Login / Sign Up</a>
            `;
            // If not logged in and trying to scan, show restricted message
            if (scanForm) {
                scanForm.addEventListener('submit', (e) => {
                    if (!localStorage.getItem('token')) {
                        e.preventDefault();
                        window.location.href = 'auth.html';
                    }
                }, true);
            }
        }
    }

    scanForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = urlInput.value.trim();
        if (!url || !token) return;

        setLoading(true);
        resultsArea.classList.add('hidden');
        vulnerabilityList.innerHTML = '';

        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ url })
            });

            if (response.status === 401) return handleUnauthorized();

            const data = await response.json();
            if (response.ok) {
                displayResults(data);
                fetchHistory();
            } else {
                alert(data.error || 'Scan failed');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while scanning.');
        } finally {
            setLoading(false);
        }
    });

    async function fetchHistory() {
        try {
            const response = await fetch('/api/results', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.status === 401) return handleUnauthorized();
            
            const data = await response.json();
            renderHistory(data);
        } catch (error) {
            console.error('History fetch error:', error);
        }
    }

    function handleUnauthorized() {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.href = 'auth.html';
    }

    function renderHistory(history) {
        if (!historyBody) return;
        historyBody.innerHTML = history.map(scan => `
            <tr>
                <td>${scan.url}</td>
                <td><span class="badge-url">${scan.vulnerabilities.length}</span></td>
                <td>${new Date(scan.timestamp).toLocaleString()}</td>
                <td><button class="btn-view" onclick="viewScan('${scan._id}')">View</button></td>
            </tr>
        `).join('');
    }

    function displayResults(data) {
        targetUrlSpan.textContent = data.url;
        resultsArea.classList.remove('hidden');
        
        if (data.vulnerabilities.length === 0) {
            vulnerabilityList.innerHTML = '<p class="glass-card" style="grid-column: 1/-1">No vulnerabilities detected. Good job!</p>';
            return;
        }

        vulnerabilityList.innerHTML = data.vulnerabilities.map(v => `
            <div class="vuln-card severity-${v.severity}">
                <h4>${v.type}</h4>
                <p>${v.description}</p>
                <span class="severity-label bg-${v.severity}">${v.severity}</span>
            </div>
        `).join('');
        
        resultsArea.scrollIntoView({ behavior: 'smooth' });
    }

    function setLoading(isLoading) {
        if (isLoading) {
            scanBtn.disabled = true;
            loader.classList.remove('hidden');
            btnText.textContent = 'Scanning...';
        } else {
            scanBtn.disabled = false;
            loader.classList.add('hidden');
            btnText.textContent = 'Start Scan';
        }
    }

    window.viewScan = async (id) => {
        try {
            const response = await fetch('/api/results', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const history = await response.json();
            const scan = history.find(s => s._id === id);
            if (scan) {
                displayResults(scan);
            }
        } catch (error) {
            console.error('View scan error:', error);
        }
    };
});
