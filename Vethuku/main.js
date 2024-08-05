// Static data for apartments
const apartments = [
    { id: 1, name: 'Apartment 1', place: 'Place 1', bullRunnerDistance: '1 mile', beds: 2, baths: 1, priceRange: '$1000 - $1500' },
    { id: 2, name: 'Apartment 2', place: 'Place 2', bullRunnerDistance: '2 miles', beds: 3, baths: 2, priceRange: '$1500 - $2000' },
    // Add more apartments here
];

// Function to handle search form submission
function handleSearch(event) {
    event.preventDefault();

    // Get selected apartments based on search criteria
    const selectedApartments = apartments.filter(apartment => {
        // Add your search criteria here
        // For example, to filter by place:
        // return apartment.place === event.target.elements.place.value;
    });

    // Navigate to apartments page with selected apartments' ids in the URL
    window.location.href = 'apartments.html?ids=' + selectedApartments.map(apartment => apartment.id).join(',');
}

// Attach event listener to search form
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', handleSearch);