import randomstring from 'randomstring';

export const GET = async ({ redirect, session }) => {
  try {
    // Verificar si la sesión está disponible
    if (!session) {
      console.error('Error: session no está disponible en el contexto');
      return new Response('Error: Sesión no disponible', { status: 500 });
    }

    const clientID = import.meta.env.OAUTH_CLIENT_ID;
    const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

    if (!clientID || !clientSecret) {
      console.error('Error: Variables de entorno de OAuth no configuradas');
      return new Response('Error: Configuración de OAuth incompleta', { status: 500 });
    }

    const authBase = 'https://github.com/login/oauth/authorize';
    const state = randomstring.generate(32);
    
    try {
      // Guardar el estado directamente en la sesión
      await session.set('oauth_state', state);
    } catch (sessionError) {
      console.error('Error actualizando la sesión:', sessionError);
      return new Response(`Error en la sesión: ${sessionError.message}`, { status: 500 });
    }

    const authEndpoint = `${authBase}?client_id=${clientID}&scope=repo,user&state=${state}&response_type=code`;

    // Verificar que redirect es una función
    if (typeof redirect !== 'function') {
      console.error('Error: redirect no es una función');
      return new Response('Error: Función de redirección no disponible', { status: 500 });
    }

    return redirect(authEndpoint, 302);
  } catch (error) {
    console.error('Error durante la autenticación:', error);
    return new Response(`Error interno: ${error.message}`, { status: 500 });
  }
};