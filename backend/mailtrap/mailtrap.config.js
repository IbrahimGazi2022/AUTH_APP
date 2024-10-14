import { MailtrapClient } from "mailtrap";

const TOKEN = "a0a538390820e035f4efb863a844c74d";
const endpoint = "send.api.mailtrap.io";

export const client = new MailtrapClient({
    token: TOKEN,
    endpoint: endpoint,
});

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Ibrahim",
};

