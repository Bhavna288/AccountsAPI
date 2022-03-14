import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import SaleItem from '../components/SaleItem';
import axios from 'axios';

const Sales = () => {

    const [newSalesData, setNewSalesData] = useState({});
    const [clientList, setClientList] = useState([]);
    const [showItemComponent, setShowItemComponent] = useState(false);
    const [salesData, setSalesData] = useState([]);
    const [newItem, setNewItem] = useState({});

    useEffect(() => {
        showSales();
        fetchClients();
        setNewSalesData({ ...newSalesData, items: [] });
    }, []);

    // useEffect(() => {
    //     console.log(newSalesData);
    // }, [newSalesData]);

    const showSales = async () => {
        await axios.get('http://localhost:1337/sales', {})
            .then((response) => {
                setSalesData(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const fetchClients = async () => {
        await axios.get('http://localhost:1337/clients', {})
            .then((response) => {
                setClientList(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const saveItem = (item) => {
        setNewSalesData({ ...newSalesData, items: [...newSalesData.items, item] });
        setShowItemComponent(false);
    }

    const onSalesSubmit = (e) => {
        e.preventDefault();
        // const formValues = {
        //     name: itemName,
        //     description: itemDescription
        // }
        axios.post('http://localhost:1337/sales', newSalesData)
            .then((response) => {
                console.log(response);
            })
    };

    return (
        <div className='content'>
            <SalesOuter className='item-page'>
                <form className='item-form' onSubmit={ onSalesSubmit }>
                    <div className='form-group'>
                        <label>Client name: </label>
                        <select onChange={ (e) => { setNewSalesData({ ...newSalesData, client: e.target.value }) } }>
                            { clientList.map((item, index) => {
                                return (
                                    <option key={ index } value={ item._id }>{ item.name }</option>
                                );
                            }) }
                        </select>
                    </div>
                    <Button type="button" onClick={ () => { setShowItemComponent(true); } }>Add item</Button>
                    { showItemComponent && <SaleItem saveItem={ saveItem } /> }
                    <div className='form-group'>
                        <label>Sales description: </label>
                        <textarea className='form-control' type="text" onChange={ (e) => { setNewSalesData({ ...newSalesData, description: e.target.value }) } } ></textarea>
                    </div>
                    { }

                    {/* <div className='form-group'>
                    <label>Sales description: </label>
                    <textarea className='form-control' type="text" onChange={ (e) => { setSalesDescription(e.target.value) } } ></textarea>
                </div> */}
                    <Button type="submit">Submit</Button>
                </form>
                <SalesList>
                    <table>
                        <thead>
                            <tr>
                                <th>Receipt No.</th>
                                <th>Client name</th>
                                <th>Description</th>
                                <th>Sales Items</th>
                                <th>Date added</th>
                            </tr>
                        </thead>
                        <tbody>
                            { salesData.map((sales, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>{ sales.receiptNo }</td>
                                        <td>{ sales.client.name }</td>
                                        <td>{ sales.description }</td>
                                        <td>
                                            { sales.items.map((item, idx) => {
                                                return (
                                                    <div key={ idx }>{ item.itemId.name }</div>
                                                );
                                            }) }
                                        </td>
                                        <td>{ sales.date }</td>
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>
                </SalesList>
            </SalesOuter >
        </div>
    );
}

const SalesOuter = styled.div`
    margin: 2rem 6rem;
    padding: 4rem;
    text-align: left;
`;

const SalesList = styled.div`
    
`;


export default Sales;