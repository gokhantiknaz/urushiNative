import {useContext} from "react";
import {BleContext} from "../store/ble-context";

export function findArrayElementById(array, id, findBy) {
    return array.find((element) => {
        return element[findBy] === id;
    })
}


export function removeItemFromArray(array, item, searchBy) {
    return array.filter(function (x) {
        return x[searchBy] !== item[searchBy]
    })
};


export function minToTime(minute) {
    //convert minutes to time
    const hours = Math.floor(minute / 60)
        .toString()
        .padStart(2, "0");
    const minutes = (minute % 60).toString().padStart(2, "0");
    const sTime = `${hours}:${minutes}`;

    return sTime;
};

export function getDateFromHours(time) {
    time = time.split(":");
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

export const createEmptyArrayManuel = (channel, value, delayTime) => {
    let bytes = [];
    for (let i = 0; i < 10; i++) {
        if (i > 2 && i < 9) {
            bytes.push(-1);
        }
    }
    bytes[0] = (0x65);
    bytes[1] = (0x06);
    if (channel && value) {
        bytes[channel + 2] = value;
    }
    // kac dk acık kalacagını dk cinsinden
    if (delayTime) {
        bytes[2] = delayTime;
    }
    bytes[9] = (0x66);
    return bytes;
}

