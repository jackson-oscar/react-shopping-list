import React from 'react'
import './style.css'
import { Row, Col } from 'react-bootstrap'

export default function Item({ item, toggleItem, deleteItem }) {

    function handleItemClick() {
        toggleItem(item.id)
    }

    function handleDeleteClick() {
        deleteItem(item.id)
    }

    return (
        <div>
            <label className="item-label">
                <Row className="item-row">
                    <Col className="col-left">
                        <input type="checkbox" checked={item.complete}
                            onChange={handleItemClick} />
                        <span className="item-name">{item.name}</span>
                    </Col>
                    <Col className="col-right">
                        <button className="item-delete-btn" onClick={handleDeleteClick}>Delete</button>
                    </Col>
                </Row>
            </label>
        </div>
    )
}
