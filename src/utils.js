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

