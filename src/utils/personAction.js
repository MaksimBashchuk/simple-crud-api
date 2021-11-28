const { v4: uuidv4 } = require('uuid');

const inMemoryDB = [];

const findAll = () =>
  new Promise((resolve) => {
    resolve(inMemoryDB);
  });

const create = (person) =>
  new Promise((resolve) => {
    const newPerson = {
      id: uuidv4(),
      ...person,
    };
    inMemoryDB.push(newPerson);
    resolve(newPerson);
  });

const getById = (id) =>
  new Promise((resolve) => {
    const person = inMemoryDB.find((item) => item.id === id);
    resolve(person);
  });

const update = (id, body) =>
  new Promise((resolve) => {
    const personIdx = inMemoryDB.findIndex((item) => item.id === id);
    inMemoryDB[personIdx] = {
      id,
      ...body,
    };
    resolve(inMemoryDB[personIdx]);
  });

const deleteById = (id) =>
  new Promise((resolve) => {
    const personIdx = inMemoryDB.findIndex((item) => item.id === id);
    inMemoryDB.splice(personIdx, 1);
    resolve();
  });

module.exports = {
  findAll,
  create,
  getById,
  update,
  deleteById,
};
