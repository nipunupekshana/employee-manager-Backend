const {connect,set} = require('mongoose');
const connectDb = async () => {
    set("strictQuery", false);
    const conn = connect(process.env.MONGO_URI);
    conn.then(() => console.log('MongoDB Connected')).catch(err => console.error(err));
}

module.exports = {connectDb};