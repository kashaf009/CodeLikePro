import mongoose, { mongo } from "mongoose"


const courseSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    price:{
        type:String,

    },
    category:{
        type:String,
        require:true,
        enum:{
            values:["web development","mobile development","data science","artificial intelligence","cloud computing","cyber security","agentic ai","other","machine learning","data analysis"],
            message: "{VALUE} is not supported",
        }
    },
    level:{
        type:String,
        enum:{
            values:["beginner","intermediate","advanced"],
             message: "{VALUE} is not supported",
        }
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"
    },
    enrolled:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    thumbnail:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/19/84/25/39/360_F_1984253908_18glU0yV66HGWoiBwV4v7K5x5bEe4JXB.jpg"
    },
    ispublished:{
        type:Boolean,
        default:false
    },
    lectures:{
        type:mongoose.Schema.Types.ObjectId,
        // ref:"lecture"
    },


},{timestamps:true},)


const courseModel = mongoose.model("course", courseSchema)

export default courseModel;