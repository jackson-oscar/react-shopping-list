import React from 'react'
import Item from './Item'

export default function ShoppingList( { items , toggleItem, deleteItem} ) {
    return (
        items.map(item => {
            return <Item key={ item.id } toggleItem = { toggleItem } 
            deleteItem = { deleteItem } item={ item }/>
        })
    )
}
