const docentes = require('../../datos/docentes.json')

const getAllDocentes = (req, res)=>{
    res.json( docentes ).status(200)
}

const getDocentesByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const resultado = docentes.find( docentes => docentes.legajo == legajo)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El docente con legajo ${legajo} no fue encontrado`} )
    }
}

const deleteDocentesByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const indice = docentes.findIndex( docentes => docentes.legajo == legajo )
    if(indice==-1) {
        res.status(404).
        json(
            {
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    } else {
        const docentes = docentes[indice];
        const resultado = docentes.splice(indice,1)
        res.status(200)
        .json(
            {resultado: "La operación de borrado pudo realizarse con exito",
                  docentes: docentes
            }
        )
    }
}

const crateDocentes = (req, res) => {
    const docentesData = req.body
    const existe = docentes.find(docentes => docentes.legajo == docentesData.legajo)
    if (!existe) {
        if( ! docentesData.concursado)
            docentesData.concursado = false
    
        if (!docentesData.nombre) {
            res.status(400).json({mensaje: `No puedo generar el docente con legajo ${docentesData.legajo} por no tener nombre`})    
        } else  {
            docentes.push(docentesData)
            res.status(201).json({mensaje: `El docente con legajo ${docentesData.legajo} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El docente con legajo ${docentesData.legajo} ya existe en la base de datos`})
    }
}

const updateDocentes = (req, res)=>{
    const legajo = req.params.legajo  //Path Parameter
    const docentesData = req.body //Body
    const indice = docentes.findIndex(docentes => docentes.legajo == legajo)
    if ( indice >= 0 ) {
        docentes[indice].nombre = docentesData.nombre
        if (docentesData.concursado!==undefined) {
            docentes[indice].concursado = docentesData.concursado 
        }
        res.status(201).json({"docente": docentes[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    }
}

module.exports = { 
    getAllDocentes, 
    getDocentesByLegajo,
    deleteDocentesByLegajo,
    crateDocentes,
    updateDocentes
}