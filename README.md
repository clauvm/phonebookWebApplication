# Phonebook Web Application
Implementation of a phonebook web application using Angular, NodeJs and MySQL

##Getting started
Edit package.json file and change the credentials for cleanData, createDatabase and dropDatabase scripts 

```bash
mysql -u<username> -p<password>
```
Get into the root directory and install all necessary dependencies of the server

```bash
npm install
```

Get into the phonebook directory and install the necessary dependencies to run the UI of the web application

```bash
cd phonebook
npm install
```

## Run
First run:

To run all the web app, get into the root directory and run:
```bash
npm run createDatabase
```
This will create the database, in order to be able to see the preloaded data, run:
```bash
npm run cleanData
```
Then start the server
```bash
npm start
```
<a>http://localhost:3000/</a>

Open another terminal and get into the phonebook directory
```bash
cd phonebook
```
Start the UI
```bash
ng serve --open
```

## Clean data
To reset the database and get the preconfigured data, get into the root directory and run:
```bash
npm run cleanData
```

## Drop database
To drop the database, get into the root directory and run:
```bash
npm run dropDatabase
```

## Test
To run all the tests in the backend go to the root directory and run:
```bash
npm test
```
## License

MIT license.

## Author
[Claudia Vaquera](https://github.com/clauvm)
