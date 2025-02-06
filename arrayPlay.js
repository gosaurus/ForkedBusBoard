//Fetch Arrivals API
async function fetchArrivalsAPI() {
    return await fetch("https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals");
}

// Process API response as JSON
async function toJson(response) {
    const jsonResponse = await response.json();
    return jsonResponse;
}

// Extracted lineName(route), destinationName and timeToStation
function extractData(jsonResponse) {
    const extractedData = jsonResponse.map((bus) => ({
        lineName: bus.lineName,
        destinationName: bus.destinationName,
        timeToStation: bus.timeToStation,
     }))
    console.log(extractedData);
    return extractedData
}

// Sort buses from shortest to longest timeToStation(seconds)
function sortArrivals(extractedData) {
    extractedData.sort((a, b) => a.timeToStation - b.timeToStation);
    console.log(extractedData);
    return extractedData;
}

const response = await fetchArrivalsAPI();
const jsonResponse = toJson(response);
console.log(await jsonResponse);
const extractedData = extractData(await jsonResponse);
const sortedBuses = sortArrivals(extractedData);
