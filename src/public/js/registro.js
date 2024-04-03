//redirijo al usuario a la pagina de login
document.getElementById('loginLink').addEventListener('click', function (event) {
    event.preventDefault();

    window.location.href = 'http://localhost:8080/api/session';
});