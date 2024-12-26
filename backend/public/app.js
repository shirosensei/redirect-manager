const loginForm = document.getElementById('login-form');
const dashboardSection = document.getElementById('dashboard-section');
const loginSection = document.getElementById('login-section');
const redirectionsTable = document.getElementById('redirections-table');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        loadRedirections();
    } else {
        alert('Login failed');
    }
});

async function loadRedirections() {
    const token = localStorage.getItem('token');
    const response = await fetch('/dashboard/redirections', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const redirections = await response.json();
    redirectionsTable.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Status Code</th>
            <th>Actions</th>
            <th>Name</th>
        </tr>
    `;

    redirections.forEach((redirection) => {
        redirectionsTable.innerHTML += `
            <tr>
                <td>${redirection.id}</td>
                <td>${redirection.status_code}</td>
                <td>
                    <input type="submit" value="${redirection.url}" onchange="updateRedirection(${redirection.url}, this.value)">
                </td>
                <td>${redirection.name}</td>
            </tr>
        `;
    });
}

async function updateRedirection(id) {
    const token = localStorage.getItem('token');
    await fetch('/dashboard/redirections', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    });

    loadRedirections();
}
