const MOCK_REPLIES = [
    {
        id: "hi",
        text: "Good day 😁, I'm your personal assistant for finding clothes. Please use /find to search for clothes.",
    },
    {
        id: "hello",
        text: "Good day 😁, I'm your personal assistant for finding clothes. Please use /find to search for clothes.",
    },
    {
        id: "bye",
        text: "Goodbye! 😢, hope you have a great day!",
    },
    {
        id: "goodbye",
        text: "Goodbye! 😢, hope you have a great day!"
    },
       
];

export function replyToFindCommand(message) {
    return MOCK_REPLIES.find(reply => {
        return message.trim() === reply.id;
    })?.text || `Hello, I'm sorry I don't understand your request "${message}". Can you please repeat your request?`;
}