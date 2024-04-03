//redirijo al usuario a la pagina de registro
document.getElementById('registroLink').addEventListener('click', function (event) {
    event.preventDefault();

    window.location.href = 'http://localhost:8080/api/session/registroForm';
});

