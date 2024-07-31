// Fonction pour mettre à jour le contenu d'une carte
function updateCard(cardId, newContent) {
    const card = document.getElementById(cardId);
    if (card) {
        card.querySelector('p').textContent = newContent;
    }
}

// Fonction pour créer des graphiques avec Chart.js
function createCharts() {
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');

    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Dataset 1',
                data: [12, 19, 3, 5, 2, 3, 7],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Dataset 2',
                data: [10, 15, 8, 12, 6, 5, 10],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Appeler la fonction pour créer les graphiques lorsque la page est chargée
document.addEventListener('DOMContentLoaded', createCharts);
