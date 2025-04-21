import { DateTime } from "luxon";

const LuxonDateParser = {
    /**
     *
     * @param func 
     * @param dateToParse The date should be in yyyy-MM-dd hh:mm 
     * @param dateFormatToParse The format of date that should be parse the dateToParse
     * @param dateFormatToReturn The format of date that should be return
     * @returns This function will convert the EDT server date to local time
    */
    ServerEDTToSystem: (dateToParse: string, dateFormatToParse: string, dateFormatToReturn: string) => {
        let dateTime = DateTime.local();

        const serverDateTime = DateTime.fromFormat(
            dateToParse,
            dateFormatToParse,
            // {
            //     zone: "America/New_York",
            // }
        );

        return serverDateTime.setZone(dateTime.toFormat("z").toString()).toFormat(dateFormatToReturn);
    }
}

export default LuxonDateParser;