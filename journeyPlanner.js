import { callJourneyPlannerAPIToStopPoint, callJourneyPlannerAPIWithDestination } from './apis.js';
import { getPostCodeFromUser } from './userInput.js';
import { format} from './testFetch.js';

export async function getJourneyToDestination(startPoint) {
    console.log("\nPlan a journey from your current postcode to your destination.\nyour destination postcode:")
    const destination = getPostCodeFromUser();
    const JourneyPlannerRawDataResponse = await callJourneyPlannerAPIWithDestination(startPoint, destination);
    format(JourneyPlannerRawDataResponse);
}
