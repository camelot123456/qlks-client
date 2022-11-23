import {LOCAL_TIME_REGEX} from "../constants/constants";

export const addTimeSuffixes = (dateInput, defaultTime) => {
    const localTime = new Date();
    if (defaultTime?.match(LOCAL_TIME_REGEX)) {
        console.log(1);
        return dateInput + 'T' + defaultTime;
    } else {
        return `${dateInput}T${localTime.getHours().toString()}:${localTime.getMinutes().toString()}:${localTime.getSeconds().toString()}`;
    }
}