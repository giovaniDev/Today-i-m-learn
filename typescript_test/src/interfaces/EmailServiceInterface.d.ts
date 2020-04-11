declare interface IMailService {
    sendEmail(request: MessageDTO): string;
}

declare interface IMailTo {
    name: string;
    email: string;
}

declare interface IMailMessage {
    subject: string;
    body: string;
    file?: string[];
}

declare interface MessageDTO {
    to: IMailTo;
    message: IMailMessage
}