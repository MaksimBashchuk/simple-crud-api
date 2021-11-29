# In-memory CRUD API

#### To launch app follow next steps:

1. Download repository
2. Navigate to your newly created folder
3. Run terminal and install all dependencies with `npm i`
4. `npm run start:dev` starts application in development mode
5. `npm run start:prod` starts application in production mode (build all files in `bundle.js` and runs it)

---

### Details:

- Application using **pure Node.js**
- API path `/person`:
  - **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding personId
  - **POST** `/person` is used to create record about new person and store it in database
  - **PUT** `/person/${personId}` is used to update record about existing person (**!IMPORTANT** to update the record, you need to pass the entire object)
  - **DELETE** `/person/${personId}` is used to delete record about existing person from database
- Persons are stored as objects that have following properties:
  - **id** — unique identifier (`string`, `uuid`) generated on server side
  - **name** — person's name (`string`, **required**)
  - **age** — person's age (`number`, **required**)
  - **hobbies** — person's hobbies (`array` of `strings` or empty `array`, **required**)
- Value of port on which application is running stored in `.env` file.
