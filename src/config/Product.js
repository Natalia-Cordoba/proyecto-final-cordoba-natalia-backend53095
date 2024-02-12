import crypto from 'crypto'

export class Product {
    constructor(title, description, price, stock, code, category) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = []
        this.stock = stock
        this.code = code
        this.category = category
        this.id = crypto.randomBytes(10).toString('hex')
    }
}