import {showMessage} from "react-native/Libraries/Utilities/LoadingView";
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
export const createEmptyArrayManuel = (isSimulation, channel, value, delayTime) => {
    let bytes = [];
    for (let i = 0; i < 11; i++) {
        if (isSimulation) {
            bytes.push(255);
        } else {
            bytes.push(0);
        }
    }

    bytes[0] = (0x65);
    bytes[1] = (0x06);
    bytes[2] = delayTime ?? 1;
    if (channel) {
        bytes[channel + 2] = parseInt(value);
    }

    bytes[11] = (0x66);

    return bytes;
}
export const sendData = async (data, ctxBle, ctx) => {

    ctxBle.getBleManagerConnectedDevices().then(devices => {

        if(ctx.aquarium.deviceList.length!=devices.length)
        {
            showMessage(ctx.t("cannotconnectalldevices"));
        }
        if (devices.length === 0) {
            showMessage(ctx.t("cannotConnect"));
            return;
        }
        devices.forEach(x => {
            if (ctx.aquarium.deviceList.filter(a => a.id == x.id).length > 0) {
                let serviceid = ctx.aquarium.deviceList.filter(a => a.id == x.id)[0].serviceUUIDs[0];
                ctxBle.sendDatatoDevice(x, data, null, serviceid);
            }
        });
    });
}
