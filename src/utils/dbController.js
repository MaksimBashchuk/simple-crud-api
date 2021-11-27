const inMemoryDB = [];

const getAllPersons = () =>
  new Promise((resolve, reject) => {
    resolve(inMemoryDB);
  });

module.exports = {
  getAllPersons,
};
