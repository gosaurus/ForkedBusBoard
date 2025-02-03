import fetch from 'node-fetch';
import { getPostCodeFromUser, postCode } from './userInput.js';
import { parsePostCodeAPIdata } from './testFetch.js';

async function fetchAPI(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (response.status !== 200) {
            throw new Error(`API not responding ${response.status}.`);
        }
        else {
            return await response.json();
        }
    }
    catch(Error) {
        console.error(`Error: ${Error}`);
    }
}

async function getPostcodeLatLong () {
    const postCodeAPIURL = "https://api.postcodes.io/postcodes/"+getPostCodeFromUser();
    const postCodeAPIRawData = await fetchAPI(postCodeAPIURL);
    const coords = parsePostCodeAPIdata(postCodeAPIRawData);
    return coords;
}

export async function callTflStopPointsAPI() {
    const coords = await getPostcodeLatLong();
    const tflStopPointsAPIURL = `https://api.tfl.gov.uk/StopPoint/?lat=`+
        `${coords.latitude}&lon=${coords.longitude}`+
        `&stopTypes=NaptanPublicBusCoachTram`;
    const tflStopPointAPIRawData = await fetchAPI(tflStopPointsAPIURL);
    return tflStopPointAPIRawData;
}

export async function callTflArrivalsAPI(stopPoint) {
    //const stopPoint = callTFLArrivalsAPI(stopPointDetails[index].StopPoint);
    const busStopURL="https://api.tfl.gov.uk/StopPoint/"+stopPoint+"/Arrivals";
    const arrivalRawData = await fetchAPI(busStopURL);
    return arrivalRawData; }

 export async function callJourneyPlannerAPIToStopPoint(postCode, destination) {
    // const tflJourneyPlannerAPIURL = "https://api.tfl.gov.uk/Journey/JourneyResults/"+postCode+"/to/"+destination;
    const tempAPIresponse = "https://api.tfl.gov.uk/Journey/JourneyResults/SE167AR/to/NW71DN?mode=bus" 
    console.log(`In callJourneyPlannerAPIToStopPoint function (apis.js). postcode = ${postCode}, stopcode = ${destination}`);
    const tflJourneyPlannerRawData = await fetchAPI(tempAPIresponse);
    return tflJourneyPlannerRawData;
 }
