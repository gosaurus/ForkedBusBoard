import { callTflStopPointsAPI, callJourneyPlannerAPIToStopPoint, callTflArrivalsAPI } from './apis.js';

export function parsePostCodeAPIdata(postCodeAPIRawData) {
    const coords = {};
    coords.longitude = postCodeAPIRawData.result.longitude;
    coords.latitude = postCodeAPIRawData.result.latitude;
    return coords;
}

export async function getStopPointsDetails(postCode) {
    const tflStopPointAPIRawData = await callTflStopPointsAPI(postCode); 
    const stopPointParsedData = parseStopPointData(tflStopPointAPIRawData);
    return stopPointParsedData;
}

export function parseStopPointData(tflStopPointAPIRawData) {
   const stopPointData= tflStopPointAPIRawData.stopPoints.map(busStop => ({
        stopPoint: busStop.naptanId,
        busStop: busStop.commonName,
        distance: busStop.distance
    }));
    return stopPointData.sort((a,b)=>a.Distance-b.distance).slice(0,2);
}

export async function getBusArrivals(stopPointData, index) {
    const arrivalRawData = await callTflArrivalsAPI(stopPointData[index].stopPoint);
    const busStopArrivals = await parseBusArrivalData(arrivalRawData);
    return busStopArrivals;
}

export async function parseBusArrivalData(arrivalData) {
    const busInfo = arrivalData.map(busDetails => ({
        Destination: busDetails.destinationName, 
        Route: busDetails.lineName,
        TimeToStation: Math.ceil(busDetails.timeToStation/60)
    }));
    return busInfo.sort((a,b) => a.TimeToStation - b.TimeToStation).slice(0,5);
}

export function displayBusArrivalDetails(busStopArrival,busStopName) {
    console.log(busStopName);
    busStopArrival.forEach((bus,index) => {
    console.log(`Bus ${index+1}`);
    for (let [key,value] of Object.entries(bus)) {
        if (key==="TimeToStation") {
            console.log(`${key} : ${value} minutes`);
        }
        else {
        console.log(`${key} : ${value}`);
        }
    }});
    console.log(`\n`);
}

//Function to parse raw data from TFL Journey Planner API
async function parseTflJourneyPlannerRawData(tflJourneyPlannerRawData) {
    const journeyLegs = [];
    const steps = [];
    const direction = [];
    const description = [];
    tflJourneyPlannerRawData.journeys.forEach((object) => {
        journeyLegs.push(object.legs);
        });
    journeyLegs.flat().forEach((subObject) => {
        steps.push(subObject.instruction.steps);
    });
    steps.flat().forEach((subSubObject) => {
        direction.push(subSubObject.descriptionHeading);
        description.push(subSubObject.description);
    });
    
    return {"direction":direction, "description":description};
}

function parse(rawData) {
    const legs = (rawData.journeys[0].legs);
    const instructions = legs.map((leg) => ({
        summary: leg.instruction.summary,
        detailed: leg.instruction.detailed,
        departureTime: leg.departureTime,
        arrivalTime: leg.arrivalTime
    }));
    return instructions;
    }

export function format(rawData) {
    const instructionsList = parse(rawData);
    instructionsList.forEach((instruction, index) => { 
        const summary = instruction["summary"];
        const detailed = instruction["detailed"];
        if (summary === detailed) {
            console.log(`${index}. ${detailed}`);
        }
        else {
            const regex = /(to|towards)\s{1}([\w\s\d/]+)/;
            const matchedInstruction = summary.match(regex);
            console.log(`${index}. Board the ${detailed}; disembark at ${matchedInstruction[2]}.`);
        }
    })
    }


function formatJourney(parsedData) {
    const journey = [];
    const directions = parsedData.direction;
    const description = parsedData.description;
    for (let i = 0; i < directions.length; i++) {
        journey.push(`${directions[i]} ${description[i]} `);
    }
    console.log(`Directions:`);
    for (let steps in journey){
        console.log(`${parseInt(steps)+1}: ${journey[steps]}`);
    }
}

export async function getJourneyToStopPoint(stopCode, postCode) {
    const tflJourneyPlannerRawData = await callJourneyPlannerAPIToStopPoint(stopCode, postCode);
    const parsedData = await parseTflJourneyPlannerRawData(tflJourneyPlannerRawData);
    return formatJourney(parsedData);
 }

