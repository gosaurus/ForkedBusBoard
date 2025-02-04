import { callJourneyPlannerAPIToStopPoint } from './apis.js';
import { getPostCodeFromUser } from './userInput.js';
import { format} from './testFetch.js';

export async function getJourneyToDestination() {
    //call for two postcodes
    const startPoint = getPostCodeFromUser();
    const destination = getPostCodeFromUser();
    //
    const JourneyPlannerRawDataResponse = await callJourneyPlannerAPIToStopPoint(startPoint, destination);
    //call something in testFetch to parse
    format(JourneyPlannerRawDataResponse);
}
