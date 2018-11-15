const { consultarBD } = require('../config/connection');

module.exports = (app) => {
  app.get('/api/estados', async (req, res) => {
      await consultarBD(
      'SELECT * FROM estados ' ,[],res);
  }); 

};