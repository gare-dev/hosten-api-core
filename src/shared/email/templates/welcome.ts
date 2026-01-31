interface WelcomeEmailProps {
    username: string;
}

export function welcomeEmailTemplate({ username }: WelcomeEmailProps) {
    return {
        subject: 'Bem-vindo ao Hosten!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bem-vindo</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #4F46E5;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        border-radius: 8px 8px 0 0;
                    }
                    .content {
                        background-color: #f9fafb;
                        padding: 30px;
                        border-radius: 0 0 8px 8px;
                    }
                    .button {
                        display: inline-block;
                        background-color: #4F46E5;
                        color: white;
                        padding: 12px 24px;
                        text-decoration: none;
                        border-radius: 6px;
                        margin-top: 20px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #6b7280;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Bem-vindo ao Hosten!</h1>
                </div>
                <div class="content">
                    <p>Olá, <strong>${username}</strong>!</p>
                    <p>Estamos muito felizes em tê-lo conosco. Sua conta foi criada com sucesso.</p>
                    <p>Agora você pode começar a usar todos os recursos da nossa plataforma.</p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Hosten. Todos os direitos reservados.</p>
                </div>
            </body>
            </html>
        `,
        text: `Olá, ${username}! Bem-vindo ao Hosten. Sua conta foi criada com sucesso.`,
    };
}
