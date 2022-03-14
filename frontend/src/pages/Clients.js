import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import './../styles/clients.css';
import axios from 'axios';

const Clients = () => {

    const [newClientData, setNewClientData] = useState({});
    const [clientsData, setClientsData] = useState([]);

    useEffect(() => {
        showClients();
    }, []);

    async function showClients () {
        console.log('called')
        await axios.get('http://localhost:1337/clients', {})
            .then((response) => {
                setClientsData(response.data);
            })
    }

    const onClientSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:1337/clients', newClientData)
            .then((response) => {
                console.log(response);
            })
    };

    return (
        <div className='content'>
            <ClientOuter className='client-page'>
                <form className='client-form' onSubmit={ onClientSubmit }>
                    <div className='form-group'>
                        <label>Client name: </label>
                        <input className='form-control' type="text" onChange={ (e) => { setNewClientData({ ...newClientData, name: e.target.value }) } } />
                    </div>
                    <div className='form-group'>
                        <label>Client description: </label>
                        <textarea className='form-control' type="text" onChange={ (e) => { setNewClientData({ ...newClientData, description: e.target.value }) } } ></textarea>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
                <ClientList>
                    <table>
                        <thead>
                            <tr>
                                <th>Client name</th>
                                <th>Description</th>
                                <th>Date added</th>
                            </tr>
                        </thead>
                        <tbody>
                            { clientsData.map((client, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>{ client.name }</td>
                                        <td>{ client.description }</td>
                                        <td>{ client.date }</td>
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>
                </ClientList>
            </ClientOuter>
        </div>
    );
}

const ClientOuter = styled.div`
    margin: 2rem 6rem;
    padding: 4rem;
    text-align: left;
`;

const ClientList = styled.div`
    
`;


export default Clients;