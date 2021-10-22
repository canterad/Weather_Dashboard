// Created btnData object.  Used to store and get data from local storage.  I am using the nIndex value to determine the order of
// the buttons.  I am using the bDisplayed value to determine which button's weather forecast is displayed.  I am saving the
// city and state code values.
let btnData =
{
    nIndex: 0,
    bDisplayed: false,
    szCity: "",
    szStateCode: ""
};

// Create a variable to store the current city value.  So if the user searches for the same city a second time,
// or selects the same button again then we do not need to get and update the weather forecast.
let szCurrentCity = "";
let szCurrentStateCode = "";

// Declared the following variables for all of the elements that will be created.
let elmRightPanel = null;
let elmMain = null;
let elmLocDate = null;
let elmLocDateDiv = null;
let elmLocIcon = null;
let elmLocTemp = null;
let elmLocWind = null;
let elmLocHumidity = null;
let elmLocBlock = null;
let elmLocUvi = null;
let elmLocSpan = null;
let elmForecastTitle = null;
let elmForecastBlock = null;

let elmDay1Div = null;
let elmDay1Date = null;
let elmDay1IconDiv = null;
let elmDay1Icon = null;
let elmDay1Temp = null;
let elmDay1Wind = null;
let elmDay1Humidity = null;

let elmDay2Div = null;
let elmDay2Date = null;
let elmDay2IconDiv = null;
let elmDay2Icon = null;
let elmDay2Temp = null;
let elmDay2Wind = null;
let elmDay2Humidity = null;

let elmDay3Div = null;
let elmDay3Date = null;
let elmDay3IconDiv = null;
let elmDay3Icon = null;
let elmDay3Temp = null;
let elmDay3Wind = null;
let elmDay3Humidity = null;

let elmDay4Div = null;
let elmDay4Date = null;
let elmDay4IconDiv = null;
let elmDay4Icon = null;
let elmDay4Temp = null;
let elmDay4Wind = null;
let elmDay4Humidity = null;    

let elmDay5Div = null;
let elmDay5Date = null;
let elmDay5IconDiv = null;
let elmDay5Icon = null;
let elmDay5Temp = null;
let elmDay5Wind = null;
let elmDay5Humidity = null;
let elmSearchBtn = null;
let elmCityInput = null;

// Set up click event for the search button.
elmSearchBtn = document.getElementById("search_btn");
elmSearchBtn.addEventListener("click", SearchClick);

// Set up focus event for the city input element..
elmCityInput = document.getElementById("city_input");
elmCityInput.addEventListener("focus", CityInputFocus);

// Call function to get button data from local storage.
GetLocalStorage();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: GetLocalStorage - This function gets all of the button history data from local storage.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetLocalStorage()
{
    let elmButton = null;
    let elmSearchBlock = null;
    let DomElements = null;
    let nIndex = 0;
    let elmHR = null;
    let btnStorageDataItems = null;
    
    // Get the button history data from local storage. 
    btnStorageDataItems = JSON.parse(localStorage.getItem("Weather_Dashboard") || "[]");

    // If the array does not contain any button data storage items then exit.
    if (btnStorageDataItems.length === 0)
    {
        return;
    }

    // Sort the buttons data storage items on the nIndex value in ascending order.
    if (btnStorageDataItems.length > 1)
    {
        btnStorageDataItems.sort((a, b) => 
        {
            return a.nIndex - b.nIndex;
        });
    }

    // Get the Search Block element and add the <hr> element.
    elmSearchBlock = document.getElementById("search_block");
    elmHR = document.createElement("hr")
    elmSearchBlock.appendChild(elmHR);             

    // Loop through the button data storage items.
    for (nIndex = 0; nIndex < btnStorageDataItems.length; nIndex++)
    {
        // Add the button:
        elmButton = document.createElement("button");
        elmButton.addEventListener("click", ButtonClick);
        elmButton.innerHTML = btnStorageDataItems[nIndex].szCity;
        elmButton.setAttribute("state-code", btnStorageDataItems[nIndex].szStateCode);
    
        elmSearchBlock.appendChild(elmButton);     

        // If the button was the one diplayed then call the PerformForecastOperation function.
        // Pass in the city, state code and a value of false, not adding a button.
        if (btnStorageDataItems[nIndex].bDisplayed)
        {
            PerformForecastOperation(btnStorageDataItems[nIndex].szCity, btnStorageDataItems[nIndex].szStateCode, false);            
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: CityInputFocus - This is the focus event for the city text input control.  It clears the text when it receives the focus.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CityInputFocus(event)
{
    // Clear the text in the city text input control.
    event.target.value = "";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions: AddElements - This function will create and append all of the elements for the weather forecast sections.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddElements()
{
    let dtDate = null;
    let m = null;

    // Get the main section element.
    elmMain = document.getElementById("main");

    // Create and append the right panel element.
    elmRightPanel = document.createElement("section");
    elmRightPanel.classList.add("right_panel");
    elmMain.appendChild(elmRightPanel);

    // Create and append the location block element.
    elmLocBlock = document.createElement("section");
    elmLocBlock.classList.add("location_block");
    elmRightPanel.appendChild(elmLocBlock);

    // Create and append the location date.
    elmLocDateDiv = document.createElement("div");
    elmLocBlock.appendChild(elmLocDateDiv);
    elmLocDate = document.createElement("h2")
    elmLocDate.classList.add("loc_data");
    elmLocDate.id = "loc_date";
    elmLocDateDiv.appendChild(elmLocDate);
    elmLocIcon = document.createElement("img");
    elmLocIcon.id= "loc_icon";
    elmLocIcon.src = "";
    elmLocIcon.alt = "Weather Icon";
    elmLocDateDiv.appendChild(elmLocIcon);

    // Create and append the location temperature.
    elmLocTemp = document.createElement("p");
    elmLocTemp.id = "loc_temp";
    elmLocTemp.classList.add("loc_data");
    elmLocBlock.appendChild(elmLocTemp);

    // Create and append the location wind speed.
    elmLocWind = document.createElement("p");
    elmLocWind.id = "loc_wind";
    elmLocWind.classList.add("loc_data");
    elmLocBlock.appendChild(elmLocWind);

    // Create and append the location humidity.
    elmLocHumidity = document.createElement("p");
    elmLocHumidity.id = "loc_humidity";
    elmLocHumidity.classList.add("loc_data");
    elmLocBlock.appendChild(elmLocHumidity);

    // Create and append the location UV Index.
    elmLocUvi = document.createElement("p");
    elmLocUvi.id = "loc_uvi";
    elmLocUvi.classList.add("loc_data");
    elmLocBlock.appendChild(elmLocUvi);   
 
    // Create and append the Forecast Title.
    elmForecastTitle = document.createElement("h3");
    elmForecastTitle.innerHTML = "5-Day Forecast";
    elmRightPanel.appendChild(elmForecastTitle);

    // Create and append the Forecast Block.
    elmForecastBlock = document.createElement("section");
    elmForecastBlock.classList.add("forecast_block"); 
    elmRightPanel.appendChild(elmForecastBlock);       

    ///////////////////////////////////////////////////////////////////////
    // Create and append the first forecast.
    ///////////////////////////////////////////////////////////////////////

    elmDay1Div = document.createElement("div");
    elmDay1Div.classList.add("forecast_day");   
    elmForecastBlock.appendChild(elmDay1Div);       

    elmDay1Date = document.createElement("h5");
    elmDay1Date.id = "day1_date";
    elmDay1Date.classList.add("forecast_data");       
    elmDay1Div.appendChild(elmDay1Date);

    elmDay1IconDiv = document.createElement("div");
    elmDay1Div.appendChild(elmDay1IconDiv);
    elmDay1Icon = document.createElement("img");
    elmDay1Icon.id = "day1_icon";
    elmDay1Icon.src = "";
    elmDay1Icon.alt = "Weather Icon";
    elmDay1IconDiv.appendChild(elmDay1Icon);

    elmDay1Temp = document.createElement("p");
    elmDay1Temp.id = "day1_temp";
    elmDay1Temp.classList.add("forecast_data");  
    elmDay1Div.appendChild(elmDay1Temp);          

    elmDay1Wind = document.createElement("p");
    elmDay1Wind.id = "day1_wind";
    elmDay1Wind.classList.add("forecast_data");  
    elmDay1Div.appendChild(elmDay1Wind);    

    elmDay1Humidity = document.createElement("p");
    elmDay1Humidity.id = "day1_humidity";
    elmDay1Humidity.classList.add("forecast_data");  
    elmDay1Div.appendChild(elmDay1Humidity);        

    ////////////////////////////////////////////////////////////
    // Create and append the second forecast.
    ////////////////////////////////////////////////////////////

    elmDay2Div = document.createElement("div");
    elmDay2Div.classList.add("forecast_day");   
    elmForecastBlock.appendChild(elmDay2Div);       

    elmDay2Date = document.createElement("h5");
    elmDay2Date.id = "day2_date";
    elmDay2Date.classList.add("forecast_data");       
    elmDay2Div.appendChild(elmDay2Date);

    elmDay2IconDiv = document.createElement("div");
    elmDay2Div.appendChild(elmDay2IconDiv);
    elmDay2Icon = document.createElement("img");
    elmDay2Icon.id = "day2_icon";
    elmDay2Icon.src = "";
    elmDay2Icon.alt = "Weather Icon";
    elmDay2IconDiv.appendChild(elmDay2Icon);

    elmDay2Temp = document.createElement("p");
    elmDay2Temp.id = "day2_temp";
    elmDay2Temp.classList.add("forecast_data");  
    elmDay2Div.appendChild(elmDay2Temp);          

    elmDay2Wind = document.createElement("p");
    elmDay2Wind.id = "day2_wind";
    elmDay2Wind.classList.add("forecast_data");  
    elmDay2Div.appendChild(elmDay2Wind);    

    elmDay2Humidity = document.createElement("p");
    elmDay2Humidity.id = "day2_humidity";
    elmDay2Humidity.classList.add("forecast_data");  
    elmDay2Div.appendChild(elmDay2Humidity);      

    ///////////////////////////////////////////////////////////////////////
    // Create and append the third forecast.
    ///////////////////////////////////////////////////////////////////////

    elmDay3Div = document.createElement("div");
    elmDay3Div.classList.add("forecast_day");   
    elmForecastBlock.appendChild(elmDay3Div);       

    elmDay3Date = document.createElement("h5");
    elmDay3Date.id = "day3_date";
    elmDay3Date.classList.add("forecast_data");       
    elmDay3Div.appendChild(elmDay3Date);

    elmDay3IconDiv = document.createElement("div");
    elmDay3Div.appendChild(elmDay3IconDiv);
    elmDay3Icon = document.createElement("img");
    elmDay3Icon.id = "day3_icon";
    elmDay3Icon.src = "";
    elmDay3Icon.alt = "Weather Icon";
    elmDay3IconDiv.appendChild(elmDay3Icon);

    elmDay3Temp = document.createElement("p");
    elmDay3Temp.id = "day3_temp";
    elmDay3Temp.classList.add("forecast_data");  
    elmDay3Div.appendChild(elmDay3Temp);          

    elmDay3Wind = document.createElement("p");
    elmDay3Wind.id = "day3_wind";
    elmDay3Wind.classList.add("forecast_data");  
    elmDay3Div.appendChild(elmDay3Wind);    

    elmDay3Humidity = document.createElement("p");
    elmDay3Humidity.id = "day3_humidity";
    elmDay3Humidity.classList.add("forecast_data");  
    elmDay3Div.appendChild(elmDay3Humidity);      

    ///////////////////////////////////////////////////////////////
    // Create and append the fourth forecast.
    ///////////////////////////////////////////////////////////////

    elmDay4Div = document.createElement("div");
    elmDay4Div.classList.add("forecast_day");   
    elmForecastBlock.appendChild(elmDay4Div);       

    elmDay4Date = document.createElement("h5");
    elmDay4Date.id = "day4_date";
    elmDay4Date.classList.add("forecast_data");       
    elmDay4Div.appendChild(elmDay4Date);

    elmDay4IconDiv = document.createElement("div");
    elmDay4Div.appendChild(elmDay4IconDiv);
    elmDay4Icon = document.createElement("img");
    elmDay4Icon.id = "day4_icon";
    elmDay4Icon.src = "";
    elmDay4Icon.alt = "Weather Icon";
    elmDay4IconDiv.appendChild(elmDay4Icon);

    elmDay4Temp = document.createElement("p");
    elmDay4Temp.id = "day4_temp";
    elmDay4Temp.classList.add("forecast_data");  
    elmDay4Div.appendChild(elmDay4Temp);          

    elmDay4Wind = document.createElement("p");
    elmDay4Wind.id = "day4_wind";
    elmDay4Wind.classList.add("forecast_data");  
    elmDay4Div.appendChild(elmDay4Wind);    

    elmDay4Humidity = document.createElement("p");
    elmDay4Humidity.id = "day4_humidity";
    elmDay4Humidity.classList.add("forecast_data");  
    elmDay4Div.appendChild(elmDay4Humidity);      

    //////////////////////////////////////////////////////////////    
    // Create and append the fifth forecast.
    //////////////////////////////////////////////////////////////

    elmDay5Div = document.createElement("div");
    elmDay5Div.classList.add("forecast_day");   
    elmForecastBlock.appendChild(elmDay5Div);       

    elmDay5Date = document.createElement("h5");
    elmDay5Date.id = "day5_date";
    elmDay5Date.classList.add("forecast_data");       
    elmDay5Div.appendChild(elmDay5Date);

    elmDay5IconDiv = document.createElement("div");
    elmDay5Div.appendChild(elmDay5IconDiv);
    elmDay5Icon = document.createElement("img");
    elmDay5Icon.id = "day5_icon";
    elmDay5Icon.src = "";
    elmDay5Icon.alt = "Weather Icon";
    elmDay5IconDiv.appendChild(elmDay5Icon);

    elmDay5Temp = document.createElement("p");
    elmDay5Temp.id = "day5_temp";
    elmDay5Temp.classList.add("forecast_data");  
    elmDay5Div.appendChild(elmDay5Temp);          

    elmDay5Wind = document.createElement("p");
    elmDay5Wind.id = "day5_wind";
    elmDay5Wind.classList.add("forecast_data");  
    elmDay5Div.appendChild(elmDay5Wind);    

    elmDay5Humidity = document.createElement("p");
    elmDay5Humidity.id = "day5_humidity";
    elmDay5Humidity.classList.add("forecast_data");  
    elmDay5Div.appendChild(elmDay5Humidity); 

    ///////////////////////////////////////////////////////////
    // Display all of the dates for all of the forecast days:
    ///////////////////////////////////////////////////////////
 
    // Add a day to the date and update the date for forecast day 1.
    m = moment();
    m.add(1, "day");
    dtDate = m.format("M/D/YYYY");
    elmDay1Date.textContent = dtDate;

    // Add a day to the date and update the date for forecast day 2.
    m.add(1, "day");
    dtDate = m.format("M/D/YYYY");
    document.getElementById("day2_date");
    elmDay2Date.textContent = dtDate;

    // Add a day to the date and update the date for forecast day 3.
    m.add(1, "day");
    dtDate = m.format("M/D/YYYY");
    elmDay3Date.textContent = dtDate;

    // Add a day to the date and update the date for forecast day 4.
    m.add(1, "day");
    dtDate = m.format("M/D/YYYY");
    elmDay4Date.textContent = dtDate;

    // Add a day to the date and update the date for forecast day 5.
    m.add(1, "day");
    dtDate = m.format("M/D/YYYY");
    elmDay5Date.textContent = dtDate;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: SearchClick - This function is the click event for the "Search" button.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SearchClick()
{
    let szCity = "";
    let szStateCode = "";
    let szState = "";
    let elmCity = null;
    let elmState = null;
    let nIndex = 0;
    let forecastData = null;
    let DomElements = null;

    let szBuffer = ""
    let szStorage = "";
    let nPos = 0;
    let szWord = "";
    let nStartPos = 0;

    // Get the text entered by the user.  If none was entered alert the user about this issue.
    elmCity = document.getElementById("city_input");
    szCity = elmCity.value;
    szCity = szCity.trim();
    if (szCity.length === 0)
    {
        alert("***** Weather Dashboard *****\r\n\r\nYou must enter a city!");
        return;
    }

    // Get the state code for the selected state.  If one was not selected alert the user about this issue.
    elmState = document.getElementById("state_code");
    szStateCode = elmState.value;
    if (szStateCode.length === 0)
    {
        alert("***** Weather Dashboard *****\r\n\r\nYou must select a state!");
        return;                
    }

    // Test if a button already exists for the City entered.  If it does then tell the user that they need to
    // just select that button.
    DomElements = document.getElementsByTagName("button");

    for (nIndex = 0; nIndex < DomElements.length; nIndex++)
    {
        if ((DomElements[nIndex].innerHTML.toUpperCase() === szCity.toUpperCase()) && 
            (DomElements[nIndex].getAttribute('state-code') === szStateCode))
        {
            szTemp = "***** Weather Dashboard *****\r\n\r\nA button for the city: \"" + DomElements[nIndex].innerHTML + ", " + 
                     szStateCode + "\" already exists.\r\n\r\n";
            szTemp += "Please select this button to view the weather forecast.";
            alert(szTemp);
            return;
        }
    } 
    
    // Format the city string entered.  Pull out each word and make the first letter capital and all the rest lower case.
    // Set the Buffer string to an empty string.
    szBuffer = "";

    // Set the storage string to the City string value.
    szStorage = szCity;

    // look for a space in the storage string.
    nPos = szStorage.indexOf(" ");

    if (nPos === -1)
    {
        // Call the function to format the word to start with a capital letter.
        szBuffer = StartWordWithCapitalLetter(szCity);
    }
    else
    {
        // Perform the following operations if a space character was found
        while (nPos != -1)
        {
            // If the buffer already contains a word then add a space after it.
            if (szBuffer.length > 0)
            {
                szBuffer += " ";
            }

            // Get the word from the storage string.
            szWord = szStorage.substring(nStartPos, nPos);

            // Add the modified Word to the buffer string.
            szBuffer += StartWordWithCapitalLetter(szWord);

            // Adjust the start postion value and put the rest of the string into the storage string.
            nStartPos = nPos + 1;
            szStorage = szStorage.substring(nStartPos);

            // look for a space in the storage string.
            nPos = szStorage.indexOf(" ");

            // if a space was not found then add the modified word to the buffer string.
            if (nPos == -1)
            {
                szBuffer += " ";

                // Call the function to format the word to start with a capital letter.                
                szBuffer += StartWordWithCapitalLetter(szStorage);
            }
            // Otherwise reset the start position for the new word to zero.
            else
            {
                nStartPos = 0;                        
            }
        }
    }

    // Set the City string equal to the contents of the Buffer string.
    szCity = szBuffer;            

    // Call function to get the forecast.  Add the elements if not already added.  Display the forecast and Add the button.
    PerformForecastOperation(szCity, szStateCode, true);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: ButtonClick - This function is the click event for any of the city buttons.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonClick(event)
{
    let szCity = "";
    let szStateCode = "";

    // Get the City name and the state code for the button selected.
    szCity = event.target.innerHTML;
    szStateCode = event.target.getAttribute("state-code");
    
    // Get the weather forecast if the City selected by the user is not the one already displayed.
    if ((szCurrentCity !== szCity) || (szCurrentStateCode !== szStateCode))
    {
        // Call function to get the forecast.  Add the elements if not already added and display the forecast.
        PerformForecastOperation(szCity, szStateCode, false);            
    }        
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: DisplayData: This function will update all of the elements with the forecast data passed into this function.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DisplayData(szCity, Data)
{
    let dtDate = null;
    let iconUrl = "";
    let szTempLabel = "Temp: ";
    let szWindLabel = "Wind: ";
    let szHumidityLabel = "Humidity: ";
    let szUVIndexLabel = "UV Index: ";  
    let fUVI = 0.0;  
    let szF = " &#176F";
    let szMPH = " MPH";
    let szPercent = " %";  

    // Update the location elements with the forecast data for today.
    dtDate = moment().format("(M/D/YYYY)");        
    elmLocDate.textContent = szCity + " " + dtDate;
    iconUrl = "http://openweathermap.org/img/w/" + Data.daily[0].weather[0].icon + ".png";
    elmLocIcon.src = iconUrl;
    elmLocTemp.innerHTML = szTempLabel + Data.daily[0].temp.day + szF;
    elmLocWind.textContent = szWindLabel + Data.daily[0].wind_speed + szMPH;
    elmLocHumidity.textContent = szHumidityLabel + Data.daily[0].humidity + szPercent;
  
    // Convert the UV Index text value to a float numeric value.  Test the value to determine which class will be used for the 
    // span element.
    fUVI = parseFloat(Data.daily[0].uvi);
    if (fUVI <= 2.0)
    {
        elmLocUvi.innerHTML = szUVIndexLabel + "<span class=\"Uvi2\">" + Data.daily[0].uvi + "</span>";
    }
    else if (fUVI <= 5.0)
    {
        elmLocUvi.innerHTML = szUVIndexLabel + "<span class=\"Uvi5\">" + Data.daily[0].uvi + "</span>";
    }            
    else if (fUVI <= 7.0)
    {
            elmLocUvi.innerHTML = szUVIndexLabel + "<span class=\"Uvi7\">" + Data.daily[0].uvi + "</span>";
    }            
    else if (fUVI <= 10)
    {
            elmLocUvi.innerHTML = szUVIndexLabel + "<span class=\"Uvi10\">" + Data.daily[0].uvi + "</span>";
    }            
    else
    {
        elmLocUvi.innerHTML = szUVIndexLabel + "<span class=\"Uvi11\">" + Data.daily[0].uvi + "</span>";
    }            

    // Update the Day 1 Forecast elements.
    elmDay1Icon.src = "http://openweathermap.org/img/w/" + Data.daily[1].weather[0].icon + ".png";
    elmDay1Temp.innerHTML = szTempLabel + Data.daily[1].temp.day + szF;
    elmDay1Wind.textContent = szWindLabel + Data.daily[1].wind_speed + szMPH;
    elmDay1Humidity.textContent = szHumidityLabel + Data.daily[1].humidity + szPercent;

    // Update the Day 2 Forecast elements.
    elmDay2Icon.src = "http://openweathermap.org/img/w/" + Data.daily[2].weather[0].icon + ".png";
    elmDay2Temp.innerHTML = szTempLabel + Data.daily[2].temp.day + szF;
    elmDay2Wind.textContent = szWindLabel + Data.daily[2].wind_speed + szMPH;
    elmDay2Humidity.textContent = szHumidityLabel + Data.daily[2].humidity + szPercent;

    // Update the Day 3 Forecast elements.
    elmDay3Icon.src = "http://openweathermap.org/img/w/" + Data.daily[3].weather[0].icon + ".png";
    elmDay3Temp.innerHTML = szTempLabel + Data.daily[3].temp.day + szF;
    elmDay3Wind.textContent = szWindLabel + Data.daily[3].wind_speed + szMPH;
    elmDay3Humidity.textContent = szHumidityLabel + Data.daily[3].humidity + szPercent;

    // Update the Day 4 Forecast elements.
    elmDay4Icon.src = "http://openweathermap.org/img/w/" + Data.daily[4].weather[0].icon + ".png";
    elmDay4Temp.innerHTML = szTempLabel + Data.daily[4].temp.day + szF;
    elmDay4Wind.textContent = szWindLabel + Data.daily[4].wind_speed + szMPH;
    elmDay4Humidity.textContent = szHumidityLabel + Data.daily[4].humidity + szPercent;    

    // Update the Day 5 Forecast elements.
    elmDay5Icon.src = "http://openweathermap.org/img/w/" + Data.daily[5].weather[0].icon + ".png";
    elmDay5Temp.innerHTML = szTempLabel + Data.daily[5].temp.day + szF;
    elmDay5Wind.textContent = szWindLabel + Data.daily[5].wind_speed + szMPH;
    elmDay5Humidity.textContent = szHumidityLabel + Data.daily[5].humidity + szPercent;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformForecastOperation - This function will call the Open Weather API to get the forecast. It will call the function to
// add the elements, display the data, add the new button and save the button history data to local storage.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PerformForecastOperation(szCity, szStateCode, bAddButton)
{
    let locationResponse = null;
    let locationData = null;
    let forecastResponse = null;
    let forecastData = null;
    let szTempLabel = "Temp: ";
    let szWindLabel = "Wind: ";
    let szHumidityLabel = "Humidity: ";
    let szUVIndexLabel = "UV Index: ";  
    let iconUrl = "";
    let fUVI = 0.0;    
    let dtDate = null;    

    // Call the fetch methods to get the weather forecast data.
    // This url is getting the longitude and latitude values.  Using City, State Code and country code.
    requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
    requestUrl += szCity + "," + szStateCode + ",US&limit=1&appid=102c7d11551160c968359fbb711b3f59";

    // Replace any space character with the text string "%20".
    requestUrl = requestUrl.replace(" ", "%20");

    fetch(requestUrl)
    .then(function (locationResponse) 
    {
        if (locationResponse.ok)
        {
            return locationResponse.json();
        }
        else
        {
            throw new Error(locationResponse.status);
        }
    })
    .then(function (locationData) 
    {
        // Test if the country value is set to the US.
        if (locationData.length === 0)
        {
            throw new Error("The Location Data Was Not Retrieved From The Server.");
        }

        if (locationData[0].country !== "US")
        {
            throw new Error("The Location Was Not Found In The United States.");
        }

        if (locationData[0].state.toLowerCase() !== szStateCode.toLowerCase())
        {
            throw new Error("The Incorrect State Was Found For The City.\r\n\r\nState: " + 
            locationData[0].state + "\r\nCity: " + szCity);
        }

        // Use the longitude and latitued values to get the seven day weather forecast.
        requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + locationData[0].lat;
        requestUrl += "&lon=" + locationData[0].lon;
        requestUrl += "&exclude=current,minutely,hourly,alerts&units=imperial&appid=102c7d11551160c968359fbb711b3f59"; 

        // Replace any space characters with the character string "%20".
        requestUrl = requestUrl.replace(" ", "%20");

        fetch(requestUrl)
        .then(function (forecastResponse) 
        {
            if (forecastResponse.ok)
            {
                return forecastResponse.json();
            }
            else
            {
                throw new Error(forecastResponse.status);   
            }
        })
        .then(function (forecastData) 
        {
             // Test if we have all the forecast data for today and 5 days.
            if (forecastData.daily.length < 6)
            {
                throw new Error("The Forecast Data Was Not Retrieved From The Server.");
            }

            // If the szCurrentCity and szCurrentStateCode values are empty strings then call the routine to add the elements.
            if ((szCurrentCity.length === 0) && (szCurrentStateCode.length === 0))
            {
                AddElements();
            }

            // We successfully got the weather forecast data so set the new Current City and Current State Code Values.
            szCurrentCity = szCity;
            szCurrentStateCode = szStateCode;

            // Call routine to update the data.
            DisplayData(szCity, forecastData);

            // If we need to created a new button. 
            if (bAddButton === true)
            {
                // Call the function to add the button.
                AddButton(szCity, szStateCode);
            }
            
            // Call routine to save the button data to local storage.
            UpdateLocalStorage();
        });
    })
    .catch(function (error) {
        alert("***** Weather Dashboard *****\r\n\r\nOpenWeather API Error.\r\n\r\nThe follow problem occurred:\r\n" + error);
        return (null);
    }); 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: StartWordWithCapitalLetter - This function will take the word passed in, Make the first character upper case, set all the
// rest of the characters to lower case and return the word to the calling function.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function StartWordWithCapitalLetter(szWord)
{
    let szTemp = "";

    // Make the first character in the word uppercase.
    szTemp = szWord.substring(0, 1).toUpperCase();

    // Set all of the rest of the characters in the word to lowercase.
    szTemp += szWord.substring(1).toLowerCase();
    return (szTemp);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: UpdateLocalStorage - This function will loop through the city buttons.  It creates a new btnData object and sets all of
// its values and then adds it to the btnStorageDataItems array.  It then calls local storage to save all the button history data.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateLocalStorage()
{
    let DomElements = null;
    let nIndex = null;
    let btnStorageDataItems = [];
    
    // Get all of the button elements.
    DomElements = document.getElementsByTagName("button");

    // If have more than the one search button, then save the data to local storage.
    if (DomElements.length > 1)
    {
        // Loop through the buttons.
        for (nIndex = 0; nIndex < DomElements.length; nIndex++)
        {
            // If the button is not the search button then perform the following operations.
            if (DomElements[nIndex].getAttribute('state-code') !== "search")
            {
                // Create the btnData object and set it values.
                btnDataObj = Object.create(btnData);
                btnDataObj.nIndex = nIndex;
                btnDataObj.szCity = DomElements[nIndex].innerHTML;
                btnDataObj.szStateCode = DomElements[nIndex].getAttribute('state-code');

                // If the weather forecast is currently displayed for the button set bDisplayed to true.
                if ((btnDataObj.szCity === szCurrentCity) && (btnDataObj.szStateCode === szCurrentStateCode))
                {
                    btnDataObj.bDisplayed = true;
                }
                // Otherwise set bDisplayed to false.
                else
                {
                    btnDataObj.bDisplayed = false;
                }

                // Add the button to the array.
                btnStorageDataItems.push(btnDataObj);
            }
        }
    }

    // Save the button history data to local storage.
    localStorage.setItem("Weather_Dashboard", JSON.stringify(btnStorageDataItems));      
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AddButton: This function will add the new button to the Search Block.  If buttons already exist add the button before the
// first one.  If 11 buttons exist after the add operation then remove the last button.  The Max number of buttons is 10.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddButton(szCity, szStateCode)
{
    let elmButton = null;
    let elmSearchBlock = null;
    let elmHR = null;
    let DomElements = null;

    elmButton = document.createElement("button");
    elmButton.addEventListener("click", ButtonClick);
    elmButton.innerHTML = szCity;
    elmButton.setAttribute("state-code", szStateCode);

    // Get the search block element.
    elmSearchBlock = document.getElementById("search_block");
    
    // Get all of the button elements.
    DomElements = document.getElementsByTagName("button");

    // If only have the one search button then use appendChild command and add in the <hr> element.
    if (DomElements.length === 1)
    {
        elmHR = document.createElement("hr")
        elmSearchBlock.appendChild(elmHR);        
        elmSearchBlock.appendChild(elmButton);     
    }
    // Otherwise insert before the first button after the search button.
    else
    {
        if (DomElements.length > 1)
        {
            elmSearchBlock.insertBefore(elmButton, DomElements[1]);
        }

        // If the number of buttons is equal to 12 = (11 buttons + search button)
        // then remove the last button.
        if (DomElements.length === 12)
        {
            elmSearchBlock.removeChild(elmSearchBlock.lastChild);
        }
    }
}





