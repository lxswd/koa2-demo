const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app.use(async (ctx) => {
    if (ctx.url == '/' && ctx.method == 'GET') {
        let html = `
            <h1>koa2 request post demo</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>nickName</p>
                <input name="nickName" /><br/>
                <p>email</p>
                <input name="email" /><br/>
                <button type="submit">submit</button>
            </form>
        `
        ctx.body = html
    } else if(ctx.url == '/' && ctx.method == 'POST'){
        // let postData = await parsePostData(ctx)
        let postData = ctx.request.body
        let req = ctx.request
        ctx.body = {postData,req}
    } else {
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
})

app.listen(3000)
