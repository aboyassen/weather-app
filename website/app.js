/* Global Variables */
let myUrl =  'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'e7fc23a1b895f9e8858f939a9ca74da4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();
document.getElementById('generate').addEventListener('click', actio);

 function actio(e){
     const zipcode = document.querySelector("#zip").value ;
     const myFeeling = document.querySelector('#feelings').value;
     console.log(newDate);
     getWeather(myUrl, zipcode, apiKey)
     .then(function (data){
         // Add data to post request
         postData('http://localhost:8000/addData', {temperature: data.main.temp, date: newDate,myFeeling: myFeeling })
         //Function which updates UI
         updateUI()
     })
}   
//Get started
const getWeather = async (myUrl,code, key)=> {
    const response = await fetch (myUrl + code + '&appid='+ key)
    console.log(response);
    try{
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('error', error);
    }
}
//POST method
const postData = async (url = '', data = {}) => {

    const postRequest = await fetch (url, {
        method: 'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData =await postRequest.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('Error', error);
    }
}
//Updating the UI
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/allData');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch(error){
        console.log('Error', error);
    }
}        


