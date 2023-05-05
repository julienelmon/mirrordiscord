import { Router } from "express";
import express, {Request, Response} from 'express';
import { UserModel, User } from '../model/User';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import CircularJSON from 'circular-json'
import bcrypt from 'bcrypt';

const router = Router();

// Authentification //

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user: User | null = await UserModel.findOne({ email });
        if (!user) {
            console.log('user not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch: boolean = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password'})
        }

        const token = jwt.sign({ userId: user.id}, 'secret_key');
        return res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error'});
    }
});

router.post('/register', async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = new UserModel({ email, password });
        await user.save();
        
        const token = jwt.sign({ userId: user.id }, 'secret_key');
        return res.status(201).json({token});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error'});
    }
});

// Update profil

router.put('/changePassword/:id', async (req: Request, res: Response) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const updatePassword = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatePassword)
})

router.put('/changeEmail/:id', async (req: Request, res: Response) => {
    const updateEmail = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updateEmail)
})



// Admin

router.get('/users', async (req: Request, res:Response) => {
    const users = await UserModel.find();
    res.json(users)
})

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)

        if(!user) return res.status(404).json({ message: "User not found"})

        return res.json(user)
    } catch(error) {
        return res.status(500).send(error)
    }
})

// Modify JSON 

router.post('/modifyJSON', async (req: Request, res: Response) => {
    const { json } = req.body;
    const data = CircularJSON.stringify(req.body);
    fs.writeFile("./json/data.json", data, (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Données enregistrées avec succès!");
    });
})


export default router;