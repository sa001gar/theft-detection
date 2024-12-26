// Simulated data
let consumptionData = {
    timestamps: Array.from({length: 24}, (_, i) => `${i}:00`),
    expected: Array.from({length: 24}, () => Math.random() * 100 + 50),
    actual: Array.from({length: 24}, () => Math.random() * 100 + 50)
};

let anomalyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    baseline: [65, 59, 80, 81, 56, 55],
    anomalies: [28, 48, 40, 19, 86, 27]
};

// Chart configurations
const consumptionChart = new Chart(document.getElementById('consumptionChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: consumptionData.timestamps,
        datasets: [
            {
                label: 'Expected Consumption',
                data: consumptionData.expected,
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Actual Consumption',
                data: consumptionData.actual,
                borderColor: '#ff375f',
                backgroundColor: 'rgba(255, 55, 95, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#fff' }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            }
        }
    }
});

const anomalyChart = new Chart(document.getElementById('anomalyChart').getContext('2d'), {
    type: 'bar',
    data: {
        labels: anomalyData.labels,
        datasets: [{
            type: 'line',
            label: 'Baseline',
            data: anomalyData.baseline,
            borderColor: '#4a90e2',
            tension: 0.4
        }, {
            type: 'bar',
            label: 'Anomalies',
            data: anomalyData.anomalies,
            backgroundColor: 'rgba(255, 55, 95, 0.5)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#fff' }
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            }
        }
    }
});

// Initialize Google Maps
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7128, lng: -74.0060},
        zoom: 11,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });

    // Add some sample markers
    const locations = [
        {lat: 40.7128, lng: -74.0060, type: 'suspicious'},
        {lat: 40.7282, lng: -73.7949, type: 'theft'},
        {lat: 40.6782, lng: -73.9442, type: 'suspicious'},
    ];

    locations.forEach(location => {
        new google.maps.Marker({
            position: {lat: location.lat, lng: location.lng},
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: location.type === 'theft' ? '#ff375f' : '#ffc01e',
                fillOpacity: 0.7,
                strokeWeight: 0,
                scale: 10
            }
        });
    });
}

// Initialize map when the script loads
google.maps.event.addDomListener(window, 'load', initMap);

// Update charts and stats in real-time
function updateData() {
    // Update consumption data
    consumptionData.expected = consumptionData.expected.map(value => value + (Math.random() - 0.5) * 10);
    consumptionData.actual = consumptionData.actual.map(value => value + (Math.random() - 0.5) * 15);

    // Update anomaly data
    anomalyData.baseline = anomalyData.baseline.map(value => value + (Math.random() - 0.5) * 5);
    anomalyData.anomalies = anomalyData.anomalies.map(value => value + (Math.random() - 0.5) * 10);

    // Update charts
    consumptionChart.data.datasets[0].data = consumptionData.expected;
    consumptionChart.data.datasets[1].data = consumptionData.actual;
    consumptionChart.update();

    anomalyChart.data.datasets[0].data = anomalyData.baseline;
    anomalyChart.data.datasets[1].data = anomalyData.anomalies;
    anomalyChart.update();

    // Update stats
    const total = consumptionData.actual.reduce((sum, value) => sum + value, 0);
    const normalPercentage = Math.round((total - anomalyData.anomalies.reduce((sum, value) => sum + value, 0)) / total * 100);
    const suspiciousPercentage = Math.round(anomalyData.anomalies.filter(value => value < 50).reduce((sum, value) => sum + value, 0) / total * 100);
    const theftPercentage = Math.round(anomalyData.anomalies.filter(value => value >= 50).reduce((sum, value) => sum + value, 0) / total * 100);

    document.getElementById('normal-percentage').textContent = `${normalPercentage}%`;
    document.getElementById('suspicious-percentage').textContent = `${suspiciousPercentage}%`;
    document.getElementById('theft-percentage').textContent = `${theftPercentage}%`;
}

// Simulate real-time updates
setInterval(updateData, 5000);

// Time filter functionality
document.querySelectorAll('.time-filter').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.time-filter.active').classList.remove('active');
        button.classList.add('active');
        // Here you would typically fetch new data based on the selected time range
        // For this example, we'll just regenerate random data
        consumptionData = {
            timestamps: Array.from({length: 24}, (_, i) => `${i}:00`),
            expected: Array.from({length: 24}, () => Math.random() * 100 + 50),
            actual: Array.from({length: 24}, () => Math.random() * 100 + 50)
        };
        updateData();
    });
});

// Function to add new detection items
function addDetectionItem(type, location, time) {
    const detectionItems = document.getElementById('detection-items');
    const item = document.createElement('div');
    item.className = `detection-item ${type}`;
    item.innerHTML = `
        <span>Location ${location}</span>
        <span>${time}</span>
    `;
    detectionItems.insertBefore(item, detectionItems.firstChild);
    if (detectionItems.children.length > 5) {
        detectionItems.removeChild(detectionItems.lastChild);
    }
}

// Simulate new detections
setInterval(() => {
    const type = Math.random() > 0.7 ? 'theft' : 'suspicious';
    const location = Math.random().toString(36).substr(2, 4).toUpperCase();
    const time = new Date().toLocaleTimeString();
    addDetectionItem(type, location, time);
}, 10000);

// Initial update
updateData();

