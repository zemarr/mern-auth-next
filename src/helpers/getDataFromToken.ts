import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        jwt.verify(encodedToken, process.env.JWT_SECRET!);
    } catch (error: any) {
        throw new Error(error.message);

    }
}