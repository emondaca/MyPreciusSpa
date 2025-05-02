import express from 'express';
import { getJoyasTodas, getJoyasSelected} from "./consultas.js";
import  cors from 'cors';

const app = express();

app.listen(3000, console.log("app listening on port 3000"));

app.use(express.json());
app.use(cors());

const reportarConsulta = async (req, res, next) => {
    const parametros = req.query;
    const url = req.url
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url} 
    con los parámetros:
    `, parametros)
    next()
}

app
    .route("/joyas")
    
    .get(reportarConsulta, async (req, res) => {
        const queryString = req.query;
        const joyas = await getJoyasTodas(queryString);
        console.log (joyas);
        res.json(joyas);
    });

app
    .route("/joyas/filtros")

    .get(reportarConsulta, async (req, res) => {
        const queryString = req.query;
        const joyas = await getJoyasSelected(queryString);
        res.json(joyas);
    });

