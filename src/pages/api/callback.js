import { AuthorizationCode } from 'simple-oauth2';

export const GET = async ({ url, session, request }) => {
  try {
    // Verificar si la sesión está disponible
    if (!session) {
      console.error('Error: session no está disponible en el contexto');
      return new Response('Error: Sesión no disponible', { status: 500 });
    }

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    if (!code || !state) {
      console.error('Error: Faltan parámetros de OAuth en la URL');
      return new Response('Error: Parámetros de OAuth incompletos', { status: 400 });
    }
    
    // Obtener el estado guardado en la sesión - método correcto
    const expectedState = await session.get('oauth_state');
    console.log('Estado OAuth recuperado:', expectedState);
    
    if (!expectedState) {
      console.error('Error: No se encontró el estado OAuth en la sesión');
      // Obtener todos los datos para depuración
      const allSessionData = {};
      for (const key of await session.keys()) {
        allSessionData[key] = await session.get(key);
      }
      
      return new Response(JSON.stringify({ 
        error: 'estado no encontrado en la sesión',
        sesionData: allSessionData
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (state !== expectedState) {
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

    // Limpiar el estado de la sesión después de usarlo - método correcto
    try {
      await session.delete('oauth_state');
    } catch (sessionError) {
      console.error('Error al eliminar oauth_state de la sesión:', sessionError);
      // Continuamos a pesar del error para no interrumpir el flujo
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

    const tokenParams = {
      code: code,
      redirect_uri: `https://${request.headers.get('host')}/api/callback`,
    };

    console.log('Solicitando token con parámetros:', JSON.stringify(tokenParams));
    const tokenResponse = await client.getToken(tokenParams);
    const access_token = tokenResponse.token.access_token;
    
    // Guardar el token en la sesión para futuros usos - método correcto
    try {
      await session.set('github_token', access_token);
    } catch (sessionError) {
      console.error('Error al guardar el token en la sesión:', sessionError);
      // Continuamos a pesar del error para no interrumpir el flujo
    }

    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage", e);
            if (!e.origin.match(/^https:\\/\\/[a-zA-Z0-9-]+\\.vercel\\.app$/) && 
                !e.origin.match(/^http:\\/\\/localhost:[0-9]+$/)) {
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
          // Intentamos enviar el mensaje inmediatamente y también programamos un envío retrasado
          window.opener.postMessage("authorizing:github", "*");
          
          // Para desarrollo local, permitimos localhost
          console.log("Autenticación completada. Enviando datos al CMS...");
        })()
      </script>
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