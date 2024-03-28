import mongoose from 'mongoose'


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("MongoDB Connected Successfully")
        })
        connection.on('error', (err) => {
            throw new Error(`MongoDB Connection Error: ${err}`)
        })
    } catch (error) {
        console.log('Something went wrong!')
        console.log(error)
    }
}

export { connect }