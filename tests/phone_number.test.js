const server = require('../app'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Test for phone number component', function () {

    it('GET to /phoneNumber should return 200', function (done) {
        chai.request(reqServer)
            .get('/phoneNumber')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });
    it('should create a phone number', function (done) {
        chai.request(reqServer)
            .post('/phoneNumber')
            .send({
                number: '+39 02 1234567',
                contact_id: 3
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });
    it('should create a bunch of phone numbers', function (done) {
        chai.request(reqServer)
            .post('/phoneNumber/bulk')
            .send({
                contact_id: 3,
                phones: [
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

    it('should update a bunch of phone numbers', function (done) {
        chai.request(reqServer)
            .put('/phoneNumber/bulk')
            .send({
                contact_id: 2,
                phones: [
                    {
                        id:2,
                        number: '+39 02 2222228',
                    },
                    {
                        id:3,
                        number: '+39 02 3333337',
                    }
                ]
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    })

});
