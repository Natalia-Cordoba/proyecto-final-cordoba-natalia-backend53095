import { faker } from '@faker-js/faker/locale/es';

export const createRandomProducts = () => {
    return {
        title: `${faker.music.songName()}, de ${faker.person.fullName()}`, 
        description: faker.lorem.words({ min: 3, max: 5 }), 
        price: faker.commerce.price({ min: 8000, max: 40000, symbol: '$' }) ,
        stock: faker.number.int(150) ,
        code: faker.commerce.isbn(),
        category: faker.helpers.arrayElement(['Misterio', 'Fantasía', 'Ciencia Ficción', 'Romance', 'Aventura', 'Biografía', 'Historia', 'Autoayuda', 'Thriller']),
        status: faker.datatype.boolean(1.0),
        thumbnail: faker.helpers.arrayElement([faker.image.url()]),
        _id: faker.database.mongodbObjectId()
    }
}
