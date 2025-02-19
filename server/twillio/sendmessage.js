const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const twilio = require("twilio");

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload()); 

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const twilioNumber = "whatsapp:+14155238886";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", public_id: `whatsapp_media/${Date.now()}-${fileName}` },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Upload Error:", error); 
                    return reject(new Error("Cloudinary Upload Failed"));
                }
                console.log("Cloudinary Upload Success:", result);  
                resolve(result.secure_url);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

const sendmessage = async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        console.log("Received Files:", req.files);

        const { number, message } = req.body;
        const files = req.files ? (Array.isArray(req.files.files) ? req.files.files : [req.files.files]) : [];

        // Validate input
        if (!number || (!message && files.length === 0)) {
            return res.status(400).json({ error: "Number and message or files are required" });
        }

        const formattedNumber = `whatsapp:+916369012255`;
        let mediaUrls = [];

        for (const file of files) {
            const fileUrl = await uploadToCloudinary(file.data, file.name);
            mediaUrls.push(fileUrl);
        }

        console.log("Media URLs:", mediaUrls);  // Log URLs before sending to Twilio

        // Prepare the message data for text
        const messageData = {
            from: twilioNumber,
            to: formattedNumber,
            body: message || "Media Message",
        };

        // Send the text message
        const response = await client.messages.create(messageData);
        console.log("Twilio Response for Text:", response);  // Log the full Twilio response for text message

        // Send each image separately
        for (let i = 0; i < mediaUrls.length; i++) {
            const mediaMessageData = {
                from: twilioNumber,
                to: formattedNumber,
                body: "Here's an image for you!",  // Optional: change to a custom message for each image
                mediaUrl: [mediaUrls[i]],  // Send one image per message
            };
            const mediaResponse = await client.messages.create(mediaMessageData);
            console.log(`Twilio Response for Image ${i + 1}:`, mediaResponse);  // Log the response for each image
        }

        res.status(200).json({ success: true, messageSid: response.sid });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            error: error.message,
            stack: error.stack,
            twilioError: error.response ? error.response.body : null
        });
    }
};

module.exports = { sendmessage };
