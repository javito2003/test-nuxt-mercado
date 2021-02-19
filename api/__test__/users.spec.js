const request = require('supertest')
const app = require('../app')
const User = require('../models/user')

let id
let token
describe('Create a new user', () => {
    let user
    
    beforeEach(async() => {
        user = {
            name: "Pero2n",
            email: "1@1.com",
            password: "1234"
        }
        await User.deleteMany({})
        await User(user).save
    })
    afterEach(() => {
        console.log('User created');
    })
    
    it('Create an user an user', async(done) => {
        return request(app).post('/api/register').send(user).expect(201).then((res) => {
            expect(res.body).toBeDefined()
            done()
        })
    });
    
});

describe('Login user', () => {
    let user
    beforeEach(async()=> {
        user = {
            email : "1@1.com",
            password: "1234"
        }
        await User(user).save
    })
    afterEach(() => {
        console.log('login user');
    })
    
    it('Login user', async(done) => {
        return request(app).post('/api/login').send(user).expect(200).then(res => {
            expect(res.body).toBeDefined()
            
            token = res.body.token
            id = res.body.userData._id
            done()
        })
    });
    
});


describe('Get user', () => {
    it('Should return a user', async() => {
        await request(app).post(`/api/data/${id}`).set('token',token).expect(200).then(res => {
            console.log('Get response = ' + res.body.userData);
        })
    });
});

describe('Editar user', () => {
    let newDetails
    beforeEach(() => {
        newDetails = {
            name : "El loco anchaval",
            password: "1234",
            rol: "ADMIN"
        }
    })
    afterEach(() => {
        console.log('User updated');
    })

    it('Should edit an user', async(done) => {
        
        const res = await request(app).post(`/api/user/${id}`).send(newDetails).expect(200)

        console.log(res.body);
        done()
    });

});