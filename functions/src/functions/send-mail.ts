import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

// export function send(snapshot:any, context:any) {
export function send(consulta) {
  console.log(consulta);
  const user = functions.config().gmail.user;
  const pass = functions.config().gmail.pass;
  const mailTransport = nodemailer.createTransport(`smtps://${user}:${pass}@smtp.gmail.com`);

  // const consulta = snapshot.val();

  let interest, subject, text;

  consulta.interest? interest = consulta.interest : interest = '';
  let telephone;
  consulta.telephone? telephone = consulta.telephone : telephone = '';

  if (consulta.purchase) {
    subject = `Compra - ${consulta.name} - ${consulta.email} `;
    text = `${consulta.readablePurchase}\n Total: $${consulta.purchase.price} \n \n ${consulta.query} \n \n ${consulta.name}\n${consulta.email}\n${telephone}`;
  } else {
    subject = `Consulta ${interest + ' '}- ${consulta.name} - ${consulta.email} `;
    text = `${consulta.query}\n \n ${consulta.name}\n${consulta.email}\n${telephone}`
  }

  const mailOptions = {
    from: `"Presupuestos" <presupuestos@quadri.com.ar>`,
    to: "info@quadri.com.ar",
    replyTo: `${consulta.email}`,
    subject: subject,
    text : text
  };

  return mailTransport.sendMail(mailOptions)
  .then(() => {
    console.log('New query sent');
  }).catch(error => {
    console.error('There was an error while sending the email:', error);
  });
}