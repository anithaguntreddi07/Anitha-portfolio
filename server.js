const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST endpoint to handle form submissions
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Create a transporter using Nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anithaguntreddi07@gmail.com',
            pass: 'Anitha@07'
        }
    });
    
    // Email content
    let mailOptions = {
        from: email,
        to: 'anithaguntreddi07@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send message');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Message sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
