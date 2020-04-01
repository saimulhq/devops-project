FROM service1

COPY test.js .

COPY runtest.sh .

RUN chmod +x ./runtest.sh

RUN npm install -g mocha

RUN npm install request --save

CMD ["./runtest.sh"]
