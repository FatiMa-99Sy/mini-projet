document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas!');
        return;
    }

    try {
        // Envoi des données au serveur
        const response = await axios.post('https://ndougual-ma-nodejs.onrender.com/api/register', {
            firstName,
            lastName,
            email,
            number,
            password,
        });

        // Gestion de la réponse de succès
        if (response.status === 201) {
            alert(response.data.msg);
            window.location.href = 'connexion.html'; 
        } else {
            // Affichage du message d'erreur si la réponse n'est pas comme prévu
            alert('Une erreur est survenue : ' + response.statusText);
        }
    } catch (error) {
        // Gestion des erreurs du serveur
        if (error.response) {
            if (error.response.data && error.response.data.errors) {
                alert(error.response.data.errors.map(err => err.msg).join('\n'));
            } else {
                alert('Erreur serveur : ' + error.response.status + ' - ' + error.response.statusText);
            }
        } else {
            // Gestion des erreurs réseau ou autres
            alert('Erreur réseau ou problème de connexion.');
        }
    }
});
