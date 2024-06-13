import varenv from '../dotenv.js';
import jwt from 'jsonwebtoken';

console.log(varenv)
export const generateToken = (user) => {

    const token = jwt.sign({ user }, "coderhouse", { expiresIn: '12h' })
    return token
}

console.log(generateToken({
    "_id": "6642be64407375ae2dd000a9",
    "first_name": "Tadeo",
    "last_name": "Torres",
    "age": 35,
    "password": "$2b$12$VdmbDVfHMA.1dDenZYpAKO0Whs51Qp8W2dixhtPQW8zCYpaIC2odi",
    "email": "tadeo@example.com",
    "rol": "User",
    "cart_id": {
        "_id": "6642be64407375ae2dd000aa",
        "products": [],
        "__v": 0
    },
    "__v": 0
}))



// console.log(generateToken({
// "_id": "661ffef55768fc9097bc79c8",
// "first_name": "Emily",
// "last_name": "Emerson",
// "age": 25,
// "password": "$2b$12$puCRtL7PC1Xz8QGgM5XZUeUaHkWZYZoHrqh4S.i8xFLE7qjmjXzEq",
// "email": "adminCoder@coder.com",
// "rol": "Admin",
// "cart_id": {
//     "_id": "661ffef55768fc9097bc79c9",
//     "products": [],
//     "__v": 0
// },
// "__v": 0
// }))