export function findArrayElementById(array, id,findBy) {
    return array.find((element) => {
        return element[findBy] === id;
    })
}


export function removeItemFromArray(array, item, searchBy) {
    return array.filter(function (x) {
        return x[searchBy] !== item[searchBy]
    })
};


export function  minToTime (minute) {
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
