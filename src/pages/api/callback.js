import { AuthorizationCode } from 'simple-oauth2';

export const GET = async ({ url, request }) => {
  try {
    const code = url.searchParams.get('code');

    if (!code) {
      console.error('Error: Falta el código de autorización');
      return new Response('Error: Código de autorización no recibido', { status: 400 });
    }

    const clientID = import.meta.env.OAUTH_CLIENT_ID;
    const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

    if (!clientID || !clientSecret) {
      console.error('Error: Variables de entorno de OAuth no configuradas');
      return new Response('Error: Configuración de OAuth incompleta', { status: 500 });
    }

    const client = new AuthorizationCode({
      client: {
        id: clientID,
        secret: clientSecret,
      },
      auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize',
      },
    });

    const host = url.origin;
    const tokenParams = {
      code: code,
      redirect_uri: `${host}/api/callback`,
    };

    console.log('Solicitando token con parámetros:', JSON.stringify(tokenParams));
    const tokenResponse = await client.getToken(tokenParams);
    const access_token = tokenResponse.token.access_token;

    const script = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Autenticación Exitosa</title>
        </head>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                console.log("receiveMessage", e);
                // Validar origen
                if (!e.origin.match(/^https?:\\/\\/localhost:[0-9]+$/) && 
                    !e.origin.match(/^https:\\/\\/[a-zA-Z0-9-]+\\.vercel\\.app$/)) {
                  console.log('Origen inválido:', e.origin);
                  return;
                }

                window.opener.postMessage(
                  'authorization:github:success:' + JSON.stringify({
                    provider: 'github',
                    token: '${access_token}',
                  }),
                  e.origin
                );
              }

              window.addEventListener("message", receiveMessage, false);
              
              // Enviar mensaje al opener
              window.opener.postMessage("authorizing:github", "*");
              
              console.log("Autenticación completada. Token recibido.");
            })()
          </script>
          <p>Autenticación exitosa. Esta ventana se cerrará automáticamente...</p>
        </body>
      </html>
    `;

    return new Response(script, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Error durante la autenticación:', error);
    return new Response(JSON.stringify({
      error: 'Error de autenticación',
      details: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};