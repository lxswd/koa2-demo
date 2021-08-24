const Koa = require('koa')
const path = require('path')
const content = require('./utils/content')
const mimes = require('./utils/mimes')

const app = new Koa()
const staticPath = './static'

function parseMime(url) {
    let extname = path.extname(url)
    extname = extname?extname.slice(1):'unknown'
    return mimes[extname]
}

app.use(async (ctx)=>{
    let fullStaticPath = path.join(__dirname, staticPath)
    let _content = await content(ctx, fullStaticPath)
    let _mime = parseMime(ctx.url)
    if(_mime) {
        ctx.type = _mime
    }
    if(_mime&&_mime.indexof('image/')>=0){
        //如果是图片，则用node原生res，输出二进制数据
        ctx.res.writeHead()
        ctx.res.write(_content,'binary')
        ctx.res.end()
    }else{
        ctx.body = _content
    }
})

app.listen(3000)