require('dotenv').config();
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const clinicNumber = process.env.TWILIO_CLINIC_NUMBER;
console.log('Checking calls to:', clinicNumber);

client.calls.list({ to: clinicNumber, limit: 25 })
  .then(calls => {
    if (!calls.length) {
      console.log('No inbound calls found.');
      return;
    }
    console.log(`\nFound ${calls.length} recent calls:\n`);
    calls.forEach(c => {
      const mins = Math.floor(c.duration / 60);
      const secs = c.duration % 60;
      const dur = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
      const dt = new Date(c.startTime).toLocaleString('en-US', { timeZone: 'America/New_York' });
      console.log(`[${dt} ET] FROM: ${c.from} | STATUS: ${c.status} | DURATION: ${dur} | SID: ${c.sid}`);
    });
  })
  .catch(e => console.error('Error:', e.message));
