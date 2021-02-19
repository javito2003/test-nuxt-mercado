const request = require('supertest')
const app = require('../app')
const Product = require('../models/productos');

let id
let body

describe('Create a new product', () => {
    let product
    
    beforeEach(async() => {
        product = {
            title: "Fiate 2001",
            price: "3000"
        }
        await Product.deleteMany({})
    })
    afterEach(() => {
        console.log('Product created');
    }) 

    it('Create a new product', async(done) => {
        return request(app).post('/api/new-product').send(product).expect(200).then((res) => {
            expect(res.body).toBeDefined()
            id = res.body.product._id
            done()
        })
    });
});

describe('Get product/s', () => {
    it('Should return all products', async() => {
        await request(app).post('/api/products').expect(200).then((res) => {
            expect(res.body).toBeDefined()
        })
    });
    it('Should return a product', async () => {
        await request(app).post(`/api/product/${id}`).expect(200).then(res => {
            expect(res.body.product).toBeDefined()
        })
    });
});

describe('Edit product', () => {
    let newDetails
    beforeEach(() => {
        newDetails = {
            title: "fiat 2010",
            description: "Peron es grande, pero no mas que yo",
            price: 1000
        }
    })
    afterEach(() => {
        console.log('Product updated');
    })

    it('Should edit a product', async(done) => {
        const res = await request(app).post(`/api/edit-product/${id}`).send(newDetails).expect(200)
            console.log(res.body.product);
            done()
    });
});