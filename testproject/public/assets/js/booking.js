document.addEventListener('DOMContentLoaded', function() {
    fetchCountries();

    const departureSelect = document.getElementById('departure');
    departureSelect.addEventListener('change', function() {
        fetchDestinations(this.value);
    });
});

function fetchCountries() {
    fetch('/api/countries')
        .then(response => response.json())
        .then(countries => {
            const departureSelect = document.getElementById('departure');
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.country_name; // Assuming 'country_name' is a field in your database
                option.textContent = country.country_name;
                departureSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

function fetchDestinations(departureCountry) {
    fetch(`/api/destinations/${departureCountry}`)
        .then(response => response.json())
        .then(destinations => {
            const arrivalSelect = document.getElementById('arrival');
            arrivalSelect.innerHTML = ''; // Clear existing options

            destinations.forEach(dest => {
                const option = document.createElement('option');
                option.value = dest.Arrival_country_name; // Assuming this is the correct field
                option.textContent = dest.Arrival_country_name;
                arrivalSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}
