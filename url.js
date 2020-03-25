const storage = require('node-sessionstorage')
const axios = require('axios')
const queryString = require('query-string');

class Users {
    middleware() {
        const router = require('koa-route')
        return [
            router.get('/instagram', function (ctx) {
                const code = ctx.request.query.code
                console.log('start')
                axios({
                    method: 'POST',
                    url: `https://api.instagram.com/oauth/access_token`,
                    data: queryString.stringify({
                        client_id: '1133493423650865',
                        client_secret: 'dd1657b0a5c5485b93fe6d1cd97be8e4',
                        grant_type: 'authorization_code',
                        redirect_uri: `https://127.0.0.1:8050/instagram`,
                        code: code
                    })
                })
                .then(r => {
                    console.log(`oauth ok`)
                    console.log(r.data)
                    return axios({
                        url: `https://graph.instagram.com/${r.data.user_id}?fields=id,username&access_token=${r.data.access_token}`
                    })
                })
                .then(r => {
                    console.log(`graph ok`)
                    console.log(r.data)
                    storage.setItem("instagram_user", JSON.stringify(r.data))
                    ctx.response.redirect('/');

                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                })             
            }),
            router.get('/instagram_user', function (ctx) {
                ctx.response.type = 'json'

                if (storage.getItem("instagram_user")) {
                    ctx.response.body = JSON.parse(storage.getItem("instagram_user"))
                } else {
                    ctx.response.status = 401
                    ctx.response.body = { error: 'User not logged in with instagram' }
                }
            }),
        ]
    }
}

module.exports = Users