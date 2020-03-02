# Interview Scheduler

This application is a calendar for scheduling student interviews. It allows for a student to be scheduled for an interview within time blocks during the day, for 5 days of the week. It connects to an external server, defaulted to localhost:8001 for data. Please see https://github.com/wilwong89/scheduler-dashboard for the backend database that this projects connects to.

## Built with

- [ReactJS](https://vuejs.org/) - Front-end framework
- [Axios](https://github.com/axios/axios) - Promise-based HTTP client
- [SASS](https://sass-lang.com/) - CSS pre-compiler to make styling easier
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database
  Continuous integration platform
- [Jest](https://www.jestjs.io) - JS testing framework
- [Cypress](https://www.cypress.io) - JS end-to-end testing framework

## Setup

Clone this repository and navigate to it, running the standard installation script:

```sh
npm install
```

## Running Webpack Development Server

```sh
npm run start
```

Will start up a development server with hot-reloading in your localhost at port 9000.

## Building for Production Server

```sh
npm run build
```

Will build a production version ready for deployment.

## Running Jest Test Framework

```sh
npm test
```

Runs a total of 41 unit tests currently.

## Running Cypress Test Framework

```sh
npm run cypress
```

To run end-to-end testing

## Known issues / bugs

- See something wrong? Submit and issue and I'll get back to it!

\_To add an issue, start a new one [here.](https://github.com/wilwong89/scheduler/issues)

## Acknowledgements

- Lighthouse labs was an integral part of the development process. They helped to understand and define the necessary steps for the creation of this project.
