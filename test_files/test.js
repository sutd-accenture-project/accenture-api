const request = require('supertest');
const index = require('./auth/__mocks__/indexmock');
const admin = require('./routes/admin');
const express = require('express');
const moxios = require('moxios');
const axios = require('axios');

// const initApp = () => {
//     const app = express();
//     app.use(admin);
//     return app;
//   }

describe('Test of validation of email', () =>{
    test('It should return true if email is correct',(done) =>{
        const email = index.validateEmail('samsonyubaijian@hotmail.com');
        expect(email).toBe(true);
        done();
    })
})

describe('Test of validation of email', () =>{
    test('It should return false if email does not contain @',(done) =>{
        const email = index.validateEmail('samsonyubaijianhotmail.com');
        expect(email).toBe(false);
        done();
    })
})

describe('Test of validation of email', () =>{
    test('It should return false if email does not contain .com',(done) =>{
        const email = index.validateEmail('samsonyubaijian@hotmail');
        expect(email).toBe(false);
        done();
    })

    test('It should return false if email does not contain anything',(done) =>{
        const email = index.validateEmail('');
        expect(email).toBe(false);
        done();
    })

    test('It should return false if email does not contain anything before @',(done) =>{
        const email = index.validateEmail('@hotmail.com');
        expect(email).toBe(false);
        done();
    })

    test('It should return false if email does not contain any domain',(done) =>{
        const email = index.validateEmail('samsonyubaijian@.com');
        expect(email).toBe(false);
        done();
    })
})

describe('Test of validation of password', () => {
    test('It should return true if password is correct:', (done) =>{
        const password = index.validatePassword('Abcd1234!');
        expect(password).toBe(true);
        done();
    })
})

describe('Test of validation of password', () => {
    test('It should return false if password does not have any caps:', (done) =>{
        const password = index.validatePassword('abcd1234!');
        expect(password).toBe(false);
        done();
    })
})

describe('Test of validation of password', () => {
    test('It should return false if password does not have any numbers:', (done) =>{
        const password = index.validatePassword('abcd!');
        expect(password).toBe(false);
        done();
    })
})
describe('Test of validation of password', () => {
    test('It should return false if password does not have any symbols:', (done) =>{
        const password = index.validatePassword('abcd1234');
        expect(password).toBe(false);
        done();
    })
})

describe('Test for get from local database', () => {
    test('The result should be that the ticket format is as expected for id 1', async() =>{
        jest.setTimeout(20000);
        const req = await request(admin).get('/fake/tix/example');
        const text = await req.text;
        expect(text).toEqual("[{\"id\":\"1\",\"subject\":\"Help pls\",\"message\":\"Need help!\",\"requester\":\"Kenneth\",\"user_id\":\"1\",\"email\":\"test@gmail.com\",\"priority\":true,\"unsolved\":true,\"date_submitted\":\"5/4/2019\",\"admin_id\":\"2\"}]")
    })

    test('The result should be that the ticket format is as expected for id 2', async() =>{
        jest.setTimeout(20000);
        const req = await request(admin).get('/fake/tix/fake2');
        const text = await req.text;
        expect(text).toEqual("[{\"id\":\"2\",\"subject\":\"Help pls\",\"message\":\"Need help!\",\"requester\":\"Kenneth\",\"user_id\":\"3\",\"email\":\"test@gmail.com\",\"priority\":false,\"unsolved\":false,\"date_submitted\":\"5/4/2019\",\"admin_id\":\"2\"}]")
    })

})


describe('Test for get from production database', () => {
    test('The result should be that the ticket format is as expected for id 1', async() =>{
        jest.setTimeout(20000);
        const req = await request('http://accenturesutd.herokuapp.com').get('/admin');
        const text = await req.text;
        expect(text).toEqual("[{\"id\":4,\"email\":\"test@accenture.com\",\"password\":\"$2b$10$Yk2E3B.FmeL/OOyiJuzHzuoMRov/WgrUu5QRCqRuayQvcDtm5PoHi\",\"name\":\"Kenneth Soon\"},{\"id\":5,\"email\":\"testsamson@accenture.com\",\"password\":\"$2b$10$MKTTVFC3flguAB1.m.I8leMoFuwegylwiGtCombVkeDxOt6sqrFL2\",\"name\":\"Samson Yu\"},{\"id\":6,\"email\":\"testng@accenture.com\",\"password\":\"$2b$10$CDuOtk/xEc9DQB5Es5GPm..qeW8epKGCQDwXLVtkhm0caav6gDFMC\",\"name\":\"Kenneth Ng\"}]");
    })
})


describe('Validate ticket submission',() =>{
    test('validate ticket empty space, should result in false',(done) =>{
        const tix = index.validateTicket('');
        expect(tix).toBe(false);
        done();
    })
})