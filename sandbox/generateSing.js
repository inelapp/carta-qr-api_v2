const crypto = require('crypto');

function sortObjectByKeys(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((sortedObj, key) => {
            sortedObj[key] = obj[key];  // Agrega cada clave en orden alfabético
            return sortedObj;
        }, {});
}

function signRequest(secretKey, body, timestamp) {
    const data = JSON.stringify(sortObjectByKeys(body)) + timestamp;
    return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
}

const body = {
    id: "66dffc40b8cc6af87d284b59",
    // name : "Categoria de prueba 3 otra vez",
    // description:"Categoria de prueba 3 de nuevo",
    // active: false,
}

const timestamp = Math.floor(Date.now() / 1000);


const expiredTimestamp = timestamp - (6 * 60);
const secretKey = '12de0147-8cb1-4703-aad3-f77467af2631'

const signature = signRequest(secretKey, body, timestamp);
console.log(signature);
console.log(timestamp);
console.log("expiredTimestamp", expiredTimestamp);