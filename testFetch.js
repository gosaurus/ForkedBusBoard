//Forked version@https://github.com/gosaurus/ForkedBusBoard.git

import fetch from 'node-fetch';
const testArray = [
  { Destination: 'Highgate Village', Route: '214', TimeToStation: 295 },
  {
    Destination: 'Highgate Village',
    Route: '214',
    TimeToStation: 1235
  },
  { Destination: 'Highgate Village', Route: '214', TimeToStation: 910 },
  {
    Destination: 'Highgate Village',
    Route: '214',
    TimeToStation: 1663
  },
  {
    Destination: 'Parliament Hill Fields',
    Route: '88',
    TimeToStation: 578
  },
  {
    Destination: 'Parliament Hill Fields',
    Route: '88',
    TimeToStation: 275
  },
  {
    Destination: 'Parliament Hill Fields',
    Route: '88',
    TimeToStation: 388
  },
  {
    Destination: 'Parliament Hill Fields',
    Route: '88',
    TimeToStation: 1004
  }
]
//Fetch TFL Stop-Point API. Note at this stage we are taking URL as it is with Stop Code. We will change it later to user prompt.
// async function fetchAPI() {
//     const response = await fetch("https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals");
//     let data = await response.json();
//     return data;
// }

// Extract required data from API (Destination,Route Number,TimetoStation(seconds)); Returns list of objects 
function extractData(data) {
    const extractInfo = data.map(busDetails=>({
        Destination: busDetails.destinationName, 
        Route: busDetails.lineName,
        TimeToStation: busDetails.timeToStation
    }));
    console.log(extractInfo);
    return extractInfo
}

// Sort buses by timeToStation 
function arrivalTime(extractInfo) {
    let sortedBuses = extractInfo.sort((a,b) = a.busDetails.timeToStation - b.busDetails.timeToStation);
}

// Main function
async function main() {
    // const apiResponseData = await fetchAPI(); // returns API data
    // const extractedInfo = extractData(apiResponseData); // returns extracted data
    
}