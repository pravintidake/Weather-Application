//Script fot weather page

const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal == "") {
        city_name.innerText = `Please Write The Name Before Search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6fcdb4967dad937189b09c6ec5e3fbff`;

            const response = await fetch(url);
            const data = await response.json();

            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;
            //condition for check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas fa-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }

            datahide.classList.remove('data_hide');

        } catch {
            city_name.innerText = `Please Enter the City Name Properly`;
            datahide.classList.add('data_hide');
        }

    }
}

submitBtn.addEventListener('click', getInfo);


const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let days = weekday[currentTime.getDay()];

    const day = document.getElementById('day');
    day.innerText = days;
    return day;
};


const getCurrentTime = () => {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();

    let periods = "AM";

    if (hours > 11) {
        periods = "PM";
        if (hours > 12) hours -= 12;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }

    let datenow = `${date} ${month}`;
    const todays_date = document.getElementById('todays_date');
    todays_date.innerText = datenow;
    console.log(todays_date);
    return todays_date;
};

getCurrentDay();
getCurrentTime();