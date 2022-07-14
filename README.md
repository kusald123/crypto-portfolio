## Design Decisions

### Structure

The source code have been divided into `main` and `services` folders. Main components have been used to refer the business logic and services have been used to perform common functionalities.


### Getting Token Current Prices

For the interaction between REST API and the client have been performed using `http.js` file. Contains common logic for perform REST calls. For this test we only need 'GET' method functionality.

To perform the business logic, `crypto.api.js` file have been created. It contains the base URL's for this test. 

### Reading the CSV

`csv-reader.js` file in the `src/services` folder have been managed the common functionality for read any CSV file. For this test we only need to read the file.

To manage and create the portfolio, `portfolio.js` file has been created in the `src/main` folder.


_Can be extended according to future requirements_
