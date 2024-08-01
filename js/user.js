document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('userForm').reset();
    document.getElementById('userModal').style.display = 'block';
    document.getElementById('userId').value = ''; // Clear the hidden field
    document.getElementById('modalTitle').innerText = 'Ajouter Utilisateur'; // Set modal title
});

document.querySelector('#userModal .close').addEventListener('click', function() {
    document.getElementById('userModal').style.display = 'none';
});

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        number: document.getElementById('number').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        role: document.getElementById('role').value
    };

    const userId = document.getElementById('userId').value;

    if (userId) {
        // Update existing user
        const url = `https://ndougual-ma-nodejs.onrender.com/api/register/${userId}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            alert('Utilisateur mis à jour !');
            document.getElementById('userModal').style.display = 'none';
            loadUsers();
        })
        .catch(error => console.error('Erreur lors de la mise à jour de l\'utilisateur:', error));
    } else {
        // Add new user
        const url = 'https://ndougual-ma-nodejs.onrender.com/api/register';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            alert('Utilisateur ajouté !');
            document.getElementById('userModal').style.display = 'none';
            loadUsers();
        })
        .catch(error => console.error('Erreur lors de l\'ajout de l\'utilisateur:', error));
    }
});

// function loadUsers() {
//     fetch('https://ndougual-ma-nodejs.onrender.com/api/register/getting')
//         .then(response => response.json())
//         .then(data => {
//             console.log('Données reçues:', data); // Pour déboguer la structure des données
//             const usersBody = document.querySelector('#userTable tbody');
//             usersBody.innerHTML = '';
            
//             if (Array.isArray(data)) {
//                 data.forEach(user => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${user.firstName}</td>
//                         <td>${user.lastName}</td>
//                         <td>${user.email}</td>
//                         <td>${user.number}</td>
//                         <td>${user.role}</td>
//                         <td>
//                             <button onclick="editUser('${user._id}')">Modifier</button>
//                             <button onclick="deleteUser('${user._id}')">Supprimer</button>
//                         </td>
//                     `;
//                     usersBody.appendChild(row);
//                 });
//             } else {
//                 console.error('La réponse n\'est pas un tableau:', data);
//                 // Gérez le cas où data n'est pas un tableau ici
//             }
//         })
//         .catch(error => console.error('Erreur lors du chargement des utilisateurs:', error));
// }


function loadUsers() {
    fetch('https://ndougual-ma-nodejs.onrender.com/api/register/getting')
        .then(response => response.json())
        .then(data => {
            console.log('Données reçues:', data); // Pour déboguer la structure des données
            
            const users = data.utilisateur || []; // Accédez au tableau sous la clé 'utilisateur'
            const usersBody = document.querySelector('#userTable tbody');
            usersBody.innerHTML = '';

            if (Array.isArray(users)) {
                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.number}</td>
                        <td>${user.role}</td>
                        <td>
                            <button onclick="editUser('${user._id}')">Modifier</button>
                            <button onclick="deleteUser('${user._id}')">Supprimer</button>
                        </td>
                    `;
                    usersBody.appendChild(row);
                });
            } else {
                console.error('La réponse sous "utilisateur" n\'est pas un tableau:', users);
                // Gérez le cas où users n'est pas un tableau ici
            }
        })
        .catch(error => console.error('Erreur lors du chargement des utilisateurs:', error));
}


window.onload = loadUsers;

function editUser(id) {
    fetch(`https://ndougual-ma-nodejs.onrender.com/api/register/update/${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('number').value = user.number;
            document.getElementById('password').value = user.password; // À ne pas faire en production pour des raisons de sécurité
            document.getElementById('confirmPassword').value = user.confirmPassword; // À ne pas faire en production pour des raisons de sécurité
            document.getElementById('role').value = user.role;
            document.getElementById('userId').value = user._id; // Set the hidden field

            document.getElementById('userModal').style.display = 'block';
            document.getElementById('modalTitle').innerText = 'Modifier Utilisateur'; // Set modal title
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'utilisateur:', error));
}

function deleteUser(id) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        fetch(`https://ndougual-ma-nodejs.onrender.com/api/register/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.deletedCount > 0) {
                alert('Utilisateur supprimé !');
                loadUsers();
            } else {
                alert('Erreur lors de la suppression de l\'utilisateur.');
            }
        })
        .catch(error => console.error('Erreur lors de la suppression de l\'utilisateur:', error));
    }
}
