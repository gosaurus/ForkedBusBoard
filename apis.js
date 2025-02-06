import fetch from 'node-fetch';
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

async function getPostcodeLatLong (postCode) {
    const postCodeAPIURL = "https://api.postcodes.io/postcodes/"+postCode;
    const postCodeAPIRawData = await fetchAPI(postCodeAPIURL);
    const coords = parsePostCodeAPIdata(postCodeAPIRawData);
    return coords;
}

export async function callTflStopPointsAPI(postCode) {
    const coords = await getPostcodeLatLong(postCode);
    const tflStopPointsAPIURL = `https://api.tfl.gov.uk/StopPoint/?lat=`+
        `${coords.latitude}&lon=${coords.longitude}`+
        `&stopTypes=NaptanPublicBusCoachTram`;
    const tflStopPointAPIRawData = await fetchAPI(tflStopPointsAPIURL);
    return tflStopPointAPIRawData;
}

export async function callTflArrivalsAPI(stopPoint) {
    const busStopURL="https://api.tfl.gov.uk/StopPoint/"+stopPoint+"/Arrivals";
    const arrivalRawData = await fetchAPI(busStopURL);
    return arrivalRawData; }

 export async function callJourneyPlannerAPIToStopPoint(stopCode, postCode) {
    const tflJourneyPlannerAPIURL = "https://api.tfl.gov.uk/Journey/JourneyResults/"+postCode+"/to/"+stopCode;
    const tflJourneyPlannerRawData = await fetchAPI(tflJourneyPlannerAPIURL);
    return tflJourneyPlannerRawData;
 }

 export async function callJourneyPlannerAPIWithDestination(postCode, destination) {
    const tflJourneyPlannerAPIURL = "https://api.tfl.gov.uk/Journey/JourneyResults/"+postCode+"/to/"+destination+"?mode=bus";
    console.log(`In callJourneyPlannerAPIToStopPoint function (apis.js). postcode = ${postCode}, stopcode = ${destination}`);
    const tflJourneyPlannerRawData = await fetchAPI(tflJourneyPlannerAPIURL);
    return tflJourneyPlannerRawData;
 }
