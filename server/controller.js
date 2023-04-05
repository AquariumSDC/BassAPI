const model = require('./model');

module.exports = {
  getStyles: (req, res) => {
    res.send('getProductStyles');
  },
  getRelated: (req, res) => {
    res.send('getRelatedProducts');
  },
  getOne: (req, res) => {
    res.send('getOneProducts');
  },
  getAll: (req, res) => {
    res.send('getAllProducts');
  },
};
