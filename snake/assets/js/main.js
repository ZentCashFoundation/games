document.addEventListener("DOMContentLoaded", () => {
    
    const emailInput = document.getElementById('email');

    if (emailInput && emailInput.value.trim() === '') {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            emailInput.value = savedEmail;
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
        if (auth) {
            auth.style.display = "none";
        }
        usergetbalance.style.display = "initial";
        registerLoginBtn.style.display = "none";  
		closeSessionBtn.style.display = "initial";
        getBalance();
    }
    const rankingList = document.getElementById('ranking-body');
    if (rankingList) {
        rankinglist();
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