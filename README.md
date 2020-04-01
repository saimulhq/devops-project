# Instructions for Local Deployment

Step 1: Clone the repository to your Local Machine.

Step 2: To run the project we need to make sure that we are in the root folder of the project, then run the following command:

    cd service2

Step 3: This will naviagate to the directory of service 2. Inside the service 2 directory we need to build the application of service 2 using the following command:

    docker build --tag=service2 .

Step 4: After the image of the service 2 is built we need to navigate back to the root folder of the project using the command:

    cd ..

Step 5: Now we are in the root folder of the project. Finally we can run the following command to run the project:

    docker-compose up --build --abort-on-container-exit

Step 6: After running the command above, we will be able to run the project by using the following urls from postman:

1. GET /:\
   In order to test the existing application, change the method to be "GET" and type in the url:
   <http://localhost:8001/>. Click on send for sending request.\
   \
   Expected Response: Same response as in Exercise 4.

2. POST /fibo:\
   In order to test fibo, change the method to be "POST" and type in the URL:
   <http://localhost:8001/fibo>, also in the body tab select "raw" and type in a number or an alphabet or a negative number as mentioned below. Click on send for sending request.\
   \
   Input: 20\
   Expected Response: 6765\
   \
   Input: a\
   Expected Response: Error: not a number\
   \
   Input: -3\
   Expected Response: Error: negative number

3. POST /stop:\
   In order to test stop,
   \
   a. change the method to be "POST" and type in the URL: <http://localhost:8001/stop>. Click on send for sending request.\
   \
   b. again make a post request to fibo using a number as input.
   \
   \
   Expected Response: Interrupted
4. GET /run-log:\
   In order to test run-log, change the method to be "GET" and type in the URL: <http://localhost:8001/run-log>. Click on send for sending request.\
   \
   Expected Response: Shows the boot and shutdown times of the server-\
    BOOT 1-12-2019 15:10:21\
    SHUTDOWN 1-12-2019 15:11:44\
    BOOT 1-12-2019 15:25:8

\*\*\* Do this at the last, since the following command shutsdown both the containers.

5. POST /shutdown:\
   In order to test shutdown, change the method to be "GET" and type in the URL: <http://localhost:8001/shutdown>. Click on send for sending request.\
   \
   Expected Response: Both the containers are shutdown and the application is not running anymore.
