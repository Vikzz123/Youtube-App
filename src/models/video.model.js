import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
      videoFile:{
            type: String,  //cloudinary url
            required: true
      },
      owner:{
            type:Schema.Types.ObjectId,
            ref:'User'
      },
      title:{
            type: String,
            required: true,
            trim: true,
            index:true
      },
      description:{
            type: String,
            required: true,
            trim: true
      },
      duration:{   //cloudinary se milegi
            type: Number,
            required: true
      },
      views:{
            type: Number,
            default: 0
      },
      isPublished:{
            type: Boolean,
            default: true
      },
},{timestamps:true});

videoSchema.plugin(require('mongooseAggregatePaginate'));

export const Video = mongoose.model('Video', videoSchema);