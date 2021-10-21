import React from "react";
import PropTypes from 'prop-types';
import { BsFillFileEarmarkExcelFill } from 'react-icons/bs';
import s from './ContactList.module.css'

export default function ContactsList({contacts,onDeleteContact}){
    return(
    <ul className={s.list}>
        {contacts.map(({name,id,number}) => (
        <li key={id} className={s.item}>
            <p className={s.text}>{name}:</p>
            <span>{number}</span>
            <button className={s.button} onClick={()=>onDeleteContact(id)}><BsFillFileEarmarkExcelFill className={s.button} /></button>
        </li>))}   
    </ul>
   )
}

ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
    onDeleteContact: PropTypes.func.isRequired,
  };