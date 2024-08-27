export class OpenMeteoAPI {
    constructor() {
    }
    // Search for a city by name
    async searchCities(cityName) {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`);
        const data = await response.json();
        return data;
    }
    // Get the current weather for a city by its coordinates //https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto
    async getWeather(lat, lon) {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto`);
        const data = await response.json();
        const newData = {
            temperature: data.current.temperature_2m,
            apparentTemperature: data.current.apparent_temperature,
            description: this.getWeatherDescription(data.current.weather_code),
            icon: this.getWeatherIcon(data.current.weather_code)
        }
        return data;
    }
    // wmo code to weather description
    getWeatherDescription(wmoCode) {
        const weatherDescriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Drizzle: Light intensity',
            53: 'Drizzle: Moderate intensity',
            55: 'Drizzle: Dense intensity',
            56: 'Freezing Drizzle: Light intensity',
            57: 'Freezing Drizzle: Dense intensity',
            61: 'Rain: Slight intensity',
            63: 'Rain: Moderate intensity',
            65: 'Rain: Heavy intensity',
            66: 'Freezing Rain: Light intensity',
            67: 'Freezing Rain: Heavy intensity',
            71: 'Snow fall: Slight intensity',
            73: 'Snow fall: Moderate intensity',
            75: 'Snow fall: Heavy intensity',
            77: 'Snow grains',
            80: 'Rain showers: Slight intensity',
            81: 'Rain showers: Moderate intensity',
            82: 'Rain showers: Violent intensity',
            85: 'Snow showers: Slight intensity',
            86: 'Snow showers: Heavy intensity',
            95: 'Thunderstorm: Slight or moderate',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return weatherDescriptions[wmoCode] || 'Unknown weather condition';
    }

    //wmo code to weather icon
    getWeatherIcon(wmoCode) {
        const weatherIcons = {
            0: '100',  // Clear sky
            1: '101',  // Mainly clear
            2: '103',  // Partly cloudy
            3: '104',  // Overcast
            45: '301', // Fog
            48: '301', // Depositing rime fog (similar to fog)
            51: '300', // Drizzle: Light intensity
            53: '300', // Drizzle: Moderate intensity
            55: '300', // Drizzle: Dense intensity
            56: '302', // Freezing Drizzle: Light intensity
            57: '302', // Freezing Drizzle: Dense intensity
            61: '305', // Rain: Slight intensity
            63: '306', // Rain: Moderate intensity
            65: '307', // Rain: Heavy intensity
            66: '308', // Freezing Rain: Light intensity
            67: '308', // Freezing Rain: Heavy intensity
            71: '400', // Snow fall: Slight intensity
            73: '401', // Snow fall: Moderate intensity
            75: '402', // Snow fall: Heavy intensity
            77: '404', // Snow grains
            80: '306', // Rain showers: Slight intensity
            81: '307', // Rain showers: Moderate intensity
            82: '308', // Rain showers: Violent intensity
            85: '400', // Snow showers: Slight intensity
            86: '401', // Snow showers: Heavy intensity
            95: '302', // Thunderstorm: Slight or moderate
            96: '302', // Thunderstorm with slight hail
            99: '302', // Thunderstorm with heavy hail
        };
        return `<i class="qi-${weatherIcons[wmoCode]}"></i>`
    }
}