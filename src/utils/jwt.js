import varenv from '../dotenv.js';
import jwt from 'jsonwebtoken';

console.log(varenv)
export const generateToken = (user) => {

    const token = jwt.sign({ user }, "coderhouse", { expiresIn: '12h' })
    return token
}

console.log(generateToken({
    "_id": "6642bea1407375ae2dd000af",
    "first_name": "Felix",
    "last_name": "Fernandez",
    "age": 73,
    "password": "$2b$12$GqhTLoWSFIp8qzGbapI2pu9zPciYmW0Fp6kJT8i/kNBT15SykVDnO",
    "email": "felix@example.com",
    "rol": "User",
    "cart_id": {
    "_id": "6642bea1407375ae2dd000b0",
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