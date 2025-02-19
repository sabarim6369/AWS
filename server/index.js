const express = require('express');
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');

const session = require('express-session');
const mongoose=require("mongoose")
const { getDatabaseConnection } = require('./config/db');

const adminrouter = require('./routers/adminRoutes');
const superadminrouter = require('./routers/superadminRoute');
const telecallerroute = require('./routers/telecallerRoutes');
const twilliorouter=require("./routers/twillio")
// require("./cronjob/mail")
const app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(fileUpload()); // Handle file uploads
app.use((req, res, next) => {
  const { database } = req.headers; 
  if (!database) {
    return res.status(400).json({ message: 'Database name is required in headers.' });
  }

  try {
    console.log(database)
    req.db = getDatabaseConnection(database)
    next();
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ message: 'Database connection error.' });
  }
});






app.use('/api/superadmin', superadminrouter);
app.use('/api/admin', adminrouter);
app.use('/api/telecaller', telecallerroute);
app.use("/api/twillio",twilliorouter);

require("./cronjob/callbackscheduled")
app.listen(8000, "0.0.0.0", () => {
  console.log("Server running on port 8000");
});




// const express = require('express');
// const twilio = require('twilio');
// const mongoose = require('mongoose');
// require("dotenv").config();
// mongoose.connect(process.env.MONGODB_URI).then(console.log("connection successful")).catch((err)=>{
//   console.log("error",err)
// })
// const mongodbUri = process.env.MONGODB_URI.replace(
//   "superadmin",
//   process.env.DATABASE_NAME
// );
// process.env.MONGODB_URI = mongodbUri;


// const callSchema = new mongoose.Schema({
//   callSid: String,
//   fromNumber: String,
//   toNumber: String,
//   status: String,
//   direction: String,
//   startTime: { type: Date },
//   speakingStartedTime: { type: Date }, 
//   endTime: { type: Date },  
//   durationInSeconds: { type: Number },
//   timestamp: { type: Date, default: Date.now }
// });

// const CallHistory = mongoose.model('CallHistory', callSchema);

// const accountSid =process.env.TWILLIO_ACCOUNT_SID
// const authToken = process.env.TWILLIO_AUTHTOKEN;  
// const client = twilio(accountSid, authToken);

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
// const initiateOutgoingCall = async (telecallerPhoneNumber, leadPhoneNumber) => {
//   try {
//     const startTime = new Date(); 
//     const call = await client.calls.create({
//       url: 'https://a957-103-183-240-250.ngrok-free.app/voice.xml', 
//       to: leadPhoneNumber,
//       from: telecallerPhoneNumber, 
//       statusCallback: 'https://a957-103-183-240-250.ngrok-free.app/call-status', 
//       statusCallbackEvent: ['initiated', 'in-progress', 'completed', 'busy', 'failed']
//     });

//     const callHistory = new CallHistory({
//       callSid: call.sid,
//       fromNumber: telecallerPhoneNumber,
//       toNumber: leadPhoneNumber,
//       status: 'initiated', 
//       direction: 'outgoing',
//       startTime: startTime,
//     });
//     await callHistory.save();

//     console.log('Call initiated and history saved');
//   } catch (error) {
//     console.error('Error initiating outgoing call:', error);
//   }
// };

// app.post('/telecaller-call', async (req, res) => {
//   const { telecallerPhoneNumber, leadPhoneNumber } = req.body;
// console.log(req.body)
//   await initiateOutgoingCall(telecallerPhoneNumber, leadPhoneNumber);
//   res.status(200).json({ message: 'Call initiated and logged automatically' });
// });

// app.post('/call-status', async (req, res) => {
//   console.log("Request Body:", req.body); 

//   const { CallSid, CallStatus, StartTime } = req.body;

//   try {
//     const call = await CallHistory.findOne({ callSid: CallSid });

//     if (call) {
//       call.status = CallStatus;

//       if (CallStatus === 'in-progress') {
//         const speakingStartedTime = new Date(); 
//         call.speakingStartedTime = speakingStartedTime;

//         console.log(`Call ${CallSid} is in-progress. Speaking started at ${speakingStartedTime}`);
//       }

//       if (CallStatus === 'completed') {
//         const endTime = new Date(); 
//         call.endTime = endTime;

//         const durationInSeconds = Math.floor((endTime - call.startTime) / 1000);
//         call.durationInSeconds = durationInSeconds;

//         console.log(`Call ${CallSid} ended. Duration: ${durationInSeconds} seconds`);
//       }

//       await call.save();
//       console.log(`Call ${CallSid} updated to status: ${CallStatus}`);
//     }

//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error updating call status:', error);
//     res.status(500).send('Error updating status');
//   }
// });

// app.listen(8000, () => {
//   console.log('Server running on http://localhost:8000');
// });
