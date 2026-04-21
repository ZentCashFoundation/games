if (!token) {
  document.querySelector('.userdashboard').style.display = 'none';
  document.querySelector('.usergetbalance').style.display = 'none';
  document.querySelector('.close-session-btn').style.display = 'none';
}


/** Fetch game costs and display them in the UI */
getGameCosts()  

/** Session management */
  async function closeSession() {
    localStorage.removeItem('token');
    location.reload();
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