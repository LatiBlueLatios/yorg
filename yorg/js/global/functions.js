function randomInt(e, t) {
    return e + Math.floor(Math.random() * (t - e));
}

function make2DArray(rows, cols, callback) {
    const array = [];
    for (let i = 0; i < rows; i++) {
        const innerArray = [];
        for (let j = 0; j < cols; j++) {
            innerArray.push(callback(i, j));
        }
        array.push(innerArray);
    }
    return array;
}

function make1DArray(e, callback) {
    return Array.from({ length: e }, (_, index) => callback(index));
}

export {
    randomInt,
    make2DArray,
    make1DArray
}