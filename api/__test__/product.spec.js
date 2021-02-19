const request = require('supertest')
const app = require('../app')
const Product = require('../models/productos');

let id
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJyb2wiOiJBRE1JTiIsIl9pZCI6IjYwMmZmYjc3ZTY2ZmQ5OGQ5NDkxOTljNCIsIm5hbWUiOiJQZXJvMm4iLCJlbWFpbCI6IjFAMS5jb20iLCJkYXRlIjoiMjAyMS0wMi0xOVQxNzo1NTowMy4zMDFaIiwiX192IjowfSwiaWF0IjoxNjEzNzU3MzAzLCJleHAiOjE2MTYzNDkzMDN9.g-70h_qYVCwrzb81Cw7vQPtQ9YJyZljQEgHvSPAASDY'

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
        return request(app).post('/api/new-product').set('token',token).send(product).expect(200).then((res) => {
            expect(res.body).toBeDefined()
            id = res.body.product._id
            done()
        })
    });
});

describe('Get product/s', () => {
    it('Should return all products', async() => {
        await request(app).post('/api/products').set('token',token).expect(200).then((res) => {
            expect(res.body).toBeDefined()
        })
    });
    it('Should return a product', async () => {
        await request(app).post(`/api/product/${id}`).set('token',token).expect(200).then(res => {
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
        const res = await request(app).post(`/api/edit-product/${id}`).set('token',token).send(newDetails).expect(200)
            console.log(res.body.product);
            done()
    });
});