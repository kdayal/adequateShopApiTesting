const { generateRandomString } = require('./../../utils/index.js');
describe('Perform API tests on Customer resource', () => {

    let authToken;
    let baseUrl = Cypress.config('API_URL');

    beforeEach(() => {
        const userCredentials = {
            email: Cypress.config('USERNAME'),
            password: Cypress.config('PASSWORD'),
        };
        cy.request('POST', baseUrl + 'AuthAccount/Login', userCredentials)
        .then((response) => {
          // Assertion: Verify the response status code
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('Token');
  
          // Store the token for future authenticated requests
          authToken = response.body.data.Token;
        });
    });    

  it('Access restricted resource using the obtained token', function () {    
      cy.request({
        method: 'GET',
        url: baseUrl + 'Customer',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response).to.have.property('body');
        expect(response.body).to.be.an('array');

        response.body.forEach((item) => {
            expect(item).to.have.property('id').to.be.a('number');
            expect(item).to.have.property('name').to.be.a('string');
            expect(item).to.have.property('email').to.be.a('string');
            expect(item).to.have.property('location').to.be.a('string');
        });
      });
  });

  it('CRUD operations on customer resource', function() {
    let name = generateRandomString(10);
    let userInfo = {
        "name": name,
        "email": 'test-' + name + '@gmail.com',
        "location": "USA"
    }
    cy.request({
        method: 'POST',
        url: baseUrl + 'Customer',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: userInfo
    }).as('createResponse');

    cy.get('@createResponse').then((createResponse) => {
        console.log(createResponse);
        expect(createResponse.status).to.eq(201);
        expect(createResponse).to.have.property('body');
        expect(createResponse.body).to.be.an('object');
        expect(createResponse.body).to.have.property('id');
        const resourceId = createResponse.body.id; // Extract the resource ID

        cy.request({
            method: 'GET',
            url: `${baseUrl}Customer/${resourceId}`,
        }).then((response) => {
            console.log('GET response')
            console.log(response);
        });

        // API does not support PUT method
        // API does not support DELETE method
    });
  });
});