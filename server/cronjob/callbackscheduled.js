const cron = require('node-cron');
const mongoose = require('mongoose');
const twilio = require('twilio');
const adminSchema = require("../schema/Adminschema");
const telecallerSchema = require("../schema/telecallerschema");
const leadSchema = require("../schema/leadschema");  
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const superadminDb = mongoose.createConnection(process.env.MONGODB_SUPERADMINURI);

const Admin = superadminDb.model('Admin', adminSchema);

// cron.schedule('* * * * *', async () => {
//     try {
//         const admins = await Admin.find();  

//         for (const admin of admins) {
//             const adminDb = mongoose.createConnection(`${process.env.MONGODB_URIFORCRON}/${admin.databaseName}`);

//             const Telecaller = adminDb.model('Telecaller', telecallerSchema);
//             const TelecallerHistory = adminDb.model('TelecallerHistory', telecallerSchema);  // Assuming history is in telecaller schema

//             const telecallers = await Telecaller.find();

//             for (const telecaller of telecallers) {
//                 // Find the callbackScheduled history item
//                 const callbackScheduled = telecaller.history.find(historyItem => historyItem.callbackScheduled);

//                 if (callbackScheduled && callbackScheduled.callbackTime) {
//                     const callbackTime = new Date(callbackScheduled.callbackTime);
//                     const currentTime = new Date();
//                     const timeDifference = callbackTime - currentTime;
//                 console.log("🤔😍😍😍")
//                     // if (timeDifference > 0 && timeDifference <= 10 * 60 * 1000) {
//                         const lead = await adminDb.model('Lead', leadSchema).findById(callbackScheduled.leadId);
//          console.log(lead)
//                         if (lead) {
//                             const leadNumber = lead.mobilenumber;

//                             await sendWhatsAppMessage(telecaller.number, `Reminder: Please call the lead at ${leadNumber} in less than 10 minutes for the scheduled callback.`);
//                         } else {
//                             console.log('Lead not found for callback scheduled:', callbackScheduled.leadId);
//                         }
//                     // }
//                 }
//             }

//             adminDb.close();
//         }
//     } catch (error) {
//         console.error('Error in cron job:', error);
//     }
// });

const sendWhatsAppMessage = async (number, message) => {
    try {
        await client.messages.create({
            body: message,
            from: 'whatsapp:+14155238886',  // Twilio WhatsApp number
            // to: `whatsapp:+${number}`       // Telecaller number
            to: `whatsapp:+916369012255`       // Telecaller number
        });
        console.log(`WhatsApp message sent to ${number}`);
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};
