import User from "../models/user.model.js"
import Message from "../models/message.modal.js"
import { getReceiverSocketId, io } from "../lib/socket.js"

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user_id
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filterUsers)
    } catch (error) {
        console.log("Error in getUserForSideBar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const message = await Message.find({
            $or: [
                { senderId: myId ,receiverId: userToChatId},
                {senderId: userToChatId , receiverId: myId }
            ]
        })

        res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };