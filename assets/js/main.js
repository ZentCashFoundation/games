document.addEventListener("DOMContentLoaded", async() => {
    
    const emailInput = document.getElementById('email');

    if (emailInput && emailInput.value.trim() === '') {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
    }
    
    const userdashboard = document.querySelector('.userdashboard');
    const dashboardcontent = document.querySelector('.dashboard-content');
    const dashboardmessagecontent = document.querySelector('.dashboard-menssage-content');
    const usergetbalance = document.querySelector('.usergetbalance');
    const registerloginbtn = document.querySelector('.register-login-btn');
    const closesessionbtn = document.querySelector('.close-session-btn');

    const authuser = document.querySelector('.auth-container');
    
    if (!token) {
        userdashboard.style.display = "none";
        if (dashboardcontent)  {
            dashboardcontent.style.display = "none";
        }
        usergetbalance.style.display = "none";
        registerloginbtn.style.display = "initial";
		closesessionbtn.style.display = "none";
    } else {
        if (authuser) {
            authuser.style.display = "none";
        }
        if (dashboardmessagecontent) {
            dashboardmessagecontent.style.display = "none";
        }
        usergetbalance.style.display = "initial";
        registerloginbtn.style.display = "none";  
		closesessionbtn.style.display = "initial";
        
        getBalance().then(() => {
            const balance = document.getElementById('balance');
            const userbalance = document.getElementById('getbalance');

            if (balance && userbalance) {
                userbalance.textContent = balance.textContent;
            }
        });
        const depositelement = document.querySelector('.deposit');
        if (depositelement) {
            deposit();
        }
        const gamesessionuser = document.getElementById('game_sessions-body');
        if (gamesessionuser) {
            gamesessionUser();
        }    
      }  
    });

/** Fetch game costs and display them in the UI */
const getgamecosts = document.querySelector('.games-content');
if (getgamecosts) {
    getGameCosts();
}

/** Session management */
  async function closeSession() {
    localStorage.removeItem('token');
    location.href = "./";
}
/** End of session management */

/** Set background music volume */
const audio = document.getElementById("background-music");
audio.volume = 0.08;
audio.play();

/** Copyright Automatic Year */
const getCurrentYear = ()=>{
    return new Date().getFullYear();
}
document.getElementById('currentyear').textContent = getCurrentYear()

/** Disable right-click context menu */
/*document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') ||
    (e.ctrlKey && e.key.toLowerCase() === 'u')
  ) {
    e.preventDefault();
  }
});*/