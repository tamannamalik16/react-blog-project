
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        name: {
            type: String,
            required: true
        },
}
});

export default mongoose.model("Category", categorySchema);
