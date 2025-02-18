import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {Client} from "../models/client.model.js";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const register = async (req, res) => {
    //TODO : Send a welcome email to the client.
    //TODO: Handle the token generation.
    //TODO: Handle verify email and phone number.

    const {name, email, phone, password, confirmPassword} = req.body;
    if(!name || !email || !phone || !password || !confirmPassword) {
        return res.status(206).json({success: false, message: "All fields are required"});
    }
    if(password !== confirmPassword) {
        return res.status(400).json({success: false, message: "Password and confirm Password do not match"});
    }

    try{
        const existingClient = await Client.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        });

        if(existingClient && existingClient.isEmailVerified && existingClient.isPhoneVerified) {
            return res.status(400).json({success: false, message: "Client already exists"});
        }

        const token = jwt.sign({ clientId: existingClient._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newClient = new Client({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await newClient.save();

        return res.status(200).json({success: true, message: "Client created successfully"});

    } catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: error.message});
    }
};
export const login = async (req, res) => {
    const {clientLoginEmailOrPhone, password} = req.body;
    if(!password || !clientLoginEmailOrPhone) {
        return res.status(206).json({success: false, message: "All fields are required"});
    }

    try{
        const client = await Client.findOne({
            $or: [
                { email: clientLoginEmailOrPhone },
                { phone: clientLoginEmailOrPhone }
            ]
        });

        if(!client) {
            return res.status(400).json({success: false, message: "Client does not exist"});
        }

        if(!client.isEmailVerified && !client.isPhoneVerified) {
            return res.status(400).json({success: false, message: "Email or phone number not verified"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, client.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign({ clientId: client._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.status(200).json({success: true, message: "Login successful"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};
export const logoutClient = async (req, res) => { };
export const updateClient = async (req, res) => {
    const {clientId} = req.params;
    const {name, email, phone, password} = req.body;
    if(!clientId) {
        return res.status(206).json({success: false, message: "Client ID is required"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        const client = await Client.findByIdAndUpdate(clientId, {
            name,
            email,
            phone,
            hashedPassword
        })
        if (!client) {
            return res.status(404).json({success: false, message: "Client not found"});
        }
        return res.status(200).json({success: true, message: "Client updated successfully"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};
export const deleteClient = async (req, res) => {
    const {clientId} = req.params;
    try{
        const client = await Client.findById(clientId);
        if(!client) {
            return res.status(404).json({success: false, message: "Client not found"});
        }

        await client.delete();

        return res.status(200).json({success: true, message: "Client deleted successfully"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};
export const getClientById = async (req, res) => {
    const {clientId} = req.params;
    try{
        const client = await Client.findById(clientId).select("-password").lean();
        if(!client) {
            return res.status(404).json({success: false, message: "Client not found"});
        }

        return res.status(200).json({success: true, client: client});
    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};
export const getClients = async (req, res) => {
    try{
        const clients = await Client.find().select("-password").lean();
        return res.status(200).json({success: true, clients: clients});
    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};
export const setClientAddresses = async (req, res) => {
    const {clientId} = req.params;
    const {address1, address2, address3} = req.body;

    if(!address1){
        return res.status(206).json({success: false, message: "Address is required"});
    }

    try {
        const client = await Client.findByIdAndUpdate(clientId, {
            address1,
            address2,
            address3
        })

        if (!client) {
            return res.status(404).json({success: false, message: "Client not found"});
        }

        return res.status(200).json({success: true, message: "Client addresses updated successfully"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};