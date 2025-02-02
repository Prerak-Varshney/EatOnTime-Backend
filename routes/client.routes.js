import express from 'express';
import { register, login, deleteClient, updateClient, getClientById, getClients, setClientAddresses } from '../controllers/client.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update-client/:clientId', updateClient);
router.put('/set-client-addresses/:clientId', setClientAddresses);
router.get('/get-clients', getClients);
router.get('/get-client/:clientId', getClientById);
router.delete('/delete-client/:clientId', deleteClient);

export default router;