import { connect } from "@/dbconfig/dbconfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { log } from "console";
import jwt from 'jsonwebtoken'

connect()

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json()
        const { username, email, password } = requestBody

        console.log(requestBody);
        // Do checks
        // If user already exists
        const existingUser = await User.findOne({ email }) || User.findOne({ username })
        if (!existingUser) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        // If user already exists
        const matchedPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchedPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        // Create token data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "Sign in successful",
            success: true,
            existingUser
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}