// Personal API Key for OpenWeatherMap API
const apiKey = 'abd8efadf2eae6cd7687f8e3adbeb4f0';
const apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=`;
const apiUrl2 = `&lon=`;
const apiUrl3 = `&appid=${apiKey}`;

// Event listener to add function to existing HTML DOM element
document.body.querySelector('#generate').addEventListener('click', async () => {
    const feelings = document.body.querySelector("#feelings").value;
    const zip = document.querySelector("#zip").value;
    //const x = await latlon(zip);
    //const location = {"lat": round(x.lat, 2), "lon": round(x.lon, 2)}
    var date = new Date();

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    date = new Date();

    const data = { "zip": zip, "feelings": feelings, "date": date };

    latlon(zip)
        .then((l) => { 
            getWeather(apiUrl1 + l.location.lat + apiUrl2 + l.location.lon + apiUrl3, l.location, apiKey)
            .then((d) => {
                postWeather("/add", { "date": date, "temp": d.main.temp, "feelings": feelings })}).then(() => updateUi())})
});


/* Function to GET Web API Data*/
const latlon = async (zip = "") => {
    const apiKey = 'vnS4hE3OR3QsioaMYtQb8D320MhOSFnl'
    const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${parseInt(zip)}&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error: " + error);
    }
    const object = { 'lat': locationData.location.lat, 'lon': locationData.location.lon };
};

const getWeather = async (apiUrl = "", data = {}) => {
    const lat = data.lat;
    const lon = data.lon;
    const response = await fetch(apiUrl);

    try {
        const newData = response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

/* Function to POST data */
const postWeather = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}

/* Function to GET Project Data */
const updateUi = async () => {
    const response = await fetch('/all');
    try {
        const newData = await response.json();
        console.log(newData);
        document.querySelector('#date').innerHTML = newData[newData.length - 1].date;
        document.querySelector('#temp').innerHTML = newData[newData.length - 1].temp;
        document.querySelector('#content').innerHTML = newData[newData.length - 1].feelings;
    } catch (error) {
        console.log(error);
    }
}
