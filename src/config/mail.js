export default {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    default: {
        from: 'Equipe Gobarber <noreplay@gobarber.com>'
    }
}



/*export default {
    host: 'smtp.mailtrap.io',
    port: '2525',
    secure: false,
    auth: {
        user: '0f45740b299969',
        pass: 'd36bc17991fc10',
    },
    default: {
        from: 'Equipe Gobarber <noreplay@gobarber.com>'
    }
};*/