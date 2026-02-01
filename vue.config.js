const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, 'dist'),
                    routes: [
                        '/',
                        '/collection',
                        '/thiep-cuoi/1',
                        '/thiep-cuoi/2'
                    ],
                    renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
                        renderAfterDocumentEvent: 'render-event'
                    })
                })
            )
        }
    }
}
