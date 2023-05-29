export function findArrayElementById(array, id,findBy) {
    return array.find((element) => {
        return element[findBy] === id;
    })
}
