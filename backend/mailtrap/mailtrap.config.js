import { MailtrapClient } from "mailtrap";

const TOKEN = "a0a538390820e035f4efb863a844c74d";

export const client = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Ibrahim",
};
const recipients = [
    {
        email: "coder.ibrahimgazi@gmail.com",
    }
];

