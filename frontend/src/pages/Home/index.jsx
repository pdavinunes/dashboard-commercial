import React from 'react';
import './styles.css';
import { FaStoreAlt, FaBoxes } from 'react-icons/fa'
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

                <Link to="/stores">
                    <span>
                        <FaStoreAlt />
                    </span>
                    <strong>
                        Gerencia sua lojas aqui
                    </strong>
                </Link>
                <Link to="/products">
                    <span>
                        <FaBoxes />
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