document.addEventListener("DOMContentLoaded", () => {
    
    const emailInput = document.getElementById('email');

    if (emailInput && emailInput.value.trim() === '') {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
    }
    
    const authuser = document.getElementById('auth');
    const deposituser = document.querySelector('.deposit');
    const usergetbalance = document.querySelector('.usergetbalance');
    const closeSessionBtn = document.querySelector('.close-session-btn');
    const registerLoginBtn = document.querySelector('.register-login-btn');
    
    if (!token) {
        if (deposituser) {
           deposituser.style.display = "none";
        }
        usergetbalance.style.display = "none";
        registerLoginBtn.style.display = "initial";
		closeSessionBtn.style.display = "none";
    } else {
        if (authuser) {
            authuser.style.display = "none";
        }
        usergetbalance.style.display = "initial";
        registerLoginBtn.style.display = "none";  
		closeSessionBtn.style.display = "initial";
        getBalance();
        deposit();
    }
    const rankingList = document.getElementById('ranking-body');
    if (rankingList) {
        rankinglist();
    } 
    const bountyjackpot = document.getElementById('bountyjackpot');
    if (bountyjackpot) {
        fbountyjackpot();
    }   
});

async function closeSession() {
    localStorage.removeItem('token');
    location.reload();
}

const getCurrentYear = ()=>{
    return new Date().getFullYear();
}
document.getElementById('currentyear').textContent = getCurrentYear()

// Función para actualizar el score en el HTML
function updateScoreDisplay(score) {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

// Función para actualizar el level en el HTML
function updateLevelDisplay(level) {
    const levelElement = document.getElementById('level');
    if (levelElement) {
        levelElement.textContent = level;
    }
}