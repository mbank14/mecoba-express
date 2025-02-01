import { test } from 'node:test'
import supertest from 'supertest'

import app from '../index'

const api = supertest(app)

test('should user return as json', async() => {
    await api.get('/coba/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
 })

//  after(async() => {
//     await 
//  })
