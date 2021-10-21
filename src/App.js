/* eslint-disable react-hooks/rules-of-hooks */
import  { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from 'components/Container';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

export default function App ()  {
 const [contacts, useContacts] = useState(()=>{
   return JSON.parse(window.localStorage.getItem('contacts')) ?? [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]});
  const [filter, useFilter] = useState('');
  
  useEffect(()=>{
    window.localStorage.setItem('contacts',JSON.stringify(contacts));
  },[contacts]);

 const deleteContact = (contactId) => {
  useContacts(contacts.filter(contact=>contact.id!==contactId),
    );
  };
 
 const addContact = ({ name, number }) =>{
    const contact = {
      id:uuidv4(),
      name,
      number
    };
    contacts.some(evt => evt.name.toLowerCase() === contact.name.toLowerCase())
    ? alert(`${name} is already in contacts`)
    : useContacts([contact,...contacts]
    )
  };
 const changeFilter = event => {
  useFilter(event.currentTarget.value)
  };

const getVisibleContacts = () =>{
    const normalizedFilter=filter.toLowerCase();
    return contacts.filter(contact=>
    contact.name.toLowerCase().includes(normalizedFilter));
  };

  return(
    <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact}/>
        <h2>Contacts</h2>
        {contacts.length > 1 && (<Filter value={filter} onChange={changeFilter}/>)}
        {contacts.length > 0 
        ? (<ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact}/>)
        : (<p>Your phonebook is empty. Please add contact.</p>)}
    </Container>
  )
}


