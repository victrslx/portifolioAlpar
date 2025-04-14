const apiKey = '1d515fdef252f58c39d4b68773c2ee4b';
const lang = 'pt_br';
const units = 'metric';

const cityEl = document.querySelector('h1');
const cardEl = document.querySelector('.card');
const iconEl = document.querySelector('.card-icon');
const tempEl = document.querySelector('h2');
const feelsLikeEl = document.querySelector('.feels-like span');
const tempMinEl = document.querySelector('.min');
const tempMaxEl = document.querySelector('.max');
const humidityEl = document.querySelector('.humidity span');
const windIconEl = document.querySelector('.fa-arrow-up');
const windTextEl = document.querySelector('.wind span');
const inputEl = document.querySelector('.search');
const buttonEl = document.querySelector('.search-box button');


async function callApi() {
    try {
        const city = inputEl.value || 'São Paulo';

        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=${units}`);
        const data = await response.json();

        console.log(data);

        const icon = data.weather[0].icon;
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const tempMin = Math.round(data.main.temp_min);
        const tempMax = Math.round(data.main.temp_max);
        const humidity = data.main.humidity;
        const wind = data.wind.speed.toLocaleString('pt-BR');
        cityEl.innerHTML = city;
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
        iconEl.src = iconUrl;

        tempEl.innerHTML = `${temp}°`;
        feelsLikeEl.innerHTML = `${feelsLike}°`;
        tempMinEl.innerHTML = `${tempMin}°`;
        tempMaxEl.innerHTML = `${tempMax}°`;
        humidityEl.innerHTML = `${humidity}%`;
        windTextEl.innerHTML = `${wind} m/s`;
        windIconEl.style.transform = `rotate(${data.wind.deg}deg)`;

        cardEl.classList.add('active');
    }
    catch (error) {
        alert('Cidade não encontrada');
        console.error(error);
        cardEl.classList.remove('active');
    }
}


// function callApi() {
//     const city = inputEl.value || 'São Paulo';

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=${units}`)
//         .then((response) => response.json()).then((response) => {

//             console.log(response);

//             try {
//                 const icon = response.weather[0].icon;
//                 const temp = Math.round(response.main.temp);
//                 const feelsLike = response.main.feels_like;
//                 const tempMin = response.main.temp_min;
//                 const tempMax = response.main.temp_max;
//                 const humidity = response.main.humidity;
//                 const wind = response.wind.speed;
//                 const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
//                 iconEl.src = iconUrl;

//                 tempEl.innerHTML = `${temp}°`;
//                 feelsLikeEl.innerHTML = Math.round(response.main.feels_like);
//                 tempMinEl.innerHTML = Math.round(response.main.temp_min);
//                 tempMaxEl.innerHTML = Math.round(response.main.temp_max);
//                 humidityEl.innerHTML = response.main.humidity;
//                 windTextEl.innerHTML = response.wind.speed.toLocaleString('pt-BR');
//                 windIconEl.style.transform = `rotate(${response.wind.deg}deg)`;

//                 cardEl.classList.add('active');

//                 // tempEl.textContent = `${temp}°`;
//                 // feelsLikeEl.textContent = `${feelsLike}°`;
//                 // tempMinEl.textContent = `${tempMin}°`;
//                 // tempMaxEl.textContent = `${tempMax}°`;
//                 // humidityEl.textContent = `${humidity}%`;
//                 // windTextEl.textContent = `${wind} m/s`;
//             } catch (error) {
//                 alert('Cidade não encontrada');
//                 console.error(error);
//                 cardEl.classList.remove('active');
//             }
//         }).catch((error) => {
//             alert('Cidade não encontrada');
//             console.error(error);
//             cardEl.classList.remove('active');
//         });
// }

buttonEl.addEventListener('click', callApi);

callApi();