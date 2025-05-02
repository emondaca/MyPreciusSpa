import { getDatabaseError } from "./database.error.js";
import pg from 'pg';
import format from 'pg-format';
const { Pool } = pg;
const pool = new Pool({   
    host: 'localhost',
    user: 'postgres',
    password: '@EMmc1890',
    database: 'joyas',
    port: 5433,
    allowExitOnIdle: true
    })
    
export const getJoyasTodas = async ( { limits = 'ALL', order_by = "id_ASC", page = 0 }) => {

    let filtros = [];
    if (order_by) {
        const [campo, direccion] = order_by.split("_");
        filtros.push(`ORDER BY ${campo}`);
        filtros.push(` ${direccion}`);
    }
    
    if (limits) filtros.push(`LIMIT ${limits}`);
    if (page) filtros.push(`OFFSET ${limits * page}`);

    let consulta = format("SELECT * FROM inventario");

    let filtro = "";
    if (filtros.length > 0) {
        filtro = filtros.join(" ");
        consulta += ` ${filtro}`;
    };
    console.log(consulta);

    try {
        const { rows } = await pool.query(consulta);
        if (!rows) {
            return ( {message: "Datos no encontrados"} );
        }
        return rows;
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return ( {code, message});
        }
        return ( { message: "internal server error"});
    }
};

export const getJoyasSelected = async ( { precio_max, precio_min, categoria, metal })  => {


    let filtros = [];
    if (precio_max) filtros.push(`precio < ${precio_max}`);
    if (precio_min) filtros.push(`precio > ${precio_min}`);
    if (categoria) filtros.push(`categoria = '${categoria}'`);
    if (metal) filtros.push(`metal = '${metal}'`);

    let consulta = format("SELECT * FROM inventario");

    let filtro = "";
    if (filtros.length > 0) {
        filtro = filtros.join(" AND ");
        consulta += ` WHERE ${filtro}`;
    };
    console.log(consulta);

    try {
        const { rows } = await pool.query(consulta);
        if (!rows) {
            return ( {message: "Datos no encontrados"} );
        }
        return rows;
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return ( {code, message});
        }
        return ( { message: "internal server error"});
        
    }
};
