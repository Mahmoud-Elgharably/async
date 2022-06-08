/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = "60bd4f2a2857e2ab21bccedae04b6c57&units=imperial"; //Fahrenheit
//const apiKey = "60bd4f2a2857e2ab21bccedae04b6c57&units=metric"; //Celsius
//const apiKey = "60bd4f2a2857e2ab21bccedae04b6c57"; //Kelvins

// const apiKey = "60bd4f2a2857e2ab21bccedae04b6c57&units=metric";
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Create a new date instance dynamically with JS
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const feeling = document.getElementById("feeling").value;

  getTemperature(baseURL, apiKey)
    .then(function (data) {
      const temperature = data.main.temp;
      postData("/add", {
        dayDate: newDate,
        temperature: temperature,
        feeling: feeling,
      });
    })
    .then(function () {
      updateUI();
      const recentEntry = document.getElementById('recentEntry');
      recentEntry.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });

  // getTemperature(baseURL, apiKey)
  //   .then(function (data) {
  //     const temperature = data.main.temp;
  //     postData("/add", {
  //       dayDate: newDate,
  //       temperature: temperature,
  //       feeling: feeling,
  //     });
  //   })
  //   .then(() => updateUI());

  // getTemperature(baseURL, apiKey)
  //   .then((data) =>
  //     postData("/add", {
  //       dayDate: newDate,
  //       temperature: data.main.temp,
  //       feeling: feeling,
  //     })
  //   )
  //   .then(() => updateUI());

  //getData(baseURL,newAnimal, apiKey)
  //.then(function(data) {
  //    //console.log(data);
  //    postData('/add', {dayDate:newDate, temperature: 21, feeling: feeling});
  //})
  ////.then(updateUI())
}

// Async GET to retrive Temerature
const getTemperature = async (baseURL, apiKey) => {
  const zip = document.getElementById("zip").value;
  const res = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

// Async GET
const getData = async (baseURL, animal, key) => {
  //const res = await fetch(baseURL+animal+key)
  const res = await fetch("/all");
  try {
    const data = await res.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
    // appropriately handle the error
  }
};

// Async POST
const postData = async (url = "", data = {}) => {
  //console.log(data);
  const response = await fetch(url, {
    method: "POST", // GET, POST, PUT, DELETE, etc
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    //console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

// Async Update User Interface
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    // Write updated data to DOM elements    
    document.getElementById("temp").innerHTML = Math.round(allData.temperature) + ' degrees';
    document.getElementById("content").innerHTML = allData.feeling;
    document.getElementById("date").innerHTML = allData.dayDate;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

// Set default value for zip code
document.getElementById("zip").value = "36925";

//const aa = {'aa': 11, 'bb': 22};
//const bb = JSON.stringify(aa);
//const cc = JSON.parse(bb);
//console.log(aa);
//console.log(bb);
//console.log(cc);

async function getDataFromServer(data = {}) {
  const response = await fetch("/all");
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function setDataToServer(data = {}) {
  const response = await fetch("/add", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function updateUI2() {
  const response = await fetch("/all");
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
