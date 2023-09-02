const { generateRandomString } = require('./../../utils/index.js');
describe('Perform API tests on Tourist resource', () => {

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

  it('Access paginated tourist list using the obtained token', function () {    
      cy.request({
        method: 'GET',
        url: baseUrl + 'Tourist',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((response) => {
        console.log(response);

        expect(response.status).to.eq(200);
        expect(response).to.have.property('body');
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');

        response.body.data.forEach((item) => {
            expect(item).to.have.property('id').to.be.a('number');
            expect(item).to.have.property('tourist_name').to.be.a('string');
            expect(item).to.have.property('tourist_email').to.be.a('string');
            expect(item).to.have.property('tourist_location').to.be.a('string');
        });
      });
  });

  it('POST and GET operations on tourist resource', function() {
    let name = generateRandomString(10);
    let touristInfo = {
        "tourist_name": name,
        "tourist_email": 'test-' + name + '@gmail.com',
        "tourist_location": "USA"
    }
    cy.request({
        method: 'POST',
        url: baseUrl + 'Tourist',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: touristInfo
    }).as('createResponse');

    cy.get('@createResponse').then((createResponse) => {
        console.log(createResponse);
        expect(createResponse.status).to.eq(201);
        expect(createResponse).to.have.property('body');
        expect(createResponse.body).to.be.an('object');
        expect(createResponse.body).to.have.property('id');
        const resourceId = createResponse.body.id;

        cy.request({
            method: 'GET',
            url: `${baseUrl}Tourist/${resourceId}`,
        }).then((response) => {
            console.log('GET response')
            console.log(response);
            expect(response.status).to.eq(200);
            expect(response.body.tourist_name).to.eq(touristInfo.tourist_name);
            expect(response.body.tourist_email).to.eq(touristInfo.tourist_email);
            expect(response.body.tourist_location).to.eq(touristInfo.tourist_location);
        });

        // API does not support PUT method
        // API does not support DELETE method
    });
  });
});