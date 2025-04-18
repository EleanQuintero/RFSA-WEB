import {AuthorizationCode} from 'simple-oauth2'
import cookie from 'cookie'

export default async function handler(req: { query: { code: any; state: any }; headers: { cookie: any; host: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): any; new(): any } }; send: (arg0: string) => any }){
    try {
        const {code, state} = req.query

        const cookies = cookie.parse(req.headers.cookie || '')
        const expectedState = cookies.oauth_state
        
        if(!state || !expectedState || state !== expectedState){
            return res.status(403).json({error: 'estados no coinciden'})
        }

        const client = new AuthorizationCode({
            client:{
                id: process.env.OAUTH_CLIENT_ID || '',
                secret: process.env.OAUTH_CLIENT_SECRET || '',
            }, 
            auth: {
                tokenHost: 'https://github.com',
                tokenPath: '/login/oauth/access_token',
                authorizePath: '/login/oauth/authorize',
            }
        })

        const tokenParams = {
            code,
            redirect_uri: `https://${req.headers.host}/api/callback`
        }

        const tokenResponse = await client.getToken(tokenParams)
        const access_token = tokenResponse.token.access_token

        const script = `
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage %o", e);
              if (!e.origin.match(/^https:\/\/[^.]+\.vercel\.app$/)) {
                console.log('Invalid origin: %s', e.origin);
                return;
              }
              
              // Enviar mensaje al CMS con el token
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({ 
                  provider: 'github', 
                  token: access_token 
                })}',
                e.origin
              );
            }
            
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })()
        </script>
      `;
      
      return res.send(script);

    } catch (error) {
        console.error('Error durante la autenticación:', error);
    return res.status(500).json({ error: 'Error de autenticación' });
        
    }
}