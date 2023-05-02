import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl: any = process.env.DATABASE_URL

export const startConnection = async () => {
    try {
        const db = await connect(dbUrl)
    } catch (error) {
        console.error(error);
    }
};