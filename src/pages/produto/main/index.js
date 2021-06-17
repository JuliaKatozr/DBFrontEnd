import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            mercadoria: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch("https://prova-banco-julia.herokuapp.com/mercadoria")
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { mercadoria } = this.state;
 
        return (
            <div className="produto-list">
                <Link to={`/criarproduto`}> <button type="button" className="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Quantidade Em Estoque</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mercadoria.map((produto, index) => (
                            <tr key={mercadoria.id}> 
                                <th scope="row">{mercadoria.id}</th>
                                <td>{mercadoria.nome}</td>
                                <td>{mercadoria.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{mercadoria.quantidade}</td>
                                <td>{produto.descricao}</td>
                                <td> <Link to={`/produtos/${produto.id}`}> <button type="button" className="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarproduto/${produto.id}`}> <button type="button" className="btn btn-warning">Atualizar</button> </Link> </td>
                                <td> <Link to={`/deletarproduto/${produto.id}`}> <button type="button" className="btn btn-danger">Excluir</button> </Link> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
