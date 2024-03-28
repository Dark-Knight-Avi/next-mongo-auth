import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken';

connect()

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { email, password } = await req.json()

        // Check if anything is not given as input ->
        if (!email) {
            return NextResponse.json({ message: "Email is required!", success: false }, { status: 400 })
        }

        if (!password) {
            return NextResponse.json({ message: "Password is required!", success: false }, { status: 400 })
        }

        // Check if the user really exists ->
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "Unauthorized, please sign up first!", success: false }, { status: 401 })
        }

        // Check if the password is correct ->
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Incorrect password", success: false }, { status: 401 })
        }

        // Create token data ->
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create token ->
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        const response = NextResponse.json({
            message: "Login Successfull!",
            success: true,
        }, { status: 200 })

        // Set the token into the user's cookie ->
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        console.log("Internal error: " + error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}