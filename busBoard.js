import { getStopPointsDetails, displayBusArrivalDetails, getBusArrivals, getJourneyToStopPoint } from './testFetch.js';
import { getJourneyToDestination } from './journeyPlanner.js';
import { getPostCodeFromUser } from './userInput.js';

export async function busBoard() {
    const postCode = getPostCodeFromUser()
    const stopPointData = await getStopPointsDetails(postCode); 
     if (stopPointData.length === 0) {
         console.log("No bus stops near your postcode.");
     } else {
         for (let index = 0; index < 2; index++) {
             const busStopArrivals = await getBusArrivals(stopPointData, index);
             if (busStopArrivals.length === 0) {
                 console.log(`No buses currently due to arrive at ${stopPointData[index].busStop}.`);
             }
             else { 
                 displayBusArrivalDetails(busStopArrivals, stopPointData[index].busStop);
                 await getJourneyToStopPoint(stopPointData[index].stopPoint, postCode);
             }
         }
     }
    await getJourneyToDestination(postCode);
}
