// Gestion globale de l'application Blood Bowl
document.addEventListener('DOMContentLoaded', () => {
  // Détection de la page courante
  const currentPage = getCurrentPage();
  
  // Gestion de la navigation active
  updateActiveNavigation(currentPage);
  
  // Initialisation selon la page
  switch(currentPage) {
    case 'teams':
      initTeamsPage();
      break;
    case 'skills':
      initSkillsPage();
      break;
    case 'rules':
      initRulesPage();
      break;
    case 'starplayers':
      initStarplayersPage();
      break;
    default:
      // Page d'accueil, pas d'initialisation spécifique
      break;
  }
});

// Utilitaires
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  
  if (filename.includes('teams')) return 'teams';
  if (filename.includes('skills')) return 'skills';
  if (filename.includes('rules')) return 'rules';
  if (filename.includes('starplayers')) return 'starplayers';
  return 'home';
}

function updateActiveNavigation(currentPage) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Gestion des erreurs de chargement
function handleLoadError(error, dataType) {
  console.error(`Erreur lors du chargement des données ${dataType}:`, error);
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.innerHTML = `
    <p>❌ Erreur lors du chargement des données ${dataType}.</p>
    <p>Vérifiez que le fichier data/${dataType}.json existe et est accessible.</p>
  `;
  document.body.appendChild(errorMessage);
}

// === PAGE ÉQUIPES ===
function initTeamsPage() {
  fetch('data/teams.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      window.teams = data;
      renderTeams(data);
      setupTeamSearch();
    })
    .catch(error => handleLoadError(error, 'teams'));
}

function renderTeams(teams) {
  const teamList = document.getElementById('team-list');
  if (!teamList) return;
  
  teamList.innerHTML = '';
  teams.forEach(team => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <h3>${team.name}</h3>
      <p><strong>Catégorie:</strong> ${team.category || 'Non spécifiée'}</p>
      <p><strong>Relances:</strong> ${team.rerolls || 'Non spécifié'}</p>
      <p class="team-description">${team.description || 'Aucune description disponible'}</p>
    `;
    card.addEventListener('click', () => displayTeamDetails(team));
    teamList.appendChild(card);
  });
}

function displayTeamDetails(team) {
  const details = document.getElementById('team-details');
  if (!details) return;
  
  let playersHtml = '';
  if (team.players && team.players.length > 0) {
    playersHtml = `
      <h4>Joueurs</h4>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Coût</th>
            <th>M</th>
            <th>F</th>
            <th>AG</th>
            <th>CP</th>
            <th>AR</th>
            <th>Compétences</th>
          </tr>
        </thead>
        <tbody>
          ${team.players.map(player => `
            <tr>
              <td>${player.name}</td>
              <td>${player.cost || 'N/A'}</td>
              <td>${player.stats?.M || 'N/A'}</td>
              <td>${player.stats?.F || 'N/A'}</td>
              <td>${player.stats?.AG || 'N/A'}</td>
              <td>${player.stats?.CP || 'N/A'}</td>
              <td>${player.stats?.AR || 'N/A'}</td>
              <td>${player.skills ? player.skills.join(', ') : 'Aucune'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  
  details.innerHTML = `
    <h2>${team.name}</h2>
    <p><strong>Description:</strong> ${team.description || 'Aucune description disponible'}</p>
    <p><strong>Catégorie:</strong> ${team.category || 'Non spécifiée'}</p>
    <p><strong>Relances:</strong> ${team.rerolls || 'Non spécifié'}</p>
    <p><strong>Apothicaire:</strong> ${team.apothecary ? 'Oui' : 'Non'}</p>
    ${team.specialRules ? `<p><strong>Règles spéciales:</strong> ${team.specialRules}</p>` : ''}
    ${playersHtml}
  `;
}

function setupTeamSearch() {
  const searchBar = document.getElementById('team-search');
  if (!searchBar || !window.teams) return;
  
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredTeams = window.teams.filter(team =>
      team.name.toLowerCase().includes(query) ||
      (team.description && team.description.toLowerCase().includes(query)) ||
      (team.category && team.category.toLowerCase().includes(query))
    );
    renderTeams(filteredTeams);
  });
}

// === PAGE COMPÉTENCES ===
function initSkillsPage() {
  fetch('data/skills.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      window.skills = data;
      renderSkills(data);
      setupSkillSearch();
      setupSkillFilters();
    })
    .catch(error => handleLoadError(error, 'skills'));
}

function renderSkills(skills) {
  const skillList = document.getElementById('skill-list');
  if (!skillList) return;
  
  skillList.innerHTML = '';
  skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <h3>${skill.name}</h3>
      <p><strong>Catégorie:</strong> ${skill.category || 'Non spécifiée'}</p>
      <p class="skill-description">${skill.description ? skill.description.substring(0, 100) + '...' : 'Aucune description disponible'}</p>
    `;
    card.addEventListener('click', () => displaySkillDetails(skill));
    skillList.appendChild(card);
  });
}

function displaySkillDetails(skill) {
  const details = document.getElementById('skill-details');
  if (!details) return;
  
  details.innerHTML = `
    <h2>${skill.name}</h2>
    <p><strong>Catégorie:</strong> ${skill.category || 'Non spécifiée'}</p>
    <p><strong>Description:</strong> ${skill.description || 'Aucune description disponible'}</p>
    ${skill.effect ? `<p><strong>Effet:</strong> ${skill.effect}</p>` : ''}
    ${skill.requirements ? `<p><strong>Prérequis:</strong> ${skill.requirements}</p>` : ''}
  `;
}

function setupSkillSearch() {
  const searchBar = document.getElementById('skill-search');
  if (!searchBar || !window.skills) return;
  
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredSkills = window.skills.filter(skill =>
      skill.name.toLowerCase().includes(query) ||
      (skill.description && skill.description.toLowerCase().includes(query)) ||
      (skill.category && skill.category.toLowerCase().includes(query))
    );
    renderSkills(filteredSkills);
  });
}

function setupSkillFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length || !window.skills) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Mise à jour des boutons actifs
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filtrage des compétences
      const category = button.getAttribute('data-category');
      const filteredSkills = category === 'all' 
        ? window.skills 
        : window.skills.filter(skill => skill.category === category);
      
      renderSkills(filteredSkills);
    });
  });
}

// === PAGE RÈGLES ===
function initRulesPage() {
  fetch('data/rules.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      window.rules = data;
      renderRules(data);
      setupRuleSearch();
    })
    .catch(error => handleLoadError(error, 'rules'));
}

function renderRules(rules) {
  const ruleList = document.getElementById('rule-list');
  if (!ruleList) return;
  
  ruleList.innerHTML = '';
  rules.forEach(rule => {
    const card = document.createElement('div');
    card.className = 'rule-card';
    card.innerHTML = `
      <h3>${rule.title}</h3>
      <p class="rule-description">${rule.description ? rule.description.substring(0, 100) + '...' : 'Aucune description disponible'}</p>
    `;
    card.addEventListener('click', () => displayRuleDetails(rule));
    ruleList.appendChild(card);
  });
}

function displayRuleDetails(rule) {
  const details = document.getElementById('rule-details');
  if (!details) return;
  
  let tablesHtml = '';
  if (rule.tables && rule.tables.length > 0) {
    tablesHtml = rule.tables.map(table => {
      const tableRows = table.rows ? table.rows.map(row => `
        <tr>
          ${row.map(cell => `<td>${cell}</td>`).join('')}
        </tr>
      `).join('') : '';
      
      return `
        <h4>${table.title}</h4>
        <table>
          ${table.headers ? `
            <thead>
              <tr>
                ${table.headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
          ` : ''}
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
    }).join('');
  }
  
  details.innerHTML = `
    <h2>${rule.title}</h2>
    <p><strong>Description:</strong> ${rule.description || 'Aucune description disponible'}</p>
    ${rule.details ? `<p><strong>Détails:</strong> ${rule.details}</p>` : ''}
    ${tablesHtml}
  `;
}

function setupRuleSearch() {
  const searchBar = document.getElementById('rule-search');
  if (!searchBar || !window.rules) return;
  
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredRules = window.rules.filter(rule =>
      rule.title.toLowerCase().includes(query) ||
      (rule.description && rule.description.toLowerCase().includes(query))
    );
    renderRules(filteredRules);
  });
}

// === PAGE JOUEURS STARS ===
function initStarplayersPage() {
  fetch('data/starplayers.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      window.starplayers = data;
      renderStarplayers(data);
      setupStarplayerSearch();
    })
    .catch(error => handleLoadError(error, 'starplayers'));
}

function renderStarplayers(starplayers) {
  const starplayerList = document.getElementById('starplayer-list');
  if (!starplayerList) return;
  
  starplayerList.innerHTML = '';
  starplayers.forEach(player => {
    const card = document.createElement('div');
    card.className = 'starplayer-card';
    card.innerHTML = `
      ${player.icon ? `<img src="${player.icon}" alt="Icône de ${player.name}" class="starplayer-icon">` : ''}
      <h3>${player.name}</h3>
      <p><strong>Coût:</strong> ${player.cost || 'N/A'} PO</p>
      <p class="starplayer-description">${player.description ? player.description.substring(0, 80) + '...' : 'Aucune description disponible'}</p>
    `;
    card.addEventListener('click', () => displayStarplayerDetails(player));
    starplayerList.appendChild(card);
  });
}

function displayStarplayerDetails(player) {
  const details = document.getElementById('starplayer-details');
  if (!details) return;
  
  const statsHtml = player.stats ? `
    <p><strong>Stats:</strong> 
      M${player.stats.M || 'N/A'}, 
      F${player.stats.F || 'N/A'}, 
      AG${player.stats.AG || 'N/A'}, 
      CP${player.stats.CP || 'N/A'}, 
      AR${player.stats.AR || 'N/A'}
    </p>
  ` : '';
  
  details.innerHTML = `
    <h2>${player.name}</h2>
    ${player.image ? `<img src="${player.image}" alt="Image de ${player.name}" class="starplayer-image">` : ''}
    <p><strong>Coût:</strong> ${player.cost || 'N/A'} PO</p>
    ${statsHtml}
    <p><strong>Compétences:</strong> ${player.skills ? player.skills.join(', ') : 'Aucune'}</p>
    <p><strong>Équipes:</strong> ${player.teams ? player.teams.join(', ') : 'Aucune'}</p>
    <p><strong>Description:</strong> ${player.description || 'Aucune description disponible'}</p>
  `;
}

function setupStarplayerSearch() {
  const searchBar = document.getElementById('starplayer-search');
  if (!searchBar || !window.starplayers) return;
  
  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredStarplayers = window.starplayers.filter(player =>
      player.name.toLowerCase().includes(query) ||
      (player.description && player.description.toLowerCase().includes(query)) ||
      (player.teams && player.teams.some(team => team.toLowerCase().includes(query))) ||
      (player.skills && player.skills.some(skill => skill.toLowerCase().includes(query)))
    );
    renderStarplayers(filteredStarplayers);
  });
}