require('dotenv').config();
const oracle = require('oracledb');

const config = {
    user: process.env.TASY_USER,
    password: process.env.TASY_PASSWD,
    connectionString: `${process.env.TASY_SERVER}/${process.env.TASY_DB}`,
    poolMin: 10,
    poolMax: 10,
    poolPingInterval: 10,
    autoCommit: true
}

oracle.queueTimeout = 30000;

const pool = oracle.createPool(config)
  .then(pool => {
    console.log('Connected to Oracle (Tasy DB)')
    return pool
  })
  .catch(err => {
    console.log('Oracle Connection', err)
    return err;
  });

module.exports = {
    pool
}