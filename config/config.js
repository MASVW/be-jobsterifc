require('dotenv').config(); // this is important!
module.exports = 
{
  "development": {
    "username": "u917904281_root",
    "password": "#Htd6P#s0",
    "database": "u917904281_cp_project",
    "host": "srv1091.hstgr.io",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "be-jobsterific",
    "database": "be-jobsterific",
    "host": "mysql",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      "socketPath": process.env.DB_HOST
    }
  }
}
