import { AuthorizationCode } from 'simple-oauth2';

export const GET = async ({ url, session, request }) => {
  try {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    // Obtener el estado guardado en la sesión
    const sessionData = await session.get();
    const expectedState = sessionData.oauth_state;

    if (!state || !expectedState || state !== expectedState) {
      // Para depuración, puedes registrar información adicional
      console.log('Estado recibido:', state);
      console.log('Estado esperado:', expectedState);
      
      return new Response(JSON.stringify({ 
        error: 'estados no coinciden',
        recibido: state,
        esperado: expectedState
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Limpiar el estado de la sesión después de usarlo
    await session.update((data) => {
      delete data.oauth_state;
      return data;
    });

    const client = new AuthorizationCode({
      client: {
        id: import.meta.env.OAUTH_CLIENT_ID || '',
        secret: import.meta.env.OAUTH_CLIENT_SECRET || '',
      },
      auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize',
      },
    });

    const tokenParams = {
      code: code || '',
      redirect_uri: `https://${request.headers.get('host')}/api/callback`,
    };

    const tokenResponse = await client.getToken(tokenParams);
    const access_token = tokenResponse.token.access_token;
    
    // Opcional: guarda el token en la sesión para futuros usos
    await session.update((data) => {
      data.github_token = access_token;
      return data;
    });

    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            if (!e.origin.match(/^https:\\/\\/[a-zA-Z0-9-]+\\.vercel\\.app$/)) {
              console.log('Invalid origin:', e.origin);
              return;
            }

            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({
                provider: 'github',
                token: access_token,
              })}',
              e.origin
            );
          }

          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script>
    `;

    return new Response(script, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Error durante la autenticación:', error);
    return new Response(JSON.stringify({ error: 'Error de autenticación', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};