import restify from 'restify';
import {lectures} from '../lectureLoader';
import {allRoute} from './all';

export const zoomProxyServer = restify.createServer({
    'name': 'ZoomBot'
})

zoomProxyServer.get('/all', allRoute); 

zoomProxyServer.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    if (!lectures[id]) return next();

    // TODO: Move this to a separate file and implement a view rendering library
    res.sendRaw(200, `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Refresh" content="0; url='${lectures[id].url}'" />
            
            <title>${lectures[id].name}</title>
            <meta property="og:site_name" content="${lectures[id].name}">
        </head>
        <body>
            You should be redirected shortly.
            If not, press <a href="${lectures[id].url}">here</a>
        </body>
    </html>
    `);
})
