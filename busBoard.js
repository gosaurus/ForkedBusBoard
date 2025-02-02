import { getStopPointsDetails, parseBusArrivalData, displayBusArrivalDetails, getJourneyToStopPoint } from './testFetch.js';
import { callTflArrivalsAPI } from './apis.js';

export async function busBoard() {
    const stopPointData = await getStopPointsDetails(); 
    if (stopPointData.length === 0) {
        console.log("No bus stops near your postcode.");
    } else {
        for (let index = 0; index < 2; index++) {
            const stopPoint = stopPointData[index].stopPoint;
            const busStopName = stopPointData[index].busStop;
            const arrivalRawData = await callTflArrivalsAPI(stopPoint);;
            const busStopArrival = await parseBusArrivalData(arrivalRawData);
            if (busStopArrival.length === 0) {
                console.log(`No buses currently due to arrive at ${stopPointData[index].busStop}.`);
            }
            else { 
                displayBusArrivalDetails(busStopArrival, busStopName);
                await getJourneyToStopPoint(stopPoint);
            }
        }
    }}

