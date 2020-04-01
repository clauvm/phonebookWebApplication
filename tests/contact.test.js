const server = require('../app'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;
const PhoneNumber = require('../components/phone_number/phone_number.model').phoneNumber;

describe('Test for contact component', function () {

    // before((done) => {
    //     PhoneNumber.sync({force: true}) // drops table and re-creates it
    //         .success(function () {
    //             done(null);
    //         })
    //         .error(function (error) {
    //             done(error);
    //         });
    // });

    it('GET to /contact should return 200', function (done) {
        chai.request(reqServer)
            .get('/contact')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should get a single contact', function (done) {
        chai.request(reqServer)
            .get('/contact/1')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should get a contact based on a keyword', function (done) {
        chai.request(reqServer)
            .get('/contact/key/juan')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should create a contact', function (done) {
        chai.request(reqServer)
            .post('/contact')
            .send({
                name: 'Juan',
                lastName: 'Perez'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('should update a contact', function (done) {
        chai.request(reqServer)
            .put('/contact/1')
            .send({
                name: 'Juan',
                lastName: 'Perezz'
            })
            .end(function (err, res) {
                console.log("res");
                // console.log(res.data);
                res.should.have.status(200);
                done();
            })

    });

    it('should create a contact with phone numbers', function (done) {
        chai.request(reqServer)
            .post('/contact/phoneNumbers')
            .send({
                name: "Claudia",
                lastName: "Vaquera",
                phoneNumbers: [
                    {
                        number: '+39 02 1234567',
                    },
                    {
                        number: '+39 02 1234567',
                    },
                    {
                        number: '+39 02 1234567',
                    }
                ]
            })
            .end(function (err, res) {

                res.should.have.status(200);
                done();
            })
    });

    it('should update a contact with phone numbers', function (done) {
        chai.request(reqServer)
            .put('/contact/2/phoneNumbers')
            .send({
                name: "Andress",
                lastName: "Herediaa",
                phoneNumbers: [
                    {
                        id:2,
                        number: '+39 02 4444448',
                    },
                    {
                        id:3,
                        number: '+39 02 5555557',
                    }
                ]
            })
            .end(function (err, res) {

                res.should.have.status(200);
                done();
            })
    })
});
