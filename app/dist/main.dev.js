"use strict";

window.onload = function () {
  toggleMenu();
  toggleCross();
  fetch('https://mars-weather-rems.netlify.app/rems.json').then(function (res) {
    return res.json();
  }).then(function (res) {
    var pintado = function pintado() {
      //DIA MARCIANO
      console.log(res.weather_report.sol);
      var sol = "Sol" + " " + res.weather_report.sol;
      document.querySelector('#sol').innerHTML = sol; //TEMP DEL AIRE

      console.log(res.weather_report.magnitudes[0].max_temp);
      var aireMax = res.weather_report.magnitudes[0].max_temp + "\xBAC";
      document.querySelector('.aireMax').innerHTML = aireMax;
      var aireMin = res.weather_report.magnitudes[0].min_temp + "\xBAC";
      document.querySelector('.aireMin').innerHTML = aireMin; //TEMP DEL SUELO

      var sueloMax = res.weather_report.magnitudes[0].max_gts_temp + "\xBAC";
      document.querySelector('.sueloMax').innerHTML = sueloMax;
      var sueloMin = res.weather_report.magnitudes[0].min_gts_temp + "\xBAC";
      document.querySelector('.sueloMin').innerHTML = sueloMin; //SUNRISE Y SUNSET

      var sunrise = res.weather_report.magnitudes[0].sunrise;
      document.querySelector('.sunriseTime').innerHTML = sunrise;
      var sunset = res.weather_report.magnitudes[0].sunset;
      document.querySelector('.sunsetTime').innerHTML = sunset; //PRESIÓN

      var pressure = res.weather_report.magnitudes[0].pressure;
      document.querySelector('.presion').innerHTML = pressure;
    };

    pintado(); //PINTADO DE FONDOS E ICONOS

    var imageTemp = function imageTemp() {
      var app = document.querySelector('.app');
      console.log(res.weather_report.magnitudes[0].atmo_opacity);

      if (res.weather_report.magnitudes[0].atmo_opacity == "Sunny") {
        var icono = "<img src=\"./assets/img/icons8-sol-100.png\" alt=\"icon\">";
        document.querySelector('.temp').innerHTML = icono;
        app.classList.add('sunny');
      } else if (res.weather_report.magnitudes[0].atmo_opacity == "Windy") {
        var _icono = "<img src=\"./assets/img/icons8-polvo-100.png\" alt=\"icon\">";
        document.querySelector('.temp').innerHTML = _icono;
        app.classList.add('windy');
      } else {
        var _icono2 = "<img src=\"./assets/img/icons8-nubes-100.png\" alt=\"icon\">";
        document.querySelector('.temp').innerHTML = _icono2;
        app.classList.add('cloudy');
      }
    };

    imageTemp(); //GUARDADO DE DATOS

    var boton = document.querySelector(".starIcon");
    var datosGuardados = new Array();
    console.log(datosGuardados);
    boton.addEventListener('click', function () {
      var savedDate = res.weather_report.sol[0];
      var savedIcon = res.weather_report.magnitudes[0].atmo_opacity[0];
      var savedAirMax = res.weather_report.magnitudes[0].max_temp[0];
      var savedAirMin = res.weather_report.magnitudes[0].min_temp[0];
      var savedSueloMax = res.weather_report.magnitudes[0].max_gts_temp[0];
      var savedSueloMin = res.weather_report.magnitudes[0].min_gts_temp[0];
      var savedSunrise = res.weather_report.magnitudes[0].sunrise[0];
      var savedSunset = res.weather_report.magnitudes[0].sunset[0];
      var savedPresion = res.weather_report.magnitudes[0].pressure[0];
      datosGuardados.push(savedDate, savedIcon, savedAirMax, savedAirMin, savedSueloMax, savedSueloMin, savedSunrise, savedSunset, savedPresion);
      console.log(datosGuardados);
      localStorage.setItem("datosGuardados", JSON.stringify(datosGuardados));
      pintarDatos();
    }); //PINTAR LOS DATOS

    var pintarDatos = function pintarDatos() {
      datosGuardados = JSON.parse(localStorage.getItem('datosGuardados'));
      var allSaved = document.querySelector(".allSaved");
      var savedDato = "<li class=\"saved\">\n\n                <div class=\"dateSaved\">\n                    <span class=\"fa fa-times crossIcon\"></span>\n                    <h1 class=\"savedSol\">Sol ".concat(datosGuardados[0], "</h1>\n                </div>\n\n                <div class=\"savedData\">\n\n                    <div class=\"savedTemp\">\n                        <img src=\"./assets/img/icons8-sol-100.png\" alt=\"sun icon\">\n                    </div>\n\n                    <div class=\"savedTemperatura\">\n                        <div class=\"savedAire\">\n                            <img src=\"./assets/img/icons8-polvo-100.png\" alt=\"temperatura del aire\">\n                            <h1 class=\"savedAireMax\">").concat(datosGuardados[2], "\xBAC</h1>\n                            <h1 class=\"savedAireMin\">").concat(datosGuardados[3], "\xBAC</h1>\n                        </div>\n                        <hr class=\"line\">\n                        <div class=\"savedSuelo\">\n                            <img src=\"./assets/img/icons8-elemento-tierra-100.png\" alt=\"sueloIcon\">\n                            <h1 class=\"savedSueloMax\">").concat(datosGuardados[4], "\xBAC</h1>\n                            <h1 class=\"savedSueloMin\">").concat(datosGuardados[5], "\xBAC</h1>\n                        </div>\n                    </div>\n\n                    <div class=\"savedOtherData\">\n                        <div class=\"savedSunrise\">\n                            <img src=\"./assets/img/icons8-salida-del-sol-100.png\" alt=\"sunriseIcon\">\n                            <h3 class=\"sunriseTime\">").concat(datosGuardados[6], "</h3>\n                        </div>\n                        <div class=\"savedSunset\">\n                            <img src=\"./assets/img/icons8-puesta-de-sol-100.png\" alt=\"sunsetIcon\">\n                            <h3 class=\"sunsetTime\">").concat(datosGuardados[7], "</h3>\n                        </div>\n                        <div class=\"savedPressure\">\n                            <img src=\"./assets/img/icons8-presi\xF3n-atmosf\xE9rica-100.png\" alt=\"presionIcon\">\n                            <h3 class=\"presion\">").concat(datosGuardados[8], "</h3>\n                        </div>\n                    </div>\n\n                </div>\n            </li>");
      allSaved.innerHTML += savedDato; //Borrado de datos (no funciona bien)

      var borrar = document.querySelector(".crossIcon");
      borrar.addEventListener('click', function () {
        console.log("borrar");
        var datoGuardado = document.querySelector('.saved');
        localStorage.removeItem("savedDato");
        datoGuardado.classList.add('hidden');
      });
    };
  });
}; //Abrir el menú


var toggleMenu = function toggleMenu() {
  var open = document.querySelector('.open');
  var menu = document.querySelector('.content');
  open.addEventListener('click', function () {
    menu.classList.toggle('opened');
    open.classList.toggle('activeButton');
  });
}; //Cerrar el menú


var toggleCross = function toggleCross() {
  var cross = document.querySelector('.cross');
  var menu = document.querySelector('.content');
  cross.addEventListener('click', function () {
    menu.classList.toggle('opened');
    cross.classList.toggle('activeButton');
  });
};