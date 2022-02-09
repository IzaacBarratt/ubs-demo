import { Application } from "../interfaces/application";

export function getBCAPIndexfromApplication(application: Application): number[] {
    try {
        const fullBCAP = application.BCAP3;
        const parsedBCAPNumbers = fullBCAP.match(/\d+/g)

        if (parsedBCAPNumbers != null) {
            const bcapNumbers  = parsedBCAPNumbers.map((n) => parseInt(n));

            if (!bcapNumbers) {
                throw Error()
            }
            return bcapNumbers;
        }
    } catch (e) {
        console.error(`
             Unable to get bcap numbers from application ${application.id}
             BCAP3: ${application.BCAP3}
        `)
    }

    return [];
}