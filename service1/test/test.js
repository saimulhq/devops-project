var request = require("request"), assert = require('assert');

var base_url = "http://localhost:8000"

describe("Test Application", function () {
    // test case for get /
    describe("GET /", function () {
        this.timeout(10000);
        it("checks the response of the get /", function (done) {
            request.get(base_url + "/", function (error, response, body) {
                assert.equal(200, response.statusCode);
                assert(body.indexOf("Service 1") !== -1);
                assert(body.indexOf("Service 2") !== -1);
                assert(body.indexOf("Hello from") !== -1);
                done();
            });
        });
    });

    // test case for post /fibo
    describe("POST /fibo", function () {
        this.timeout(10000);
        it("returns a number", function (done) {
            request.post({
                url: base_url + "/fibo",
                body: "20"
            }, function (error, response, body) {
                assert(BigInt(body) >= 0);
                done();
            });
        });

        it("returns error: not a number", function (done) {
            request.post({
                url: base_url + "/fibo",
                body: "a"
            }, function (error, response, body) {
                assert.equal(body, "Error: not a number");
                done();
            });
        });

        it("returns error: negative number", function (done) {
            request.post({
                url: base_url + "/fibo",
                body: "-1"
            }, function (error, response, body) {
                assert.equal(body, "Error: negative number");
                done();
            });
        });
    });

    // test case for post /stop
    describe("POST /stop", function () {
        this.timeout(10000);
        it("makes a stop request", function (done) {
            request.post({
                url: base_url + "/stop",
                body: ""
            }, function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });

        it("checks fibo after stop", function (done) {
            request.post({
                url: base_url + "/fibo",
                body: "20"
            }, function (error, response, body) {
                assert.equal(body, "Interrupted");
                done();
            });
        });
    });

    // test case for get /run-log
    describe("GET /run-log", function () {
        this.timeout(10000);
        it("checks whether the logs are fetched correctly", function (done) {
            request.get(base_url + "/run-log", function (error, response, body) {
                assert.equal(200, response.statusCode);
                assert(body !== null);
                done();
            });
        });
    });

    // test case for post /shutdown
    describe("POST /shutdown", function () {
        this.timeout(10000);
        it("shutdowns the server", function (done) {
            request.post({
                url: base_url + "/shutdown",
                body: ""
            }, function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });
});