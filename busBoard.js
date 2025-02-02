import { getStopPointsDetails, displayBusArrivalDetails, getBusArrivals, getJourneyToStopPoint } from './testFetch.js';

export async function busBoard() {
    const stopPointData = await getStopPointsDetails(); 
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
                await getJourneyToStopPoint(stopPointData[index].stopPoint);
            }
        }
    }}

