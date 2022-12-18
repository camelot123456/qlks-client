import {LOCAL_TIME_REGEX} from "constants/constants";

export const addTimeSuffixes = (dateInput, defaultTime) => {
    const localTime = new Date();
    if (defaultTime?.match(LOCAL_TIME_REGEX)) {
        return dateInput + 'T' + defaultTime;
    } else {
        return `${dateInput}T${checkNumber(localTime.getHours().toString())}:${checkNumber(localTime.getMinutes().toString())}:${checkNumber(localTime.getSeconds().toString())}`;
    }
};

export const getDatetimeNow = () => {
    const localTime = new Date();
    const date = `${checkNumber(localTime.getFullYear().toString())}-${checkNumber(localTime.getUTCMonth().toString())}-${checkNumber(localTime.getUTCDate().toString())}`;
    const time = `${checkNumber(localTime.getHours().toString())}:${checkNumber(localTime.getUTCMinutes().toString())}:${checkNumber(localTime.getUTCSeconds().toString())}`;
    return `${date}T${time}`;
};

export const convertByPercent = (input, percent) => {
    return input * (100.0 - percent) / 100;
};

const checkNumber = (num) => {
    if (num.length < 2) {
        return `0${num}`;
    }
    return num;
};
