// =======================
// Configuración de API
// =======================
const API = "https://api.games.zent.cash:3000/api";
var token = localStorage.getItem("token") || null;
let gameSessionId = null;
var game = 'pacman'; 

// =======================
// Funcion de registro
// =======================
async function register() {
    const res = await fetch(API + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    alert("Registered");
}

// =======================
// Funcion de autenticación
// =======================
async function login() {
    const res = await fetch(API + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();
    if (data.error) {
      	alert(data.error);
       	return;
    }

    token = data.token;
    localStorage.setItem("token", token);
    location.href = "./";
}

// =======================
// Funcion de deposito
// =======================
async function deposit() {
        const res = await fetch(API + "/games/wallet/deposit", {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
		if (data.error) {
        	alert(data.error);
        	return;
   		}
        document.getElementById("address").innerText = data.address;
        document.getElementById("paymentid").innerText = data.paymentId;
        document.getElementById("integratedaddress").innerText = data.integratedAddress;
}

// =======================
// Funcion de retiro
// =======================
async function withdraw() {
    const res = await fetch(API + "/games/wallet/withdraw", {
        method: "POST",
        headers: { 
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            destination: addressWithdraw.value,
            amount: Number(amount.value)
        })
    });

    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }
}

// =======================
// Funcion de balance
// =======================
async function getBalance() {
    const checking = await fetch(API + "/games/wallet/check", {
        method: "GET",
        headers: { 
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json" 
        },
    });
    let data = await checking.json();

    const balances = await fetch(API + "/games/wallet/balance", {
        method: "GET",
        headers: { 
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json" 
        },
    });

    data = await balances.json();
    let balance = Number(data.balance);
    balance = balance.toFixed(2);
    document.getElementById("balance").innerText = balance;  
}

// ========================================
// Funcion de listado de costos de juegos
// ========================================
async function getGameCosts() {
  try {
    const response = await fetch(`${API}/games/game/list`, {
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

// ===============================
// Funcion de inicio de juego
// ===============================
async function play() {
    token = localStorage.getItem("token");

    if (!token) {
        alert("Login first");
        return;
    }

    const res = await fetch(API + "/games/game/play", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ game: game })
    });

    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    gameSessionId = data.sessionId;
    startGame();
    
}

// =======================
// Funcion de Puntuación
// =======================
async function sendScore(score) {

    if (!gameSessionId) return;

    await fetch(API + "/games/game/score", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sessionId: gameSessionId,
            score: score
        })
    });
}

// ===============================
// Funcion de obtencion de recompensa
// ===============================
async function fbountyjackpot() {
    try {
        const res = await fetch(API + "/games/game/bountyjackpot", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                game: game
            })
        });

        const data = await res.json();

       const balance = Number(data.bountyjackpot[0].bounty ?? 0).toFixed(2);

        document.getElementById("bountyjackpot").innerText = balance;

    } catch (error) {
        console.error("Error en fbountyjackpot:", error);
    }
}

// ===============================
// Funcion de listado de ranking
// ===============================
async function rankinglist() {
    const res = await fetch(API + "/games/game/rankinglist", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            game: game,
            rank: 10
        })
    });

    const data = await res.json();
    console.log(data);
    const tbody = document.getElementById("ranking-body");
    tbody.innerHTML = ""; 

    if (!data.rankinglist || data.rankinglist.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = "There is no data.";
        td.style.textAlign = "center";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    data.rankinglist.forEach((item, index) => {
        const tr = document.createElement("tr");

        // Rank
        const tdRank = document.createElement("td");
        tdRank.textContent = item.rank ?? (index + 1);
        tr.appendChild(tdRank);

        // Email
        const tdEmail = document.createElement("td");
        tdEmail.textContent = item.username;
        tr.appendChild(tdEmail);

        // Score
        const tdScore = document.createElement("td");
        tdScore.textContent = item.score;
        tr.appendChild(tdScore);

        tbody.appendChild(tr);
    });
}