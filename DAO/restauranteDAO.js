const daoUtils = require('./DAOUtils');
const oracle = require('oracledb');

const getRestaurantClientByCpf = async (nrCpf) => {
    oracle.fetchAsString = [oracle.CLOB]

    if ( !nrCpf ) {
        console.log('Erro em getClientesRestaurante');
        console.log("nrCpf: ", nrCpf);
        return {}
    }

    const recort = await oracle.getConnection();

    const sql = `select * from daniel.teste where NR_CPF = :nrCpf`

    return await recort.execute(sql, {
        ":nrCpf": { "dir": oracle.BIND_IN, "type": oracle.STRING, "val": nrCpf.toString() }
    },
    {
        outFormat: oracle.OBJECT
    })
    .then(result => {
        return result.rows
    })
    .finally(() => recort.close())
    .catch(err => {
        console.log('Erro em getRestaurantClientByCpf()', err);
        return err;
    })
}

const insertClientInRestaurant = async (nrCpf, nmCliente, nrGramas, impDigital) => {
    if ( !nrCpf || !nmCliente || !nrGramas || !impDigital ) {
        console.log('Erro em insertClientInRestaurant()');
        console.log('falta de parametros');
        return {}
    }

    const insert = await oracle.getConnection();

    const sql = `
    INSERT INTO DANIEL.teste (
        NR_CPF,
        NM_CLIENTE,
        NR_GRAMAS,
        IMP_DIGITAL
    )
    VALUES (
    :nrCpf,
    :nmCliente,
    :nrGramas,
    :impDigital
    )
    `;

    return await insert.execute(sql, {
        ":nrCpf": { "dir": oracle.BIND_IN, "type": oracle.STRING, "val": nrCpf.toString() },
        ":nmCliente": { "dir": oracle.BIND_IN, "type": oracle.STRING, "val": nmCliente.toString() },
        ":nrGramas": { "dir": oracle.BIND_IN, "type": oracle.NUMBER, "val": Number(nrGramas) },
        ":impDigital": { "dir": oracle.BIND_IN, "type": oracle.CLOB, "val": impDigital.toString() },
    },
    {
        autoCommit: true
    })
    .then(result => {
        return result
    })
    .finally(() => insert.close())
    .catch(err => {
        console.log('Erro em insertClientInRestaurant()', err);
        return err;
    })
}

module.exports = {
    getRestaurantClientByCpf,
    insertClientInRestaurant,
}