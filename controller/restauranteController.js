const restauranteDAO = require('../DAO/restauranteDAO');

const getRestaurantClientByCpf = async (req, res) => {

    const { nrCpf } = req.params;

    if( !nrCpf ) {
        return res.status(400).json({
            "status": "fail",
            "message": "Parametro cpf não passado"
        })
    }

    const result = await restauranteDAO.getRestaurantClientByCpf(nrCpf);

    if ( result ) {
        return res.status(200).json({
            "status": "success",
            "message": "consulta feita com exito",
            "data": result
        })
    } else {
        return res.status(400).json({
            "status": "fail",
            "message": "erro na consulta em getRestaurantClientByCpf",
            "data": null
        })
    }
}

const insertClientInRestaurant = async (req, res) => {

    const { 
        nrCpf,
        nmCliente,
        nrGramas,
        impDigital
     } = req.body

    //  console.log(req.body);

     if ( !nrCpf || !nmCliente || !nrGramas || !impDigital ) {
        return res.status(400).json({
            "status": "fail",
            "message": "falta de parametros"
        })
     }

     const result = await restauranteDAO.insertClientInRestaurant(nrCpf, nmCliente, nrGramas, impDigital);

     console.log(result);

     if ( result ) {
         return res.status(200).json({
             "status": "success",
             "message": "consulta feita com exito",
             "data": result
         })
     } else {
        return res.status(400).json({
            "status": "fail",
            "message": "erro na consulta em insertClientInRestaurant",
            "data": null
        })
     }
}

module.exports = {
    getRestaurantClientByCpf,
    insertClientInRestaurant
}