import SparkPost from "sparkpost";
const API_KEY = "ab4e5102d9bacf92c4d1e5d5602b018d780cb465";
const client = new SparkPost(API_KEY);

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true,
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "Confirm Email",
      html: `<html>
        <body>
        <p>Testing SparkPost - the world's most awesomest email service!</p>
        <a href="${url}">confirm email</a>
        </body>
        </html>`,
    },
    recipients: [{ address: recipient }],
  });
  console.log(response);
};
