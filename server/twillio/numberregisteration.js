const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const accountSid =process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTHTOKEN;
const client = twilio(accountSid, authToken);

app.post('/add-staff', async (req, res) => {
  const { name, phoneNumber } = req.body; 

  if (!name || !phoneNumber) {
    return res.status(400).json({ message: 'Name and phone number are required.' });
  }

  try {
   
    const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
      phoneNumber,
      friendlyName: `${name}'s number`,
      voiceUrl: 'https://your-backend-url/track-call', 
    });

    res.status(200).json({
      message: 'Staff added and number registered in Twilio.',
      incomingPhoneNumber,
    });
  } catch (error) {
    console.error('Error adding staff:', error);
    res.status(500).json({ message: 'Error adding staff.', error });
  }
});

app.post('/track-call', (req, res) => {
  const callStatus = req.body.CallStatus;
  const from = req.body.From;

  console.log(`Call from ${from} is now ${callStatus}`);

  res.status(200).send('Event received');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
