const { Router } = require('express');
const router = Router();
const restauranteController = require('../controller/restauranteController');

router.get('/getRestaurantClientByCpf/:nrCpf', restauranteController.getRestaurantClientByCpf)
router.post('/insertClientInRestaurant', restauranteController.insertClientInRestaurant)

module.exports = router;