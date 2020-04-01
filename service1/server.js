var http = require("http");
var fs = require('fs');

var port = 8000;

var server = http.createServer();

var runCalculation = true; // variable used for checking whether fibo needs to stopped or not

let startTimestamp = Date.now();
let startDateObject = new Date(startTimestamp);

let startDate = startDateObject.getDate();
let startMonth = startDateObject.getMonth() + 1;
let startYear = startDateObject.getFullYear();
let startHour = startDateObject.getHours();
let startMinute = startDateObject.getMinutes();
let startSecond = startDateObject.getSeconds();

// this method is used to write the boot time in the log
fs.appendFile("/data/logs.txt", "BOOT " + startDate + "-" + startMonth + "-" + startYear + " " + startHour + ":" + startMinute + ":" + startSecond + "\n", function () {
    console.log("Server has been turned on");
});

server.on("request", function (request, response) {
    // implementation of get /
    if (request.url === "/" && request.method === "GET") {
        http.get("http://service2:8080", (res) => {
            var data = "";

            res.on("data", (dataResponse) => {
                data += dataResponse;
            });

            // gets the remote and local address of both service 1 and service 2 (previous implementation of exercise 4)
            res.on("end", () => {
                response.writeHead(200);
                response.write("Service 1\n");
                response.write("Hello from " + request.client.remoteAddress + ":" + request.client.remotePort + "\n" + "to " + request.client.localAddress + ":" + request.client.localPort + "\n");
                response.write(JSON.parse(JSON.stringify(data)));
                response.end();
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    // implementation of post /fibo
    if (request.url === "/fibo" && request.method === "POST") {
        if (runCalculation) {
            var number = "";

            request.on("data", function (data) {
                number += data;
            })

            request.on("end", () => {
                response.writeHead(200);
                if (number < 0)
                    response.write("Error: negative number");
                else if (isNaN(number)) {
                    response.write("Error: not a number");
                }
                else
                    response.write("" + fibo(number));
                response.end();
            });
        } else {
            request.on("data", function () {
                // ignore payload
            })

            request.on("end", () => {
                response.writeHead(200);
                response.write("Interrupted");
                runCalculation = true;
                response.end();
            });
        }
    }

    // implementation of post /stop
    if (request.url === "/stop" && request.method === "POST") {
        request.on("data", function () {
            // ignore payload
        });

        request.on("end", () => {
            runCalculation = false;
            response.end();
        });
    }

    // implementation of get /run-log
    if (request.url === "/run-log" && request.method === "GET") {
        request.on("data", function () {
        });

        request.on("end", () => {
            fs.readFile("/data/logs.txt", { encoding: 'utf-8' }, function (err, data) {
                response.writeHead(200);
                response.write(data);
                response.end();
            });
        });
    }

    // implementation of post /shutdown
    if (request.url === "/shutdown" && request.method === "POST") {
        request.on("data", function () {
            // ignore payload
        });

        request.on("end", () => {
            let endTimestamp = Date.now();

            let endDateObject = new Date(endTimestamp);
            let endDate = endDateObject.getDate();
            let endMonth = endDateObject.getMonth() + 1;
            let endYear = endDateObject.getFullYear();
            let endHour = endDateObject.getHours();
            let endMinute = endDateObject.getMinutes();
            let endSecond = endDateObject.getSeconds();

            // this method is used to write the shutdown time in the log
            fs.appendFile("/data/logs.txt", "SHUTDOWN " + endDate + "-" + endMonth + "-" + endYear + " " + endHour + ":" + endMinute + ":" + endSecond + "\n", function () {
                console.log("Server has been shut down");
            });
            response.end();
            // eslint detects 'process' as undefined but process doesn't require any imports
            // that's why the following line has been used
            // eslint-disable-next-line no-undef
            process.kill(process.pid, 'SIGTERM');
        });
    }
});

function fibo(num) {
    // eslint detects 'BigInt' as undefined but process doesn't require any imports
    // that's why the following line has been used
    // eslint-disable-next-line no-undef
    var a = BigInt(0), b = BigInt(1), temp;

    while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }

    return b;
}

// eslint detects 'process' as undefined but process doesn't require any imports
// that's why the following line has been used
// eslint-disable-next-line no-undef
process.on('SIGTERM', () => {
    server.close();
});

server.listen(port);
console.log("Running on http://localhost:" + port);