import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

connect()

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { username, email, password } = await req.json()

        // Check if anything is not given as input ->
        if (!username) {
            return NextResponse.json({ message: "Username is required!", success: false }, { status: 400 })
        }

        if (!email) {
            return NextResponse.json({ message: "Email is required!", success: false }, { status: 400 })
        }

        if (!password) {
            return NextResponse.json({ message: "Password is required!", success: false }, { status: 400 })
        }

        // Check if the user email is already exists ->
        const userWithSameEmail = await User.findOne({ email })
        if (userWithSameEmail) {
            return NextResponse.json({ message: "Email already exists!", success: false }, { status: 400 })
        }

        // Check if the username is already exists ->
        const userWithSameUsername = await User.findOne({ username })
        if (userWithSameUsername) {
            return NextResponse.json({ message: "Username is already used, try with a different one!", success: false }, { status: 400 })
        }
        // Check if the password has atleast 8 characters ->
        if (password.length < 8) {
            return NextResponse.json({ message: 'The Password should be minimum of 8 characters!', success: false }, { status: 400 })
        }

        // User is ready to register -> 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Create a user ->
        const user = new User({
            username,
            email,
            password: hashedPassword,
        })

        // Save the user to the database
        const savedUser = await user.save()

        return NextResponse.json({
            message: "Sign up successfull! Now login to continue...",
            user: savedUser,
            success: true,
            status: 200
        })
    } catch (error: any) {
        console.log("Internal error: " + error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}