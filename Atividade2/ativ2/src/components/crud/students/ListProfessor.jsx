import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ProfessorTableRow from "./ProfessorTableRow";
//import { students } from './data.js'

function ListProfessor() {

    const [professores, setProfessores] = useState([])

    useEffect(
        () => {
            axios.get("http://localhost:3001/professores")
                .then(
                    (res) => {
                        setProfessores(res.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )
        }
        ,
        []
    )

    function generateTable() {

        if (!professores) return
        return professores.map(
            (professor, i) => {
                return <ProfessorTableRow professor={professor} key={i} />
            }
        )
    }

    return (
        <>
            <main>
                <h2>
                    List Professor
                </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Universidade</th>
                            <th>Titulação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListProfessor