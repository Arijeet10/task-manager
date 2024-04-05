import mongoose,{Schema} from "mongoose";

const TaskSchema=new Schema({
    "title":String,
    "description":String,
    "priority":String,
    "category":String
});

const Tassk=mongoose.models.Tassk||mongoose.model("Tassk",TaskSchema);

export default Tassk;



