import { expect } from 'chai';
import * as user from './user';
import faker from 'faker';

const mockUser = {
  email: faker.internet.email(),
  phoneNo: `09${faker.random.number({ min: 0, max: 999999999})}`,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password()
};


describe('User API', () => {
  it('should create user', done => {
    user.createUser(mockUser)
      .then(result => {
        const { user } = result.data;
        const { _id: id } = user;
        
        Object.assign(mockUser, { id });

        expect(result.status).to.equal(200);
        expect(result.data).to.have.property('user');

        done();
      });
  });

  it('should get user', done => {
    const { email } = mockUser;
    const params = { email };

    user.getUser(params)
      .then(result => {
        const { data } = result.data;

        expect(result.status).to.equal(200);
        expect(data).to.be.an('array');

        done();
      });
  });

  it('should authenticate user', done => {
    const { email: username, password } = mockUser;
    const params = {
      username,
      password
    };

    user.authenticateUser(params)
      .then(result => {
        const { data } = result.data;

        expect(result.status).to.equal(200);
        expect(data).to.have.property('_id');

        done();
      })
  });

  it('should update user', done => {
    const { id } = mockUser;
    const body = {
      firstName: 'Juan'
    };

    user.updateUser(id, body)
      .then(result => {
        const { data } = result.data;

        expect(result.status).to.equal(200);
        expect(data.firstName).to.equal(body.firstName);
        
        done();
      })
  });
})