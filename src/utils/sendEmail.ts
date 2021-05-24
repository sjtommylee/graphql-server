import SparkPost from "sparkpost";
const client = new SparkPost(process.env.SPARKHOST_API_KEY);
export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true,
    },
    content: {
      from: `testing@sparkpostbox.com`,
      subject: "Hello World",
      html: `<html><body><p>Testing SparkPost </p><a href="${url}">confirm email</a></body></html>`,
    },
    recipients: [{ address: recipient }],
  });
  console.log(response);
};
