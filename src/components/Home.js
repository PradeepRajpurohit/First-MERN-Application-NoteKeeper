import React from 'react'
import Note from './Note'


export default function Home(props) {

    return (
        <Note showAlert={props.showAlert}/>
    )
}
