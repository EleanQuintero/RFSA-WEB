import randomstring from 'randomstring';

export const GET = async ({ redirect }) => {
  try {
    const clientID = import.meta.env.OAUTH_CLIENT_ID;
    const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

    const authBase = 'https://github.com/login/oauth/authorize';
    const state = randomstring.generate(32);

    const responseHeaders = new Headers();
    responseHeaders.append('Set-Cookie', `oauth_state=${state}; HttpOnly; Path=/; Max-Age=300`);

    const authEndpoint = `${authBase}?client_id=${clientID}&scope=repo,user&state=${state}&response_type=code`;

    return redirect(authEndpoint, 302, { headers: responseHeaders });

  } catch (error) {
    console.error('Error durante la autenticación:', error);
    return new Response('Error interno', { status: 500 });
  }
};