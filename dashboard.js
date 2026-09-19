document.addEventListener('DOMContentLoaded', () => {
    // Check Authentication
    const sessionData = localStorage.getItem('currentUser');
    if (!sessionData) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(sessionData);
    
    // Update Header and Identity
    document.getElementById('displayUserName').innerText = user.name;
    document.getElementById('userAvatar').innerText = user.name.charAt(0);
    document.getElementById('displayRoleBadge').innerText = user.role;
    document.getElementById('welcomeTitle').innerText = `Welcome, ${user.name}`;
    document.getElementById('accessLevelDesc').innerText = `Authenticated via ${user.authType} as [${user.role.toUpperCase()}]`;

    // Apply Role-Based Control to Navigation Sidebar
    applyRBAC(user.role);

    // Populate Custom Dashboard Metrics Based on Role
    populateDashboardMetrics(user.role);
});

function applyRBAC(role) {
    const allRbacClasses = ['rbac-admin', 'rbac-staff', 'rbac-agent', 'rbac-student'];
    
    allRbacClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(el => {
            // Hide element unless it shares the active user role class
            if (!el.classList.contains(`rbac-${role}`)) {
                el.style.display = 'none';
            }
        });
    });
}

function populateDashboardMetrics(role) {
    const statsContainer = document.getElementById('statsGrid');
    statsContainer.innerHTML = ''; // Clear default

    let cards = [];

    if (role === 'admin') {
        cards = [
            { label: 'Total Revenue', value: '$124,500' },
            { label: 'Active Students', value: '1,280' },
            { label: 'Sub-Agents', value: '42' },
            { label: 'Visa Success Rate', value: '96.4%' }
        ];
    } else if (role === 'staff') {
        cards = [
            { label: 'Assigned Students', value: '38' },
            { label: 'Applications Pending', value: '12' },
            { label: 'Visas Approved (Month)', value: '8' },
            { label: 'Tasks Pending', value: '5' }
        ];
    } else if (role === 'agent') {
        cards = [
            { label: 'Referred Students', value: '15' },
            { label: 'Successful Enrollments', value: '9' },
            { label: 'Pending Commission', value: '$2,400' }
        ];
    } else if (role === 'student') {
        cards = [
            { label: 'Application Status', value: 'Under Review' },
            { label: 'Target University', value: 'Univ. of Sydney' },
            { label: 'Documents Verified', value: '6/8' },
            { label: 'Offer Letter', value: 'Issued' }
        ];
    }

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'stat-card';
        cardElement.innerHTML = `
            <h4>${card.label}</h4>
            <div class="value">${card.value}</div>
        `;
        statsContainer.appendChild(cardElement);
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
