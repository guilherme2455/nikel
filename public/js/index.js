document.addEventListener('DOMContentLoaded', function() {
    const myModal = new bootstrap.Modal(document.getElementById('register'));
    let logged = sessionStorage.getItem("logged");
    const session = localStorage.getItem("session");

    checkedlogged();

    // logar no sistema
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        const checksession = document.getElementById('session-check').checked;

        const account = getAccount(email)

        if(!account) {
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }

        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checksession);

        window.location.href = "home.html";
    });

    // criar conta
    document.getElementById('create-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email-create-input').value;
        const password = document.getElementById('password-create-input').value;
        const confirmPassword = document.getElementById("confirm-password-create-input").value;
    
        if (password !== confirmPassword) {
            alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
            return;
        }

        if(email.length < 5) {
            alert("Preencha o campo com um email válido.");
            return;
        }

        if(password.length < 4) {
            alert("Preencha a senha com no mínimo 4 dígitos");
            return;
        }

        saveAccount({
            login: email,
            password: password,
            transactions: []
        });

        myModal.hide();

        alert("Conta criada com sucesso");
    });

    function checkedlogged() {
        if(logged) {
            saveSession(logged, true);
            window.location.href = "home.html";
        
        }
    }

    function saveAccount(data) {
        localStorage.setItem(data.login, JSON.stringify(data));
    }

    function saveSession(email, saveSession) {
        if (saveSession) {
            const currentDate = new Date().toISOString();
            localStorage.setItem("session", currentDate);
        }

        sessionStorage.setItem("logged", email);
    }

    function getAccount(key) {
        const account = localStorage.getItem(key);

        if(account) {
            return JSON.parse(account);
        }
        return null;
    }
});
