
let totalProducts = 0;

function ajouterAuPanier(produit) {
    const panier = document.getElementById('panier');
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.innerHTML = `
        ${produit}
        <button class="btn btn-sm btn-danger" onclick="supprimerDuPanier(this)">Supprimer</button>
    `;
    panier.appendChild(item);
    totalProducts++;
    document.getElementById('total-products').innerText = totalProducts;
    ouvrirPanier(); 
}

function supprimerDuPanier(button) {
    const item = button.parentElement;
    item.remove();
    totalProducts--;
    document.getElementById('total-products').innerText = totalProducts;
}

function ouvrirPanier() {
    $('#panierModal').modal('show');
}
