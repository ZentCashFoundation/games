const getCurrentYear = ()=>{
    return new Date().getFullYear();
}
document.getElementById('currentyear').textContent = getCurrentYear()

// =======================
// Configuración de API
// =======================
const API = "https://api.games.zent.cash:3000/api";
var token = localStorage.getItem("token") || null;
let gameSessionId = null;

async function getGameCosts() {
  try {
    const response = await fetch(`${API}/game/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    data.games.forEach(game => {
      const id = `${game.name}-cost`;
      const el = document.getElementById(id);

      if (el) {
        el.textContent = game.cost;
      } else {
        console.warn(`Elemento no encontrado: ${id}`);
      }
    });

  } catch (error) {
    console.error('Error fetching game costs:', error);
  }
}
getGameCosts()

  const audio = document.getElementById("background-music");
  audio.volume = 0.08;