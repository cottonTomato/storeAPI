import { connect } from "mongoose";

function connectDB(uri: string) {
    return connect(uri, {
        dbName: "Store",
    });
}

export default connectDB;