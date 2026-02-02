function getWeather() {
    const location = document.getElementById("location").value;

    if (location === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "21cb0d2636e04844a9d150109261401";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("city").innerHTML =
                `City: ${data.location.name}, ${data.location.country}`;

            document.getElementById("temp").innerHTML =
                `Temperature: ${data.current.temp_c} °C`;

            document.getElementById("condition").innerHTML =
                `Condition: ${data.current.condition.text}`;
        })
        .catch(error => {
            alert("City not found!");
        });
}
