// nasa api
let nasaKey = '2eQZDUKEjjDEid7yyEcDVj6F6Oc0z5Z0Mdo7aU1J';
async function data(){
    try{
        const nasaApi = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`);
        const nasaData = await nasaApi.json();

        console.log(nasaData);
        // nasaData have two media_type：video/image
        if (nasaData.media_type === 'video') {
            let nasaDaliyImage = document.querySelector(".nasa__image")
            .innerHTML = `
                <iframe width="100%" height="600px" src=${nasaData.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            `;
        }else{
            let nasaDaliyImage = document.querySelector(".nasa__image")
            .innerHTML = `<img src=${nasaData.url} alt=${nasaData.title}>`;
        }
        let nasaTitle = document.querySelectorAll(".nasa__apiTitle");
        nasaTitle.forEach(element => {
            element.innerHTML = `${nasaData.title}`;
        })
    }catch(error){
        console.warn(`Nope: ${error}`);
    }
}
data();

// select date image
document.getElementById('nasa__selectDate').addEventListener('change', function(event){
    let selectDate = event.target.value;
    // console.log(selectDate);
    let selectUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&date=${selectDate}`;
    fetch(selectUrl)
    .then(response => response.json())
    .then(data => { 
        if(!data.error && data.url){
            console.log(data);
            _displaySelectDate(data)
        }else{
             _displaySelectDate()
        };
    })
    .catch( error => console.error(`Nope: ${error}`))
})
function _displaySelectDate(data){
    let nasaDaliyImage = document.querySelector(".nasa__image")
        .innerHTML = `<img src=${data.url} alt=${data.title}>`;

    let nasaTitle = document.querySelectorAll(".nasa__apiTitle");
        nasaTitle.forEach(element => {
            element.innerHTML = `${data.title}`;
        })
}

// update time
function _updateTime(){
    let currentTimezone = moment.tz.guess();
    // console.log(moment().format());
    let currentDate = moment().tz(currentTimezone).format("YYYY-MM-DD - HH:mm:ss [<small>]A[</small>]")
    // console.log(currentDate);
    let showRealTime = document.querySelectorAll(".nasa__timeZoon");
    showRealTime.forEach(thisTime => {
    thisTime.innerHTML = currentDate
 })
}

let interval = setInterval(_updateTime, 1000)

// set max date for canlendar
document.addEventListener('DOMContentLoaded', function(){
    let today = new Date().toISOString().slice(0,10);
    document.getElementById('nasa__selectDate').setAttribute('max', today);
})