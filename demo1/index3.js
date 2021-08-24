const Koa = require('koa')
const app = new Koa()

app.use(async (ctx)=>{
    let url = ctx.url
    let req = ctx.request;

    let req_query = req.query
    let req_querystring = req.querystring

    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})

app.listen(3000,()=>{
    console.log('start at port 3000')
})