import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const randomstring = require('randomstring')

export default async function handler(_, res) {
    const clientID = process.env.OAUTH_CLIENT_ID
    const clientSecret = process.env.OUTH_CLIENT_SECRET

    const authBase = 'https://github.com/login/oauth/authorize'

    const state = randomstring.generate(32)

    res.setHeader('Set-cookie', `oatuh_state=${state}; HttpOnly; Path=/; Max-age=300`)

    const authEndpoint = `${authBase}?client_id=${clientID}&scope=repo,user&state=${state}&response_type=code`

    res.redirect(302, authEndpoint)
}