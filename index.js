import express from 'express';
import exphbs from 'express-handlebars';
import * as url from 'url';


const app = express();
app.use(express.json());
//get, post, put, delete, patch
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.set('view engine', 'hbs');

app.use('/views',express.static(__dirname+'/views'))
app.get('/',(req,res)=> res.render('main'));

const port = 8080
app.listen(port, () => {
	console.log(`Servidor corriendo en el puerto ${port}`);
});
