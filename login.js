async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('https://ndougual-ma-nodejs.onrender.com/api/auth', {
            email,
            password
        });

        if (response.status === 201) {
            console.log('Login successful:', response.data);
            localStorage.setItem('authToken', response.data.token);
            showToast('Connexion réussie !', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            console.error('Unexpected status code:', response.status);
            showToast('Erreur inattendue : ' + response.status, 'danger');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            showToast('Erreur de connexion : ' + (error.response.data.errors ? error.response.data.errors.map(err => err.msg).join(', ') : 'Erreur inconnue'), 'danger');
        } else {
            console.error('Error:', error.message);
            showToast('Une erreur est survenue, veuillez réessayer.', 'danger');
        }
    }
}

function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000); // La durée pendant laquelle le toast sera affiché
}
