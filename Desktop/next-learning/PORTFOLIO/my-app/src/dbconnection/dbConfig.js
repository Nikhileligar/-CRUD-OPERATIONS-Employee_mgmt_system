import mongoose from 'mongoose';

export default async function DbConfig () {
    try {
        mongoose.connect("mongodb+srv://newUser:newUser@cluster01.swn9b4m.mongodb.net/");
        const conn = mongoose.connection;
        conn.on('connected', () => {
            console.log('connected succefully');
        });

        conn.on('error',() => {
            console.log('error in connecting to database');
            process.exit();
        })
    } catch (err) {
        throw new Error('error in connecting', err)
    }
}