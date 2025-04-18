import randomstring from 'randomstring';

export const GET = async ({ redirect, session }) => {
  try {
    const clientID = import.meta.env.OAUTH_CLIENT_ID;
    const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

    const authBase = 'https://github.com/login/oauth/authorize';
    const state = randomstring.generate(32);
    
    // Guardar el estado en la sesión en lugar de una cookie
    await session.update((data) => {
      data.oauth_state = state;
      return data;
    });

    const authEndpoint = `${authBase}?client_id=${clientID}&scope=repo,user&state=${state}&response_type=code`;

    return redirect(authEndpoint, 302);
  } catch (error) {
    console.error('Error durante la autenticación:', error);
    return new Response('Error interno', { status: 500 });
  }
};