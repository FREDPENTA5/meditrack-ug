const nodemailer = require('nodemailer');
async function test() {
  try {
    console.log('Testing WITHOUT pool...');
    const t = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: 'fredmeghanpenta@gmail.com', pass: 'xqdv dkuv vapu zyor' },
    });
    const info = await t.sendMail({
      from: '"MediTrack Alerts" <fredmeghanpenta@gmail.com>',
      to: 'lnakiregga@gmail.com',
      subject: 'MediTrack Critical Alert',
      html: '<b>test no pool</b>',
    });
    console.log('Email OK:', info.messageId);
  } catch (e) {
    console.error('Email Error:', e.message);
  }
}
test();
