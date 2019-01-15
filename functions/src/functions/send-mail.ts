import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

export function send(snapshot:any, context:any) {

  const user = functions.config().gmail.user;
  const pass = functions.config().gmail.pass;
  const mailTransport = nodemailer.createTransport(`smtps://${user}:${pass}@smtp.gmail.com`);

  const consulta = snapshot.val();

  let interest;
  consulta.interest? interest = consulta.interest : interest = '';

  const mailOptions = {
    from: `"Presupuestos" <presupuestos@quadri.com.ar>`,
    to: "info@quadri.com.ar",
    subject: `Quadri - Consulta ${interest}`,
    text : `${consulta.name} - ${consulta.email} - ${consulta.telephone}\n \n${consulta.query}`
  };

  return mailTransport.sendMail(mailOptions)
  .then(() => {
    console.log('New query sent');
  }).catch(error => {
    console.error('There was an error while sending the email:', error);  
  });
}