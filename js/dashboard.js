document.getElementById('addProductBtn').addEventListener('click', function() {
    document.getElementById('productForm').reset();
    document.getElementById('productModal').style.display = 'block';
    document.getElementById('productId').value = ''; // Clear the hidden field
    document.getElementById('modalTitle').innerText = 'Ajouter Produit'; // Set modal title
});

document.querySelector('#productModal .close').addEventListener('click', function() {
    document.getElementById('productModal').style.display = 'none';
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value,
        category: document.getElementById('category').value
    };

    const productId = document.getElementById('productId').value;

    if (productId) {
        // Update existing product
        const url = `https://ndougual-ma-nodejs.onrender.com/api/produits/${productId}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
            alert('Produit mis à jour !');
            document.getElementById('productModal').style.display = 'none';
            loadProducts();
        })
        .catch(error => console.error('Erreur lors de la mise à jour du produit:', error));
    } else {
        // Add new product
        const url = 'https://ndougual-ma-nodejs.onrender.com/api/produits';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
            alert('Produit ajouté !');
            document.getElementById('productModal').style.display = 'none';
            loadProducts();
        })
        .catch(error => console.error('Erreur lors de l\'ajout du produit:', error));
    }
});

function loadProducts() {
    fetch('https://ndougual-ma-nodejs.onrender.com/api/produits')
        .then(response => response.json())
        .then(data => {
            const productsBody = document.getElementById('productsBody');
            productsBody.innerHTML = '';
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td><img src="${product.image}" alt="${product.name}" style="width: 50px;"></td>
                    <td>${product.category}</td>
                    <td>
                        <button onclick="editProduct('${product._id}')">Modifier</button>
                        <button onclick="deleteProduct('${product._id}')">Supprimer</button>
                    </td>
                `;
                productsBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des produits:', error));
}

window.onload = loadProducts;

function editProduct(id) {
    fetch(`https://ndougual-ma-nodejs.onrender.com/api/produits/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('description').value = product.description;
            document.getElementById('image').value = product.image;
            document.getElementById('category').value = product.category;
            document.getElementById('productId').value = product._id; // Set the hidden field

            document.getElementById('productModal').style.display = 'block';
            document.getElementById('modalTitle').innerText = 'Modifier Produit'; // Set modal title
        })
        .catch(error => console.error('Erreur lors de la récupération du produit:', error));
}

function deleteProduct(id) {
    document.getElementById('deleteModal').style.display = 'block';

    document.getElementById('confirmDeleteBtn').onclick = function() {
        fetch(`http://localhost:8080/api/produits/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.deletedCount > 0) {
                alert('Produit supprimé !');
                document.getElementById('deleteModal').style.display = 'none';
                loadProducts();
            } else {
                alert('Erreur lors de la suppression du produit.');
            }
        })
        .catch(error => console.error('Erreur lors de la suppression du produit:', error));
    };

    document.getElementById('cancelDeleteBtn').onclick = function() {
        document.getElementById('deleteModal').style.display = 'none';
    };
}

