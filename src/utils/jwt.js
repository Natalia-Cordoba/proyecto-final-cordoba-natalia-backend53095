import varenv from '../dotenv.js';
import jwt from 'jsonwebtoken';

console.log(varenv)
export const generateToken = (user) => {

    const token = jwt.sign({ user }, "coderhouse", { expiresIn: '12h' })
    return token
}


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

console.log(generateToken({
    "_id": "6620002fb34896d6fb42b5c4",
    "first_name": "Roberto",
    "last_name": "Robles",
    "age": 43,
    "password": "$2b$12$JQrJ2FLuqUjvnj4zULkIge9rb49DqZzitiSm0pLoleGeO5Gms1LNq",
    "email": "roberto@example.com",
    "rol": "User",
    "cart_id": {
        "_id": "66ad1928fe18b1ef2bd5da63",
        "products": [],
        "__v": 0
    },
    "__v": 1,
    "documents": [],
    "last_connection": "2024-08-02T17:36:40.591Z"

}))


