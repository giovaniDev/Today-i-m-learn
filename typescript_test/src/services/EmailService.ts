class EmailService implements IMailService {

    sendEmail({ to, message }: MessageDTO) {
        return (`E-mail enviado de ${to.name} assunto ${message.subject} com a mensagem: ${message.body}`)
    }

}

export default EmailService;