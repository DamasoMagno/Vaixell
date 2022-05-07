import { NextApiRequest, NextApiResponse } from "next";
import { createTransport, SendMailOptions } from "nodemailer";

type ContactProps = {
  name: string;
  email: string;
  team: string;
}

export default async (
  request: NextApiRequest, 
  response: NextApiResponse
) => {
  if(request.method === "POST"){
    const { data } = request.body;
    
    const contact = data as ContactProps;

    try {
      const transporter = createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_SMTP,
          pass: process.env.PASSWORD_SMTP,
        },
      });
  
      const transporterOptions: SendMailOptions = {
        from: contact.email,
        to: process.env.RECEIVER_MAIL_NODEMAILER,
        html: `
          <p>
            Olá, meu nome é ${contact.name}, 
            e gostaria de fazer parte da seleção 
            para entrar no time de ${contact.team}
          </p>
        `,
        subject: contact.name
      }

      await transporter.sendMail(transporterOptions);
  
      return response.status(200).json({});
    } catch (error) {
      return response.status(400).json({ error })
    }

  } else {
    return response.json({
      message: "Hello to Vaixell API"
    })
  }

}