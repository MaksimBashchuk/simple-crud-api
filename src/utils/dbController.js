const { v4: uuidv4 } = require('uuid');

const inMemoryDB = [];

const getAllPersons = () =>
  new Promise((resolve, reject) => {
    resolve(inMemoryDB);
  });

const addPerson = (person) =>
  new Promise((resolve, reject) => {
    const newPerson = {
      id: uuidv4(),
      ...person,
    };
    inMemoryDB.push(newPerson);
    resolve(newPerson);
  });

const getPersonById = (id) =>
  new Promise((resolve, reject) => {
    const person = inMemoryDB.find((item) => item.id === id);
    resolve(person);
  });

module.exports = {
  getAllPersons,
  addPerson,
  getPersonById,
};
