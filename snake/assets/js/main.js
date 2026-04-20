document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('email').value.trim() === '') {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
        }
    }
    
    const auth = document.getElementById('auth');
    const closeSessionBtn = document.querySelector('.close-session-btn');
    
    if (!token) {
        
		closeSessionBtn.style.display = "none";
    } else {
        auth.style.display = "none";  
		closeSessionBtn.style.display = "initial";
    }
    rankinglist()
});

async function closeSession() {
    localStorage.removeItem('token');
    location.reload();
}