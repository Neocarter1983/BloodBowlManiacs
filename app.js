document.addEventListener('DOMContentLoaded', () => {
  fetch('data/starplayers.json')
    .then(response => response.json())
    .then(data => {
      window.starplayers = data;
      renderStarplayers(data);
      setupSearch();
    });

  function renderStarplayers(starplayers) {
    const starplayerList = document.getElementById('starplayer-list');
    starplayerList.innerHTML = '';
    starplayers.forEach(player => {
      const card = document.createElement('div');
      card.className = 'starplayer-card';
      card.innerHTML = `
        <img src="${player.icon}" alt="Icône de ${player.name}" class="starplayer-icon">
        <h3>${player.name}</h3>
        <p>Coût: ${player.cost} PO</p>
      `;
      card.addEventListener('click', () => displayStarplayerDetails(player));
      starplayerList.appendChild(card);
    });
  }

  function displayStarplayerDetails(player) {
    const details = document.getElementById('starplayer-details');
    details.innerHTML = `
      <h2>${player.name}</h2>
      <img src="${player.image}" alt="Image de ${player.name}" class="starplayer-image">
      <p><strong>Coût:</strong> ${player.cost} PO</p>
      <p><strong>Stats:</strong> M${player.stats.M}, F${player.stats.F}, AG${player.stats.AG}, CP${player.stats.CP}, AR${player.stats.AR}</p>
      <p><strong>Compétences:</strong> ${player.skills.join(', ')}</p>
      <p><strong>Équipes:</strong> ${player.teams.join(', ')}</p>
      <p><strong>Description:</strong> ${player.description}</p>
    `;
  }

  function setupSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', () => {
      const query = searchBar.value.toLowerCase();
      const filteredStarplayers = window.starplayers.filter(player =>
        player.name.toLowerCase().includes(query) ||
        player.description.toLowerCase().includes(query) ||
        player.teams.some(team => team.toLowerCase().includes(query)) ||
        player.skills.some(skill => skill.toLowerCase().includes(query))
      );
      renderStarplayers(filteredStarplayers);
    });
  }
});