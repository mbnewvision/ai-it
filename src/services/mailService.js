import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendEmailTicket(data, user) {
  const subject = `[${data.priorite.toUpperCase()}] ${data.titre_ticket}`;

  const text = `
Utilisateur: ${user}
Problème: ${data.probleme}
Catégorie: ${data.categorie}
Priorité: ${data.priorite}
Description:
${data.description_ticket}
`;

  await transporter.sendMail({
    from: `"IT Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.GLPI_EMAIL,
    subject,
    text
  });
}
