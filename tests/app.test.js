const server = require('../app'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Tests for main app file', function () {

    it('GET to / should return 200', function (done) {
        chai.request(reqServer)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

});
