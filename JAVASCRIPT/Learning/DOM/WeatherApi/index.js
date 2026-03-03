const cityValue = document.getElementById('cityInput')
const findBtn = document.getElementById('findButton')
const cityName = document.getElementById('city-name')
const cityTime = document.getElementById('city-time')
const cityTemp = document.getElementById('city-temp')

async function getData(cityName) {
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=fa80617f7696405185b81649253103&q=${cityName}&aqi=yes`)
    return await promise.json();
}

findBtn.addEventListener('click', async () => {
    const value = cityValue.value;
    const result = await getData(value)
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`
    cityTime.innerText = `${result.location.localtime}`
    cityTemp.innerText = `${result.current.temp_c}`

    cityValue.value = ""
    
})
