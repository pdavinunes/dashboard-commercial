import React from 'react';
import './styles.css';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom';


const Home = () => {
    return (<div id="page-home">
        <div className="content">
            <main>
                <h2>Seja Bem vindo ao</h2>
                <h1>
                    Dashboard Commercial
                </h1>
                <p>
                    Ajudamos pequenas empresas a cadastrarem e organizarem seus produtos e lojas.
                </p>

                <Link to="/create-point">
                    <span>
                        <FiLogIn />
                    </span>
                    <strong>
                        Gerencia sua lojas aqui
                    </strong>
                </Link>
                <Link to="/create-point">
                    <span>
                        <FiLogIn />
                    </span>
                    <strong>
                        Gerencia seus produtos aqui
            </strong>
                </Link>
            </main>
        </div>
    </div>
    )
}

export default Home;