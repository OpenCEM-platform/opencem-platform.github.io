async function submitUserData() {
    const button = document.querySelector('.submit-button');
    const originalText = button.innerHTML;
    
    try {
        button.innerHTML = '<div class="loader"></div>';
        button.disabled = true;

        const location = document.getElementById("userLocation").value.trim();
        const event = document.getElementById("userEvent").value.trim();

        if (!location) {
            alert("Location cannot be empty. Please enter a valid district name.");
            return;
        }

        if (false && !event) {
            alert("Event description cannot be empty. Please provide details about the event.");
            return;
        }

        const mockData = getMockData();

        document.getElementById("results").style.display = "block";
        document.getElementById("feedback").style.display = "block";

        renderCharts(mockData);
        renderAll();
        //renderEnergyMix(ApiData());
        //renderBatteryLevel(ApiData());
    } catch (error) {
        alert('Failed to fetch prediction data. Please try again later.');
        console.error(error);
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

const context = [
    {'start': 7, 'end': 9,
     'context': "Weekday undergraduate orientation keynote in Main Auditorium—hundreds of attendees plug in together",
     'source': 1, 'load': 3},
    {'start': 12, 'end': 14, 'context': "Midday conference plenary in Conference Center—guest vehicles arrive en masse",
     'source': 2, 'load': 3},
    {'start': 17, 'end': 19,
     'context': "Evening VIP banquet at Campus Banquet Hall—steady high turnover at charging bays", 'source': 3,
     'load': 3},
    {'start': 8, 'end': 18, 'context': "All-day multi-track academic symposium—continuous heavy use throughout campus",
     'source': 4, 'load': 3},
    {'start': 9, 'end': 17, 'context': "Peak daytime hours during any large campus event", 'source': 5, 'load': 3},
    {'start': 10, 'end': 12, 'context': "Mid-morning breakout sessions at Symposium Wing—steady attendee trickle",
     'source': 1, 'load': 2},
    {'start': 14, 'end': 16, 'context': "Afternoon workshop block in Engineering Building—moderate, predictable use",
     'source': 2, 'load': 2},
    {'start': 16, 'end': 18, 'context': "Pre-dinner networking reception—guests top up before evening programs",
     'source': 3, 'load': 2},
    {'start': 11, 'end': 19, 'context': "Daytime hours on most weekdays when classes and small events overlap",
     'source': 4, 'load': 2},
    {'start': 13, 'end': 15, 'context': "Lunchtime period during a typical campus day", 'source': 5, 'load': 2},
    {'start': 0, 'end': 6, 'context': "Overnight on weekdays—only resident students’ trickle charging", 'source': 1,
     'load': 1},
    {'start': 6, 'end': 8, 'context': "Early-morning window before the first lectures—minimal campus traffic",
     'source': 2, 'load': 1},
    {'start': 20, 'end': 23, 'context': "Late-evening after most events—few vehicles charging", 'source': 3, 'load': 1},
    {'start': 13, 'end': 14, 'context': "Single lunchtime hour outside of event periods", 'source': 4, 'load': 1},
    {'start': 0, 'end': 23, 'context': "General off-peak period with no scheduled events", 'source': 5, 'load': 1}
];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('readystatechange', () => {
    const source = getRandomInteger(1, 5);
    const load = getRandomInteger(1,3);
    document.getElementById('userEvent').value = "Midday conference plenary in Conference Center—guest vehicles arrive en masse ";
});

// add dataset api here //
function getMockData() {
    return {
        prediction: "Based on the provided data, the predicted energy consumption is 120 kWh.",
        weather: {
            hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
            temperatures: [15, 14, 14, 13, 13, 12, 12, 13, 14, 16, 18, 20, 22, 23, 24, 24, 23, 22, 20, 18, 17, 16, 15, 15],
            current: { temp: 22, humidity: 60, wind: 10 }
        },
        energy_mix: {
            labels: ["Solar", "Wind", "Hydro", "Thermal"],
            values: [25, 35, 20, 20]
        },
        usage_trend: {
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            values: [100, 120, 130, 140, 150, 160, 170]
        },
        cop: 3.5
    };
}

async function ApiData() {
    if(window.location.hostname.includes("github"))
        return {"battery_level":[1.2153183565441923,14.102518874128357,14.212059557312665,14.396166578087891,14.580273598863117,14.764380619638343,14.94848764041357,15.132594661188795,15.316701681964021,15.557170364565138,13.791825829624873,12.963887581425759,12.823515375165831,13.607441002430583,14.556147176769704,15.487920248366846,16.224492748602938,16.567804785414484,16.234134125423342,14.925581819870699,12.069412541354243,8.91103461509367,5.752656688833095,3.5992171936554334],"context":"Midday conference plenary in Conference Center\u2014guest vehicles arrive en masse ","energy_prices":[0.627,0.256,0.256,0.256,0.256,0.256,0.256,0.256,0.256,0.256,0.627,0.627,0.627,1.047,0.627,0.627,0.627,0.627,0.627,0.627,0.627,1.047,0.627,0.627],"forecast_times":["2025-06-15T22:00:00+08:00","2025-06-15T23:00:00+08:00","2025-06-16T00:00:00+08:00","2025-06-16T01:00:00+08:00","2025-06-16T02:00:00+08:00","2025-06-16T03:00:00+08:00","2025-06-16T04:00:00+08:00","2025-06-16T05:00:00+08:00","2025-06-16T06:00:00+08:00","2025-06-16T07:00:00+08:00","2025-06-16T08:00:00+08:00","2025-06-16T09:00:00+08:00","2025-06-16T10:00:00+08:00","2025-06-16T11:00:00+08:00","2025-06-16T12:00:00+08:00","2025-06-16T13:00:00+08:00","2025-06-16T14:00:00+08:00","2025-06-16T15:00:00+08:00","2025-06-16T16:00:00+08:00","2025-06-16T17:00:00+08:00","2025-06-16T18:00:00+08:00","2025-06-16T19:00:00+08:00","2025-06-16T20:00:00+08:00","2025-06-16T21:00:00+08:00"],"initial_charge_kwh":2.292038104133023,"net_to_battery_kw":[-0.9809264305177103,13.965086478081917,0.11870267025408276,0.199505739267416,0.199505739267416,0.199505739267416,0.199505739267416,0.199505739267416,0.199505739267416,0.2605814927154215,-1.608285830338629,-0.754278457615118,-0.1278836090252784,0.8494931977041293,1.0280559962467075,1.0097066081223183,0.7981794532597446,0.37202666913562243,-0.3039847371672697,-1.1921333709221091,-2.602062367299851,-2.8773841961852877,-2.8773841961852877,-1.9618528610354207],"p_buy_control_kw":[0.0,14.946012908599627,1.099629100771793,1.5074076466243664,1.5074076466243664,1.5074076466243664,1.5074076466243664,1.5074076466243664,1.5074076466243664,1.826379527769696,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"p_buy_control_kw_opt":[0.0,12.958116846614608,0.9381211386334689,1.4356263301184446,1.4356263301184446,1.4356263301184446,1.4356263301184446,1.4356263301184446,1.4356263301184446,1.7187075530108131,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"p_gen_forecast_kw":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.3960548259811462,1.2690983658466588,2.1231057385701697,2.7495005871600093,3.13832153557879,3.3168843341213683,3.298534945996979,3.0870077911344054,2.660855007010283,1.984843600707391,1.0966949669525516,0.27532182888543655,0.0,0.0,0.0],"p_load_forecast_kw":[0.9809264305177103,0.9809264305177103,0.9809264305177103,1.3079019073569504,1.3079019073569504,1.3079019073569504,1.3079019073569504,1.3079019073569504,1.3079019073569504,1.9618528610354207,2.8773841961852877,2.8773841961852877,2.8773841961852877,2.288828337874661,2.288828337874661,2.288828337874661,2.288828337874661,2.288828337874661,2.288828337874661,2.288828337874661,2.8773841961852877,2.8773841961852877,2.8773841961852877,1.9618528610354207],"p_load_forecast_kw_pred":[1.0299727520435957,1.0299727520435957,1.0299727520435957,1.3732970027247977,1.3732970027247977,1.3732970027247977,1.3732970027247977,1.3732970027247977,1.3732970027247977,2.0599455040871915,3.0212534059945515,3.0212534059945515,3.0212534059945515,2.4032697547683934,2.4032697547683934,2.4032697547683934,2.4032697547683934,2.4032697547683934,2.4032697547683934,2.4032697547683934,3.0212534059945515,3.0212534059945515,3.0212534059945515,2.0599455040871915],"scenario_probabilities":{"high":0.25,"low":0.05,"medium":0.7},"source":"default_source","temperatures":[29.1,29.1,29.0,28.9,28.7,28.5,28.3,28.1,28.1,28.3,28.5,28.8,29.0,28.9,28.8,28.8,28.6,28.5,28.8,29.0,29.0,28.7,28.4,28.2]};
    else {
        const response =  await fetch("http://10.22.16.23/simulate/simulate",
        {
            method: 'post',
            body: JSON.stringify({
                    context: document.getElementById('userEvent').value
                })
        });
        const api_data = await response.json();
        return api_data;
    }
}

function renderCharts(data) {
    //(data.weather);
    //renderEnergyPie(data.energy_mix);
    //renderUsageTrend(data.usage_trend);
    //renderEfficiencyGauge(data.cop);
}

const partialSums = (arr, init = 0) => {
      return arr.reduce((acc, curr, index) => {
        acc.push(curr + (acc[index - 1] || init));
        return acc;
      }, []);
    };

async function renderAll() {
    const api_data = await ApiData();

    renderEnergyMix(api_data);
    renderBatteryLevel(api_data);
    renderActualLoad(api_data);
    renderEnergyPie(api_data);
    document.getElementById('context-out').innerHTML = '<p>' + api_data.context + '</p>';
    document.getElementById('context').style.display = 'block';
    document.getElementById("predictionText").innerHTML = 
            '<p>Predicted energy usage based on context: ' + Math.round(api_data.p_load_forecast_kw_pred.reduce((p, v) => p + v, 0)) + ' kWh.</p>'
          + '<p>Actual energy usage: ' + Math.round(api_data.p_load_forecast_kw.reduce((p, v) => p + v, 0)) + ' kWh.</p>';
}

function renderActualLoad(api_data) {
    const labels = api_data.forecast_times.map(ts => Date.parse(ts));
    const datasets = [
        {
            label: "Predicted Load",
            data: api_data.p_load_forecast_kw_pred,
            borderColor: 'rgba(108, 178, 235, 1)',
            backgroundColor: 'rgba(178, 178, 178, 0.5)'
        },
        {
            label: "Actual Load",
            data: api_data.p_load_forecast_kw,
            borderColor: 'rgba(178, 105, 235, 1)',
            backgroundColor: 'rgba(178, 178, 178, 0.5)'
        },
    ];
    const data = { labels : labels, datasets : datasets };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: { type: 'timeseries' },
                y: { suggestedMin: 0, position: 'left', display: true, title: { text: 'in kWh', display: true } }
            }        
        }
    };
    const ctx = document.getElementById('predictionVsActualLoadChart').getContext('2d');
    new Chart(ctx, config);
    document.getElementById('predictionVsActualLoad').style.display = 'block';
}

function renderBatteryLevel(api_data) {
    const labels = api_data.forecast_times.map(ts => Date.parse(ts));
    const datasets = [
        {
            label: "Battery SoC",
            data: api_data.battery_level,
            borderColor: 'rgba(108, 178, 235, 1)',
            backgroundColor: 'rgba(178, 178, 178, 0.5)',
            yAxisID: 'y'
        },
        {
            label: "Energy Buying Cost",
            data: partialSums(api_data.energy_prices.map((p, i) => p * api_data.p_buy_control_kw[i])),
            borderColor: 'rgba(178, 105, 235, 1)',
            backgroundColor: 'rgba(178, 178, 178, 0.5)',
            yAxisID: 'y1'
        },
    ];
    const data = { labels : labels, datasets : datasets };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: { type: 'timeseries' },
                y: { suggestedMin: 0, position: 'left', display: true, title: { text: 'in kWh', display: true } },
                y1: { position: 'right', display: true, title: { text: 'in CNY', display: true } }
            }        
        }
    };
    const ctx = document.getElementById('batteryLevelChart').getContext('2d');
    new Chart(ctx, config);
    document.getElementById('resultText').innerHTML += '<p>Total cost incurred: '
        + Math.round(100 * partialSums(api_data.energy_prices.map((p, i) => p * api_data.p_buy_control_kw[i]))[23]) / 100
        +' CNY</p>';
    document.getElementById('resultText').innerHTML += '<p>Optimal cost: '
        + Math.round(100 * partialSums(api_data.energy_prices.map((p, i) => p * api_data.p_buy_control_kw_opt[i]))[23]) / 100
        +' CNY</p>';
}

function renderEnergyMix(api_data) {
    const labels = api_data.forecast_times.map(ts => Date.parse(ts));
    const datasets = [
        {
            label: "PV Energy Generation",
            data: api_data.p_gen_forecast_kw,
            borderColor: 'rgba(235, 235, 108, 1)',
            backgroundColor: 'rgba(178, 178, 178, 0.5)',
            stack: 'stack1',
            fill: 'origin'
        },
        {
            label: "Energy Bought from Grid",
            data: api_data.p_buy_control_kw,
            borderColor: 'rgba(178, 108, 235, 1)',
            backgroundColor: 'rgba(178, 178, 178, 0.5)',
            stack: 'stack1',
            fill: 0
        },
        {
            label: "Energy Usage",
            data: api_data.p_load_forecast_kw,
            borderColor: 'rgba(235, 108, 108, 1)',
            backgroundColor: 'rgba(235, 108, 108, 0.5)',
            stack: undefined,
            fill: {above: 'red', below: 'green', target: 1}
        }/*,
        {
            label: "Energy Usage Predicted",
            data: api_data.p_load_forecast_kw_pred,
            borderColor: 'rgba(235, 108, 235, 1)',
            backgroundColor: 'rgba(235, 108, 235, 0.5)',
            stack: 'stack2'
        }*/
    ];
    const data = { labels : labels, datasets : datasets };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: { stacked: true, title: { display: true, text: 'in kWh' } },
                x: { type: 'timeseries' }
            },
            plugins: {
                filler: {
                    propagate: false
                },
                'samples-filler-analyser': {
                    target: 'chart-analyser'
                }
            },
        }
    };
    const ctx = document.getElementById('energyStackChart').getContext('2d');
    new Chart(ctx, config);
}

function renderWeatherChart(weatherData) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(108, 178, 235, 0.3)');
    gradient.addColorStop(1, 'rgba(108, 178, 235, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: weatherData.hours,
            datasets: [{
                label: 'Temperature (°C)',
                data: weatherData.temperatures,
                borderColor: 'rgba(108, 178, 235, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                backgroundColor: gradient,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: '#1a1a1a',
                    titleColor: '#f0f0f0',
                    bodyColor: '#d0d0d0',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            }
        }
    });

    document.getElementById('currentTemp').textContent = `${weatherData.current.temp}°C`;
    document.getElementById('humidity').textContent = `${weatherData.current.humidity}%`;
    document.getElementById('windSpeed').textContent = `${weatherData.current.wind} km/h`;
}

function renderEnergyPie(api_data) {
    const batteryChange = api_data.battery_level[23] - api_data.initial_charge_kwh;
    const energyData = {
            'labels' : ['Solar', 'Grid'],
            'values' : [ api_data.p_gen_forecast_kw.reduce((p, a) => p + a, 0), api_data.p_buy_control_kw.reduce((p, a) => p + a, 0) ]
        };

    energyData.values = energyData.values.map(v => Math.round(100 * v / energyData.values.reduce((p, a) => p + a, 0)))
    const ctx = document.getElementById('energyPieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: energyData.labels.map((label, i) => `${label} ${energyData.values[i]}%`),
            datasets: [{
                data: energyData.values,
                backgroundColor: ['#FFD700', '#00BFFF', '#32CD32', '#FF6347'],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => `Contribution: ${ctx.raw}% of total load`
                    }
                }
            }
        }
    });
    document.getElementById('resultText').innerHTML += '<p>Battery level change: ' + Math.round(batteryChange * 100) / 100 + ' kWh</p>';
}

function renderUsageTrend(trendData) {
    const ctx = document.getElementById('usageTrendChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: trendData.days,
            datasets: [{
                label: 'Power Usage (kWh)',
                data: trendData.values,
                backgroundColor: 'rgba(108, 178, 235, 0.7)',
                borderColor: 'rgba(108, 178, 235, 1)',
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { 
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#1a1a1a',
                    bodyColor: '#d0d0d0'
                }
            }
        }
    });
}

function renderEfficiencyGauge(copValue) {
    const ctx = document.getElementById('efficiencyGauge').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [copValue, 5 - copValue],
                backgroundColor: ['#7DE893', 'rgba(255, 255, 255, 0.1)'],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 270,
            rotation: 225,
            cutout: '80%',
            plugins: {
                tooltip: { enabled: false }
            }
        }
    });
    document.getElementById('copValue').textContent = copValue.toFixed(1);
}

async function submitFeedback() {
    const button = document.querySelector('#feedback .submit-button');
    const originalText = button.innerHTML;
    
    try {
        button.innerHTML = '<div class="loader"></div>';
        button.disabled = true;

        const accuracy = document.getElementById('accuracy').value;
        const correction = document.getElementById('correctPrediction').value;

        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accuracy, correction })
        });

        if (response.ok) {
            alert('Feedback submitted successfully!');
        } else {
            throw new Error('Failed to submit feedback');
        }
    } catch (error) {
        alert('Failed to submit feedback. Please try again later.');
        console.error(error);
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}
