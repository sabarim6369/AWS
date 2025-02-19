const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { getleadModel } = require('../config/db'); // assuming you already have a lead model
const moment = require('moment');

const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to: to, // Recipient address
      subject: subject, // Subject line
      text: text, // Plain text body
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

cron.schedule('* * * * * ', async () => {
  try {
    const now = moment();

    // Get the Lead model from the correct database
    const Lead = getleadModel(mongoose.connection);

    // Query for leads that have a callback time within 10 minutes
    const leads = await Lead.find({
      callbackTime: { $gt: now.toDate(), $lt: now.add(10, 'minutes').toDate() },
    }).populate('assignedTelecaller', 'email'); // Ensure 'assignedTelecaller' is populated with email

    // Loop through leads and send an email to the assigned telecaller
    for (const lead of leads) {
      if (lead.callbackTime && lead.assignedTelecaller?.email) {
        const telecallerEmail = lead.assignedTelecaller.email;
        const subject = `Upcoming Callback Reminder for Lead: ${lead.name}`;
        const text = `Hello, this is a reminder that the callback time for Lead: ${lead.name} is in less than 10 minutes. Please make sure you are ready to take the call.`;

        // Send email to telecaller
        await sendEmail(telecallerEmail, subject, text);
      } else {
        console.log(`No telecaller assigned or callback time for lead ${lead.name}`);
      }
    }
  } catch (error) {
    console.error('Error checking leads for callback time:', error);
  }
});
