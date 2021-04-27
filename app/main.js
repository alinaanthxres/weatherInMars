window.onload = function () {

    toggleMenu();
    toggleCross();


    fetch('https://mars-weather-rems.netlify.app/rems.json')
        .then(res => res.json())
        .then(res => {

            let pintado = () => {

                //DIA MARCIANO
                console.log(res.weather_report.sol);
                let sol = `Sol` + ` ` + res.weather_report.sol;
                document.querySelector('#sol').innerHTML = sol;

                //TEMP DEL AIRE
                console.log(res.weather_report.magnitudes[0].max_temp);
                let aireMax = res.weather_report.magnitudes[0].max_temp + `ºC`;
                document.querySelector('.aireMax').innerHTML = aireMax;

                let aireMin = res.weather_report.magnitudes[0].min_temp + `ºC`;
                document.querySelector('.aireMin').innerHTML = aireMin;

                //TEMP DEL SUELO
                let sueloMax = res.weather_report.magnitudes[0].max_gts_temp + `ºC`;
                document.querySelector('.sueloMax').innerHTML = sueloMax;

                let sueloMin = res.weather_report.magnitudes[0].min_gts_temp + `ºC`;
                document.querySelector('.sueloMin').innerHTML = sueloMin;

                //SUNRISE Y SUNSET

                let sunrise = res.weather_report.magnitudes[0].sunrise;
                document.querySelector('.sunriseTime').innerHTML = sunrise;


                let sunset = res.weather_report.magnitudes[0].sunset;
                document.querySelector('.sunsetTime').innerHTML = sunset;

                //PRESIÓN
                let pressure = res.weather_report.magnitudes[0].pressure;
                document.querySelector('.presion').innerHTML = pressure;
            }
            pintado();

            //PINTADO DE FONDOS E ICONOS
            let imageTemp = () => {
                let app = document.querySelector('.app');

                console.log(res.weather_report.magnitudes[0].atmo_opacity);
                if (res.weather_report.magnitudes[0].atmo_opacity == "Sunny") {
                    let icono = `<img src="./assets/img/icons8-sol-100.png" alt="icon">`;
                    document.querySelector('.temp').innerHTML = icono;

                    app.classList.add('sunny');

                } else if (res.weather_report.magnitudes[0].atmo_opacity == "Windy") {
                    let icono = `<img src="./assets/img/icons8-polvo-100.png" alt="icon">`;
                    document.querySelector('.temp').innerHTML = icono;

                    app.classList.add('windy');

                } else {
                    let icono = `<img src="./assets/img/icons8-nubes-100.png" alt="icon">`;
                    document.querySelector('.temp').innerHTML = icono;

                    app.classList.add('cloudy');
                }
            }
            imageTemp();


            //GUARDADO DE DATOS
            let boton = document.querySelector(`.starIcon`);

            let datosGuardados = new Array;
            console.log(datosGuardados);

            boton.addEventListener('click', () => {

                let savedDate = res.weather_report.sol[0];
                let savedIcon = res.weather_report.magnitudes[0].atmo_opacity[0];
                let savedAirMax = res.weather_report.magnitudes[0].max_temp[0];
                let savedAirMin = res.weather_report.magnitudes[0].min_temp[0];
                let savedSueloMax = res.weather_report.magnitudes[0].max_gts_temp[0];
                let savedSueloMin = res.weather_report.magnitudes[0].min_gts_temp[0];
                let savedSunrise = res.weather_report.magnitudes[0].sunrise[0];
                let savedSunset = res.weather_report.magnitudes[0].sunset[0];
                let savedPresion = res.weather_report.magnitudes[0].pressure[0];

                datosGuardados.push(
                    savedDate,
                    savedIcon,
                    savedAirMax,
                    savedAirMin,
                    savedSueloMax,
                    savedSueloMin,
                    savedSunrise,
                    savedSunset,
                    savedPresion
                );

                console.log(datosGuardados);

                localStorage.setItem("datosGuardados", JSON.stringify(datosGuardados));
                pintarDatos();
            });


            //PINTAR LOS DATOS
            let pintarDatos = () => {

                datosGuardados = JSON.parse(localStorage.getItem('datosGuardados'));

                let allSaved = document.querySelector(".allSaved");
                let savedDato = `<li class="saved">

                <div class="dateSaved">
                    <span class="fa fa-times crossIcon"></span>
                    <h1 class="savedSol">Sol ${datosGuardados[0]}</h1>
                </div>

                <div class="savedData">

                    <div class="savedTemp">
                        <img src="./assets/img/icons8-sol-100.png" alt="sun icon">
                    </div>

                    <div class="savedTemperatura">
                        <div class="savedAire">
                            <img src="./assets/img/icons8-polvo-100.png" alt="temperatura del aire">
                            <h1 class="savedAireMax">${datosGuardados[2]}ºC</h1>
                            <h1 class="savedAireMin">${datosGuardados[3]}ºC</h1>
                        </div>
                        <hr class="line">
                        <div class="savedSuelo">
                            <img src="./assets/img/icons8-elemento-tierra-100.png" alt="sueloIcon">
                            <h1 class="savedSueloMax">${datosGuardados[4]}ºC</h1>
                            <h1 class="savedSueloMin">${datosGuardados[5]}ºC</h1>
                        </div>
                    </div>

                    <div class="savedOtherData">
                        <div class="savedSunrise">
                            <img src="./assets/img/icons8-salida-del-sol-100.png" alt="sunriseIcon">
                            <h3 class="sunriseTime">${datosGuardados[6]}</h3>
                        </div>
                        <div class="savedSunset">
                            <img src="./assets/img/icons8-puesta-de-sol-100.png" alt="sunsetIcon">
                            <h3 class="sunsetTime">${datosGuardados[7]}</h3>
                        </div>
                        <div class="savedPressure">
                            <img src="./assets/img/icons8-presión-atmosférica-100.png" alt="presionIcon">
                            <h3 class="presion">${datosGuardados[8]}</h3>
                        </div>
                    </div>

                </div>
            </li>`;

                allSaved.innerHTML += savedDato;

                //Borrado de datos (no funciona bien)
                let borrar = document.querySelector(`.crossIcon`);

                borrar.addEventListener('click', () => {
                    console.log(`borrar`);

                    let datoGuardado = document.querySelector('.saved');
                    localStorage.removeItem("savedDato");
                    datoGuardado.classList.add('hidden');
                });

            }

        });
};


//Abrir el menú
let toggleMenu = () => {
    let open = document.querySelector('.open');
    let menu = document.querySelector('.content');

    open.addEventListener('click', () => {
        menu.classList.toggle('opened');
        open.classList.toggle('activeButton');
    });

};

//Cerrar el menú
let toggleCross = () => {

    let cross = document.querySelector('.cross');
    let menu = document.querySelector('.content');

    cross.addEventListener('click', () => {
        menu.classList.toggle('opened');
        cross.classList.toggle('activeButton');
    });
};