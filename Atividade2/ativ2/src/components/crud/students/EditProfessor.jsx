import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//import { students } from './data.js'

function EditProfessor(props) {

    const [name, setName] = useState("")
    const [university, setUniversity] = useState("")
    const [degree, setDegree] = useState(0)
    const params = useParams()

    //https://pt-br.reactjs.org/docs/hooks-effect.html
    useEffect(
        () => {

            axios.get('http://localhost:3001/professores/' + params.id)
                .then(
                    (res) => {
                        setName(res.data.name)
                        setUniversity(res.data.university)
                        setDegree(res.data.degree)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )

        }
        ,
        [params.id]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedProfessor =
        {
           name,university,degree
        }
        axios.put('http://localhost:3001/professores/' + params.id, updatedProfessor)
            .then(
                res => {
                    //console.log(res.data)
                    //props.history.push('/listStudent');
                    console.log(props)
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <>
            <main>
                <h2>
                    Editar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className="form-control"
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Universidade: </label>
                        <input type="text"
                            className="form-control"
                            value={university ?? ""}
                            name="university"
                            onChange={(event) => { setUniversity(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Titulação: </label>
                        <input type="text"
                            className="form-control"
                            value={degree ?? ""}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Atualizar Professor" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default EditProfessor