document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('email').value.trim() === '') {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
        }
    }
    
    const auth = document.getElementById('auth');
    const usergetbalance = document.querySelector('.usergetbalance');
    const closeSessionBtn = document.querySelector('.close-session-btn');
    const registerLoginBtn = document.querySelector('.register-login-btn');
    
    if (!token) {
        usergetbalance.style.display = "none";
        registerLoginBtn.style.display = "initial";
		closeSessionBtn.style.display = "none";
    } else {
        auth.style.display = "none";
        usergetbalance.style.display = "initial";
        registerLoginBtn.style.display = "none";  
		closeSessionBtn.style.display = "initial";
        getBalance();
    }
    rankinglist()
});

async function closeSession() {
    localStorage.removeItem('token');
    location.reload();
}