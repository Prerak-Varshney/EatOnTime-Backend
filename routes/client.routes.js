import express from 'express';
import { register, login, deleteClient, updateClient, getClientById, getClients } from '../controllers/client.controller.js';
const router = express.Router();

//Create client
//Update client details
//Delete client
//Get client by id
//Get all clients

router.post('/register', register);
router.post('/login', login);
router.put('/update-client/:clientId', updateClient);
router.delete('/delete-client/:clientId', deleteClient);
router.get('/get-client/:clientId', getClientById);

export default router;