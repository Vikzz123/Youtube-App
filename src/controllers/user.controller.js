import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
     //get user details from frontend -> get details from postman
     //validation -> not empty ?
     //check for existing user -> email
     //check for images, avatar
     //upload them to cloudinary, avatar uploaded ?
     //create user object, coz create entry in DB
     //remove password and refresh token from response
     //check for user creation
     //return response


     const { username, email, fullName, password } = req.body; //destructuring 
     //console.log("email :", email);

     if([fullName, email, username, password].some((field) => field?.trim() === "")) {
          throw new ApiError(400,  "All fields are required");
     }
     
     //check for existing user
     const existedUser = await User.findOne({
       $or:[{ email }, {username}]
       });

     if(existedUser) {
          throw new ApiError(409, "User already exists with this email or username");
     }

    // console.log(req.files);


     //check for images, avatar
     const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;  //here it will throw error when we are sending nothing in cover image 
     
    //To handle the error we can check like this 
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
     
     if(!avatarLocalPath) {
          throw new ApiError(400, "Avatar image path is required");
     }

     //upload them to cloudinary, avatar uploaded ?
     const avatar = await uploadOnCloudinary(avatarLocalPath);
     const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // console.log("avatar", avatar); -> not getting avatar

     if(!avatar){
          throw new ApiError(400, "Avatar image is required");  
     }

     //create user object, coz create entry in DB
     const user = await User.create({
          username,
          email,
          fullName,
          password,
          avatar: avatar.url,
          coverImage: coverImage ?.url || ""
     });
                                                                //means we dont want pass and refreshtoken
     const createdUser = await User.findById(user._id).select("-password -refreshToken");
     if(!createdUser) {                                        //here password and refreshtoken wont show in postman console
          throw new ApiError(500, "Something went wrong while registering, User not created");
     }

     return res.status(201).json(
          new ApiResponse(200, createdUser, "User registered successfully")
     );
     
});
export { registerUser };

