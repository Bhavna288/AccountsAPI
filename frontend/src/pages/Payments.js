import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Payments = () => {

    const [newPaymentData, setNewPaymentData] = useState({});
    const [itemsData, setPaymentsData] = useState([]);

    useEffect(() => {
        showPayments();
    }, []);

    async function showPayments () {
        console.log('called')
        await axios.get('http://localhost:1337/items', {})
            .then((response) => {
                setPaymentsData(response.data);
            })
    }

    const onPaymentSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            name: itemName,
            description: itemDescription
        }
        axios.post('http://localhost:1337/items', formValues)
            .then((response) => {
                console.log(response);
            })
    };

    return (
        <PaymentOuter className='item-page'>
            <form className='item-form' onSubmit={ onPaymentSubmit }>
                <div className='form-group'>
                    <label>Client name: </label>
                    <input className='form-control' type="text" onChange={ (e) => { setNewPaymentData({ ...newPaymentData, client: e.target.value }) } } />
                </div>
                <div className='form-group'>
                    <label>Payment description: </label>
                    <textarea className='form-control' type="text" onChange={ (e) => { setPaymentDescription(e.target.value) } } ></textarea>
                </div>
                <Button type="submit">Submit</Button>
            </form>
            <PaymentList>
                <table>
                    <thead>
                        <tr>
                            <th>Payment name</th>
                            <th>Description</th>
                            <th>Date added</th>
                        </tr>
                    </thead>
                    <tbody>
                        { itemsData.map((item, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{ item.name }</td>
                                    <td>{ item.description }</td>
                                    <td>{ item.date }</td>
                                </tr>
                            );
                        }) }
                    </tbody>
                </table>
            </PaymentList>
        </PaymentOuter>
    );
}

const PaymentOuter = styled.div`
    margin: 2rem 6rem;
    padding: 4rem;
    text-align: left;
`;

const PaymentList = styled.div`
    
`;


export default Payment;