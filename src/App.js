import React, { useState, useRef, useEffect } from 'react';
import ShoppingList from './ShoppingList';
import uuidv4 from 'uuid/v4';
import { Col, Row, Button, Container } from 'react-bootstrap';
import './style.css'

const LOCAL_STORAGE_KEY = 'shoppingApp.items'
let items_left;

function App() {
  const [items, setItems] = useState([])
  const itemNameRef = useRef();

  // Load items from local storage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedItems) setItems(storedItems)
  }, [])

  // Save items to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Toggle item checkbox
  function toggleItem(id) {
    const newItems = [...items]
    const item = newItems.find(item => item.id === id) // Find and return item by id
    item.complete = !item.complete
    setItems(newItems)
  }

  // Delete item from items
  function deleteItem(id) {
    const newItems = items.filter(item => {
      return item.id !== id
    })
    setItems(newItems)
  }

  // Delete all items
  function deleteAll(){
    setItems([])
  }

  // Find when enter key is pressed
  function keyPressed(e){
    if(e.keyCode === 13){
      handleAddItem(e);
    }
  }

  // Add item to items array
  function handleAddItem(e) {
    const name = itemNameRef.current.value
    if (name === '') return
    setItems(prevItems => {
      return [...prevItems, { id: uuidv4(), name: name, complete: false }]
    })
    itemNameRef.current.value = null
  }

  if(items.length !== 1 && items.filter(item => !item.complete).length !== 1){
    items_left = "items left";
  }else{
    items_left = "item left";
  }

  return (
    <React.Fragment>
      <div className="div-container">
        <Container>
          <Row>
            <Col>
              <h1>My Shopping List</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <input className="item-input" ref={itemNameRef} type="text" onKeyDown={keyPressed}></input>
              <Button className="list-change-btn add-item-btn" onClick={handleAddItem}>Add Item</Button>
              <Button className="list-change-btn delete-all-btn" onClick={deleteAll}>Delete All</Button>
              <div>{items.filter(item => !item.complete).length} {items_left}</div>
            </Col>
          </Row>
          <Row className="item-container">
            <Col>
              <ShoppingList items={items} toggleItem={toggleItem}
                deleteItem={deleteItem} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default App;
