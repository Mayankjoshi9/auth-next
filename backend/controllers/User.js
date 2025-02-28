import User from "../models/user.js";
export const UpdateProfile = async(req, res) => {
    try {
        
        
        const { name, description, birthday, gender } = req.body;
        const id = req.user.id;
        
        
        if(!id){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"
            })
        }

        const updatedUserDetails = await User.findByIdAndUpdate(id,{ name:name,description: description, birthday:birthday,gender:gender},{ new: true });
        updatedUserDetails.password=undefined;
        return res.status(200).json({
            success:true,
            user:updatedUserDetails,
            message:"User updated successfully"
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const GetProfile = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"
            })
        }
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        user.password=undefined;
        return res.status(200).json({
            success:true,
            user:user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
