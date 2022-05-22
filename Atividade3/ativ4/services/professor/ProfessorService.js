const ProfessorModel = require('../../models/professor/ProfessorModel')

let professor = [
    {_id:0, name:"Jefferson de Carvalho", university: "UFC", degree: "Mestrado"},
    {_id:1, name:"Fulano de Tal", university: "UFC", degree: "Mestrado"},
    {_id:2, name:"Sicrano de Tal", university: "UFC", degree: "Mestrado"},
    {_id:3, name:"Beltrano de Tal", university: "UFC", degree: "Mestrado"}
]
let _id = 4

class ProfessorService {

    static create(data) {
        let professor = new ProfessorModel(
            _id++,
            data.name,
            data.university,
            data.degree)
        professores.push(professor)
        return professor
    }
    static retrieve(_id) {
        for (let i = 0; i < professores.length; i++) {
            if (professores[i]._id == _id) {
                return professores[i]
            }
        }
        return {}
    }
    static update(_id, data) {
        for (let s of professores) {
            if (s._id == _id) {
                s.name = data.name
                s.university = data.university
                s.degree = data.degree
                return s
            }
        }
        return null
    }
    static delete(_id) {
        for (let i = 0; i < professores.length; i++) {
            if (professores[i]._id == _id) {
                professores.splice(i, 1)
                return true
            }
        }
        return false
    }
    static list() {
        return professores
    }

}

module.exports = ProfessorService