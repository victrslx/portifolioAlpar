const app = angular.module("weatherApp", []);
app.controller("weatherController", function ($scope, $http) {

    // const apiKey = '1d515fdef252f58c39d4b68773c2ee4b';
    const lang = 'pt_br';
    const units = 'metric';

    $scope.cityName = "";
    $scope.city = "";
    $scope.cardActive = false;
    $scope.temperature = "";
    $scope.feelsLike = "";
    $scope.mintemperature = "";
    $scope.maxtemperature = "";
    $scope.humidity = "";
    $scope.wind = "";
    $scope.windDirection = 0;
    $scope.iconUrl = "";



    $scope.callApi = async () => {
        const city = $scope.city || localStorage.getItem("city") || 'Chicago';

        const response = await $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=${units}`);

        const { data } = response;
        console.log(data);

        const icon = data.weather[0].icon;
        $scope.iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;
        $scope.temperature = Math.round(data.main.temp);
        $scope.feelsLike = Math.round(data.main.feels_like);
        $scope.mintemperature = Math.round(data.main.temp_min);
        $scope.maxtemperature = Math.round(data.main.temp_max);
        $scope.humidity = data.main.humidity;
        $scope.wind = data.wind.speed.toLocaleString('pt-BR');
        $scope.windDirection = data.wind.deg;
        $scope.cardActive = true;
        $scope.cityName = data.name;
        localStorage.setItem('city', data.name);
        $scope.$apply();
    };

    $scope.callApi();
});