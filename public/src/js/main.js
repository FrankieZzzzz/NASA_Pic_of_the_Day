async function data(){
    let nasaKey = '2eQZDUKEjjDEid7yyEcDVj6F6Oc0z5Z0Mdo7aU1J'
    try{
        const nasaApi = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaKey}`);
        const nasaData = await nasaApi.json();

        console.log(nasaData);
        let nasaDaliyImage = document.querySelector(".nasa__image")
        .innerHTML = `<img src=${nasaData.url} alt=${nasaData.title}>`;

        let nasaCopyRight = document.querySelectorAll(".nasa__copyRight");
        nasaCopyRight.forEach(element => {
            element.innerHTML = `${nasaData.copyright}`;
        });

        let nasaExplanation = document.querySelectorAll(".nasa__date");
        nasaExplanation.forEach(element => {
            element.innerHTML = `${nasaData.date}`;
        })
        
        let nasaTitle = document.querySelectorAll(".nasa__title");
        nasaTitle.forEach(element => {
            element.innerHTML = `${nasaData.title}`;
        })
    }catch(error){
        console.warn(`Nope: ${error}`);
    }
}
data()