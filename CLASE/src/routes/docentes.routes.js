const express = require('express')
const docentesController = require('../controllers/docentes.controllers')

const router = express.Router()

router.get('/', docentesController.getAllDocentes)
router.get('/:legajo', docentesController.getDocentesByLegajo)
router.delete('/:legajo', docentesController.deleteDocentesByLegajo)
router.post('/', docentesController.crateDocentes)
router.put('/:legajo', docentesController.updateDocentes )

module.exports = { router}