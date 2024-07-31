const apiUrl = 'http://localhost:8080/api/produits';

document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeModalButtons = document.querySelectorAll('.close');
    const productForm = document.getElementById('productForm');
    const productsBody = document.getElementById('productsBody');

    let currentProductId = null; // Stocke l'ID 

    addProductBtn.addEventListener('click', () => {
        productModal.style.display = 'block';
        productForm.reset();
        currentProductId = null; 
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            productModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    fetchProducts();

    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(productForm);
        const product = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: formData.get('price'),
            image: formData.get('image'),
            category: formData.get('category')
        };

        try {
            if (currentProductId) {
                // Modification du produit
                const response = await fetch(`${apiUrl}/${currentProductId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                if (response.ok) {
                    console.log('Produit modifié avec succès');
                } else {
                    throw new Error('Erreur lors de la modification du produit');
                }
            } else {
                // Ajout d'un nouveau produit
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                if (response.ok) {
                    console.log('Produit ajouté avec succès');
                } else {
                    throw new Error('Erreur lors de l\'ajout du produit');
                }
            }

            fetchProducts();
            productModal.style.display = 'none';
            productForm.reset();
            currentProductId = null; 
        } catch (error) {
            console.error(error.message);
        }
    });

    productsBody.addEventListener('click', async (event) => {
        const target = event.target;
        const id = target.getAttribute('data-id');

        if (target.classList.contains('deleteBtn')) {
            if (id) {
                try {
                    const response = await fetch(`${apiUrl}/${id}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        console.log('Produit supprimé avec succès');
                        fetchProducts();
                    } else {
                        throw new Error('Erreur lors de la suppression du produit');
                    }
                } catch (error) {
                    console.error(error.message);
                }
            } else {
                console.error('ID du produit manquant pour la suppression');
            }
        }

        if (target.classList.contains('editBtn')) {
            if (id) {
                try {
                    const response = await fetch(`${apiUrl}/${id}`);
                    const product = await response.json();

                    document.getElementById('name').value = product.name;
                    document.getElementById('description').value = product.description;
                    document.getElementById('price').value = product.price;
                    document.getElementById('image').value = product.image;
                    document.getElementById('category').value = product.category;

                    productModal.style.display = 'block';
                    currentProductId = id; 
                } catch (error) {
                    console.error('Erreur lors de la récupération du produit pour modification');
                }
            } else {
                console.error('ID du produit manquant pour la modification');
            }
        }
    });
});

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        const productsBody = document.getElementById('productsBody');
        productsBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price} €</td>
                <td>${product.image ? `<img src="${product.image}" alt="${product.name}" width="50">` : 'Aucune image'}</td>
                <td>${product.category}</td>
                <td>
                    <button class="deleteBtn" data-id="${product.id}">Supprimer</button>
                    <button class="editBtn" data-id="${product.id}">Modifier</button>
                </td>
            `;
            productsBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits');
    }
}
