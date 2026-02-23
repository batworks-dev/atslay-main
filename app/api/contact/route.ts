// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, inquiryType, subject, message } = body

    // ✅ Validate required fields
    if (!firstName || !lastName || !email || !inquiryType || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    // ✅ SMTP Transporter for BatWorks Domain (SSL port 465)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // ✅ SSL for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // allows self-signed certificates
      },
    })

    // ✅ Verify transporter connection
    await transporter.verify()

    // ✅ Construct email
    const mailOptions = {
      from: `"BatWorks Contact Form" <${process.env.SMTP_USER}>`,
      to: 'admin@batworks.in',
      replyTo: email,
      subject: `[${inquiryType}] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(to right, #22d3ee, #3b82f6); color: #fff; padding: 20px; text-align: center; }
              .content { padding: 25px; }
              .field { margin-bottom: 18px; }
              .label { font-weight: 600; color: #22d3ee; margin-bottom: 5px; }
              .value { padding: 10px; background: #f9fafb; border-left: 3px solid #22d3ee; border-radius: 4px; }
              .footer { text-align: center; padding: 15px; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
              .badge { display: inline-block; padding: 4px 10px; background: #22d3ee; color: #fff; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
                <p>BatWorks Contact Portal</p>
              </div>
              <div class="content">
                <div class="field"><div class="label">Inquiry Type</div><div class="value"><span class="badge">${inquiryType}</span></div></div>
                <div class="field"><div class="label">Full Name</div><div class="value">${firstName} ${lastName}</div></div>
                <div class="field"><div class="label">Email Address</div><div class="value"><a href="mailto:${email}" style="color:#3b82f6;text-decoration:none">${email}</a></div></div>
                <div class="field"><div class="label">Subject</div><div class="value">${subject}</div></div>
                <div class="field"><div class="label">Message</div><div class="value" style="white-space:pre-wrap;">${message}</div></div>
                <div class="field"><div class="label">Submitted At</div><div class="value">${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</div></div>
              </div>
              <div class="footer">
                <p>This email was sent from the BatWorks contact form.</p>
                <p>Reply directly to this email to respond to the sender.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission
Inquiry Type: ${inquiryType}
Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}
Message:
${message}
Submitted at: ${new Date().toLocaleString()}
      `,
    }

    // ✅ Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: '✅ Email sent successfully!' }, { status: 200 })
  } catch (error: any) {
    console.error('Error sending email:', error)

    // Better error messages
    let errorMessage = 'Failed to send email. Please try again later.'
    if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed — verify SMTP_USER and SMTP_PASSWORD.'
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'SMTP host not found — check SMTP_HOST.'
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Unable to connect to SMTP server — check your port, SSL, or network.'
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
