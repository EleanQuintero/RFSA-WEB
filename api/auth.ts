import randomstring from 'randomstring'

export default async function handler(_: any, res: { setHeader: (arg0: string, arg1: string) => void; redirect: (arg0: number, arg1: string) => void }){
    const clientID = process.env.OAUTH_CLIENT_ID
    const clientSecret = process.env.OUTH_CLIENT_SECRET

    const authBase = 'https://github.com/login/oauth/authorize'

    const state = randomstring.generate(32)

    res.setHeader('Set-cookie', `oatuh_state=${state}; HttpOnly; Path=/; Max-age=300`)

    const authEndpoint = `${authBase}?client_id=${clientID}&scope=repo,user&state=${state}&response_type=code`

    res.redirect(302, authEndpoint)
}