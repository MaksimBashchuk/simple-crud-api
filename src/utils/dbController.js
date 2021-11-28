const { v4: uuidv4 } = require('uuid');

const inMemoryDB = [];

const getAllPersons = () =>
  new Promise((resolve) => {
    resolve(inMemoryDB);
  });

const addPerson = (person) =>
  new Promise((resolve) => {
    const newPerson = {
      id: uuidv4(),
      ...person,
    };
    inMemoryDB.push(newPerson);
    resolve(newPerson);
  });

const getPersonById = (id) =>
  new Promise((resolve) => {
    const person = inMemoryDB.find((item) => item.id === id);
    resolve(person);
  });

const updatePerson = (id, body) =>
  new Promise((resolve) => {
    const personIdx = inMemoryDB.findIndex((item) => item.id === id);
    inMemoryDB[personIdx] = {
      id,
      ...body,
    };
    resolve(inMemoryDB[personIdx]);
  });

const deletePerson = (id) =>
  new Promise((resolve) => {
    const personIdx = inMemoryDB.findIndex((item) => item.id === id);
    inMemoryDB.splice(personIdx, 1);
    resolve();
  });

module.exports = {
  getAllPersons,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
};
