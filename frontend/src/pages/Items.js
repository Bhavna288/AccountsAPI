import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Items = () => {

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
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
        <ItemOuter className='item-page'>
            <form className='item-form' onSubmit={ onItemSubmit }>
                <div className='form-group'>
                    <label>Item name: </label>
                    <input className='form-control' type="text" onChange={ (e) => { setItemName(e.target.value) } } />
                </div>
                <div className='form-group'>
                    <label>Item description: </label>
                    <textarea className='form-control' type="text" onChange={ (e) => { setItemDescription(e.target.value) } } ></textarea>
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
    );
}

const ItemOuter = styled.div`
    margin: 2rem 6rem;
    padding: 4rem;
    text-align: left;
`;

const ItemList = styled.div`
    
`;


export default Item;