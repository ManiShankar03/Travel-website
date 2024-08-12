document.addEventListener('DOMContentLoaded', function () {
    const departureSelect = document.getElementById('departure-select');
    const arrivalSelect = document.getElementById('arrival-select');
    const searchBtn = document.getElementById('search-btn');
    const loginContainer = document.getElementById('login-container');
    let countries = [];

    // Initially disable the arrival select
    arrivalSelect.disabled = true;
    arrivalSelect.innerHTML = '<option value="default">Select departure first</option>';

    // Fetch countries from the server for the departure select
    fetch('/api/countries')
        .then(response => response.json())
        .then(data => {
            countries = data;
            updateSelectOptions(departureSelect, countries, 'country_id', 'country_name');
        })
        .catch(error => console.error('Error:', error));

    // Update arrival options based on departure selection
    departureSelect.addEventListener('change', function () {
        const selectedCountryName = departureSelect.options[departureSelect.selectedIndex].text;
        if (selectedCountryName !== 'Enter your departure location') {
            fetch(`/api/destinations/${selectedCountryName}`)
                .then(response => response.json())
                .then(destinations => {
                    updateSelectOptions(arrivalSelect, destinations, 'Arrival_country_id', 'Arrival_country_name'); // Adjust field names based on your destination data structure
                    arrivalSelect.disabled = false;
                })
                .catch(error => console.error('Error:', error));
        } else {
            arrivalSelect.disabled = true;
            arrivalSelect.innerHTML = '<option value="default">Select departure first</option>';
        }
    });

    // Event listener for the search button
    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (departureSelect.value === 'default' || arrivalSelect.value === 'default') {
            alert('Please choose both departure and arrival points.');
            return;
        }

        // AJAX request to check login status
        fetch('/get-username')
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    console.log('User is logged in, proceed with search');
                     const departureText = departureSelect.options[departureSelect.selectedIndex].text;
                const arrivalText = arrivalSelect.options[arrivalSelect.selectedIndex].text;
                const fileName = `${departureText}-${arrivalText}.html`;

                // Redirect to the constructed file name
                window.location.href = fileName;
                } else {
                    loginContainer.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    function updateSelectOptions(selectElement, list, valueField, textField) {
        selectElement.innerHTML = '<option value="default">Enter your location</option>';
        list.forEach(item => {
            selectElement.innerHTML += `<option value="${item[valueField]}">${item[textField]}</option>`;
        });
    }
});
