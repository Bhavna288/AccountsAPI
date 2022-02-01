import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const SaleItem = (props) => {

    const [itemList, setItemList] = useState([]);
    const [newItem, setNewItem] = useState({});

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        await axios.get('http://localhost:1337/items', {})
            .then((response) => {
                setItemList(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <div className='form-group'>
                <label>Item: </label>
                <select onChange={ (e) => { setNewItem({ ...newItem, itemId: e.target.value }) } }>
                    { itemList.map((item, index) => {
                        return (
                            <option key={ index } value={ item._id }>{ item.name }</option>
                        );
                    }) }
                </select>
            </div>
            <div className='form-group'>
                <label>Quantity: </label>
                <input className='form-control' type="number" onChange={ (e) => { setNewItem({ ...newItem, quantity: e.target.value }) } } />
            </div>
            <div className='form-group'>
                <label>Unit: </label>
                <select onChange={ (e) => { setNewItem({ ...newItem, unit: e.target.value }) } }>
                    <option value="kg">kg</option>
                    <option value="ltr">ltr</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Price: </label>
                <input className='form-control' type="number" onChange={ (e) => { setNewItem({ ...newItem, price: e.target.value }) } } />
            </div>
            <Button type='button' onClick={ () => { props.saveItem(newItem); } }>Done</Button>
        </div >
    );
}

export default SaleItem;