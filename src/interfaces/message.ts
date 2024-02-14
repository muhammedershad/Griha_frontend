export interface IMessage {
    _id: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt: Date;
}
