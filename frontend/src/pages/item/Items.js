import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Items = () => {

    const [newItemData, setNewItemData] = useState({});
    const [itemsData, setItemsData] = useState([]);

    useEffect(() => {
        showItems();
    }, []);

    async function showItems () {
        console.log('called')
        await axios.get('http://localhost:1337/items', {})
            .then((response) => {
                setItemsData(response.data);
            })
    }

    const onItemSubmit = (e) => {
        e.preventDefault();
        // const formValues = {
        //     name: itemName,
        //     description: itemDescription
        // }
        axios.post('http://localhost:1337/items', newItemData)
            .then((response) => {
                console.log(response);
            })
    };

    return (
        <div className='content'>
            <ItemOuter className='item-page'>
                <form className='cust-form' onSubmit={ onItemSubmit }>
                    <div className='form-group'>
                        <label for='item-name'>Item name: </label>
                        <input className='form-control' type="text" id='item-name' onChange={ (e) => { setNewItemData({ ...newItemData, name: e.target.value }) } } />
                    </div>
                    <div className='form-group'>
                        <label for='item-description'>Item description: </label>
                        <textarea className='form-control' id='item-description' type="text" onChange={ (e) => { setNewItemData({ ...newItemData, description: e.target.value }) } } ></textarea>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
                <ItemList>
                    <table>
                        <thead>
                            <tr>
                                <th>Item name</th>
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
                </ItemList>
            </ItemOuter>
        </div>
    );
}

const ItemOuter = styled.div`
    margin: 2rem 6rem;
    padding: 4rem;
    text-align: left;
`;

const ItemList = styled.div`
    
`;


export default Items;