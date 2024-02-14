export interface Conversation extends Document {
    members: string[];
    _id: string;
}

export interface IMessage {
    _id: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt: Date
}
