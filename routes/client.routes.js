import express from 'express';
import { register, login, deleteClient, updateClient, getClientById, getClients, setClientAddresses } from '../controllers/client.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => {
    res.send({title: "Logout"})
})

router.get('/', getClients);
router.get('/:clientId', getClientById);
router.put('/:clientId', updateClient);
router.put('/:clientId', setClientAddresses);
router.delete('/:clientId', deleteClient);

export default router;