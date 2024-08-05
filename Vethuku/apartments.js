// Get selected apartments' ids from the URL
const urlParams = new URLSearchParams(window.location.search);
const ids = urlParams.get('ids').split(',').map(Number);

// Get selected apartments from static data
const selectedApartments = apartments.filter(apartment => ids.includes(apartment.id));

// Add rows to the table for each selected apartment
const tableBody = document.getElementById('tableBody');
selectedApartments.forEach(apartment => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${apartment.name}</td>
        <td>${apartment.place}</td>
        <td>${apartment.bullRunnerDistance}</td>
        <td>${apartment.beds}</td>
        <td>${apartment.baths}</td>
        <td>${apartment.priceRange}</td>
    `;
    tableBody.appendChild(row);
});