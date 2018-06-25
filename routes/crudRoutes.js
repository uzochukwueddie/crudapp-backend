const express = require('express');

const router = express.Router();

const CrudCtrl = require('../controllers/crudCtrl');

router.get('/get-data', CrudCtrl.GetData);
router.get('/read', CrudCtrl.AddDataToDB);
router.get('/item/:id', CrudCtrl.FindItem);

router.post('/date-filter', CrudCtrl.FilterByDate);

router.put('/item/:id', CrudCtrl.updateItem);

router.delete('/delete-item/:id', CrudCtrl.deleteItem);

module.exports = router;
