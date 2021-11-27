const { v4: uuidv4 } = require('uuid');

const inMemoryDB = [];

const getAllPersons = () =>
  new Promise((resolve, reject) => {
    resolve(inMemoryDB);
  });

const addPerson = (person) => {
  const newPerson = {
    id: uuidv4(),
    ...person,
  };
  inMemoryDB.push(newPerson);
  return newPerson;
};

module.exports = {
  getAllPersons,
  addPerson,
};
