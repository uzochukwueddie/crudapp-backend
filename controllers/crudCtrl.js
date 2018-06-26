const loadJsonFile = require('load-json-file'); // Load json file
const Joi = require('joi'); // Schema based validator

const Crud = require('../models/crud');

module.exports = {
  // Function thats gets data from db
  async GetData(req, res, next) {
    const { sortField, sortDir } = req.query; // fields used for sorting data
    await Crud.find({})
      .sort({ [sortField]: sortDir })
      .then(result => {
        res.status(200).json({
          message: 'Data from database',
          result
        });
      })
      .catch(err => res.status(500).json({ message: 'Server error' }));
  },

  // Function to read data from json file
  // and add to db
  // uses load-json-file module to read the data
  async AddDataToDB(req, res) {
    try {
      const data = await loadJsonFile('data.json');
      const oldData = await Crud.find({}).sort({ id: 1 });

      if (data) {
        // Insert data into db
        // If document is deleted from the db, ordered: false
        // allows it to be loaded again without throwing any mongoose schema error
        Crud.insertMany(data, { ordered: false })
          .then(result => {
            if (result.length > 0) {
              res.status(200).json({
                message: 'Data loaded successfully.',
                result,
                oldData
              });
            }
          })
          .catch(err => {
            res.status(500).json({
              message: 'Error occured. Data not loaded.'
            });
          });
      }
    } catch (err) {
      res.status(404).json({
        message: 'File not found'
      });
    }
  },

  // Filter collection by date
  async FilterByDate(req, res) {
    const schema = Joi.object().keys({
      startDate: Joi.date().required(),
      endDate: Joi.date().required()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).json({ message: 'Validation error' });
    }
    const d1 = new Date(req.body.startDate);
    const d2 = new Date(req.body.endDate);

    const start = d1.toLocaleDateString();
    const end = d2.toLocaleDateString();

    Crud.find({ $or: [{ start_date: start }, { end_date: end }] })
      .then(result => {
        res
          .status(200)
          .json({ message: 'Filtered data from database', result });
      })
      .catch(err => res.status(500).json({ message: 'Server error' }));
  },

  // Get 1 item from database
  FindItem(req, res) {
    Crud.findOne({ _id: req.params.id })
      .then(result => {
        res.status(200).json({ message: 'Single item from database', result });
      })
      .catch(err =>
        res.status(500).json({ message: 'Error retrieving item', found: false })
      );
  },

  // Update a document in the database
  updateItem(req, res) {
    const { id } = req.params;
    const schema = Joi.object().keys({
      id: Joi.number().optional(),
      city: Joi.string().optional(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().optional(),
      price: Joi.number().optional(),
      status: Joi.string().optional(),
      color: Joi.string().optional()
    });
    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).json({ message: 'Validation error' });
    }
    const d1 = new Date(req.body.start_date);
    const d2 = new Date(req.body.end_date);

    const start = d1.toLocaleDateString();
    const end = d2.toLocaleDateString();

    const body = {
      id: value.id,
      city: value.city,
      start_date: start,
      end_date: end,
      price: value.price,
      status: value.status,
      color: value.color
    };
    Crud.findOneAndUpdate({ _id: id }, body, { new: true })
      .then(result =>
        res.status(200).json({ message: 'Update Successful', result })
      )
      .catch(err =>
        res.status(500).json({ message: 'Error updating item' || err.message })
      );
  },

  // Delete an item
  deleteItem(req, res) {
    const { id } = req.params;
    Crud.findByIdAndRemove(id)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Could not delete item.' });
        }
        return res.json({ message: 'Item deleted successfully', result });
      })
      .catch(err => {
        res.status(500).json({ message: 'Error deleting item' || err.message });
      });
  }
};
