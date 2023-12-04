import { connect } from "@/dbconfig/dbconfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { log } from "console";

connect()

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json()
        const { username, email, password } = requestBody

        console.log(requestBody);
        // Do checks
        // If user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        console.log(user);

        return NextResponse.json({ message: "User created successfully", success: true, user }, { status: 201 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}