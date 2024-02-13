export interface IMessage {
    conversationId: string;
    sender: string;
    text: string;
    _id?: string;
    createdAt: Date;
}
