const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const Router = require('koa-router')

let home = new Router()

home.get('/', async (ctx)=> {
    let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
    `
    ctx.body = html
})

let page = new Router()
page.get('/404', async (ctx)=> {
    ctx.body = '404 not found'
}).get('/helloworld', async (ctx)=>{
    ctx.body = 'hello world'
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000,()=>{
    console.log('start at port 3000')
})