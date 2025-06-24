const signup = require('../models/signup.model');
const Message = require('../models/message.model');

// Render chat UI with all users & messages for selected receiver
exports.getMessages = async (req, res) => {
  const receiverId = req.params.receiverId;
  const senderId = req.user.userId;

  try {
    const allUsers = await signup.find({ _id: { $ne: senderId } }); // exclude self
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    const receiver = await signup.findById(receiverId);

    res.render('chat', {
      messages,
      userId: senderId,
      receiver,
      allUsers
    });
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// API: Send message
exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.user.userId;
    const receiverId = req.params.receiverId;

    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    res.status(200).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// API: Get previous messages via AJAX
exports.getPreviousMessages = async (req, res) => {
  const receiverId = req.params.receiverId;
  const senderId = req.user.userId;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
