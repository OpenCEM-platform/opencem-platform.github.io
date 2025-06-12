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

        if (!event) {
            alert("Event description cannot be empty. Please provide details about the event.");
            return;
        }

        const mockData = getMockData();

        document.getElementById("predictionText").innerText = mockData.prediction;
        document.getElementById("results").style.display = "block";
        document.getElementById("feedback").style.display = "block";

        renderCharts(mockData);
    } catch (error) {
        alert('Failed to fetch prediction data. Please try again later.');
        console.error(error);
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

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

function ApiData() {
    return {"battery_level":[32.4717933673512,37.240854482546425,41.63939267821811,42.89853173556081,43.39826689700047,43.14162503344799,42.592832870896764,42.04404070834554,41.49524854579432,40.946456383243095,43.076657364790535,45.206858346337974,47.33705932788541,49.46726030943285,48.91846814688163,48.36967598433041,47.820883821779184,47.27209165922796,47.16719251656214,47.83409438653114,49.226314556347695,50.0,50.0,50.0],"forecast_times":["2025-06-12T13:00:00+08:00","2025-06-12T14:00:00+08:00","2025-06-12T15:00:00+08:00","2025-06-12T16:00:00+08:00","2025-06-12T17:00:00+08:00","2025-06-12T18:00:00+08:00","2025-06-12T19:00:00+08:00","2025-06-12T20:00:00+08:00","2025-06-12T21:00:00+08:00","2025-06-12T22:00:00+08:00","2025-06-12T23:00:00+08:00","2025-06-13T00:00:00+08:00","2025-06-13T01:00:00+08:00","2025-06-13T02:00:00+08:00","2025-06-13T03:00:00+08:00","2025-06-13T04:00:00+08:00","2025-06-13T05:00:00+08:00","2025-06-13T06:00:00+08:00","2025-06-13T07:00:00+08:00","2025-06-13T08:00:00+08:00","2025-06-13T09:00:00+08:00","2025-06-13T10:00:00+08:00","2025-06-13T11:00:00+08:00","2025-06-13T12:00:00+08:00"],"initial_charge_kwh":27.50741058044961,"net_to_battery_kw":[5.826190615234024,5.596961456344429,5.162116431469842,1.477723309032589,0.5864882771256572,-0.23382427908536768,-0.5,-0.5,-0.5,-0.5,2.5,2.5,2.5,2.5,-0.5,-0.5,-0.5,-0.5,-0.0955727412160583,0.7826748224063695,1.6339070607380082,5.246385460176004,5.621497937276535,5.7934647241200485],"p_buy_control_kw":[3,3,3,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,3,3,3],"p_gen_forecast_kw":[3.3261906152340246,3.0969614563444288,2.6621164314698427,1.977723309032589,1.0864882771256572,0.2661757209146323,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.4044272587839417,1.2826748224063695,2.133907060738008,2.7463854601760036,3.121497937276535,3.2934647241200485],"p_load_forecast_kw":[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],"source":"default_source","temperatures":[30.3,31.0,30.5,30.5,29.4,29.1,28.5,28.2,28.1,28.0,27.9,27.8,27.6,27.5,27.4,27.3,27.2,27.2,27.4,28.1,29.0,30.0,30.8,31.0]};
}

function renderCharts(data) {
    renderWeatherChart(data.weather);
    renderEnergyPie(data.energy_mix);
    renderUsageTrend(data.usage_trend);
    renderEfficiencyGauge(data.cop);
}

const partialSums = (arr, init = 0) => {
      return arr.reduce((acc, curr, index) => {
        acc.push(curr + (acc[index - 1] || init));
        return acc;
      }, []);
    };

function renderEnergyMix(api_data) {
    var x_times = api_data.forecast_times.forEach(ts => Date.parse(ts));
    datasets: [
        {
            label: "Energy Usage",
            data: api_data.p_load_forecast_kw,
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red),
            stack: undefined,
            fill: 'origin'
        },
        {
            label: "PV Energy Generation",
            data: api_data.p_load_forecast_kw,
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red),
            stack: undefined,
            fill: 'origin'
        },
    ]
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

function renderEnergyPie(energyData) {
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
