const express = require('express')
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.store)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        name: Joi.string().required(),
        whatsapp: Joi.string().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required()
    })
}) , OngController.store)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.store)
routes.delete('/incidents/:id', IncidentController.delete)


module.exports = routes