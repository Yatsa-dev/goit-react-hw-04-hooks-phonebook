import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';


import Container from 'components/Container';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

export default class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  };

deleteContact = (contactId) =>{
  this.setState(({contacts})=>({
    contacts: contacts.filter(contact=>contact.id!==contactId),
  }));
};
addContact = ({ name, number }) =>{
  const{contacts}=this.state;
  const contact = {
    id:uuidv4(),
    name,
    number
  };
  contacts.some(evt => evt.name.toLowerCase() === contact.name.toLowerCase())
  ? alert(`${name} is already in contacts`)
  : this.setState(({contacts})=>({
    contacts:[contact,...contacts]
  }))
};
changeFilter = event =>{
  this.setState({filter:event.currentTarget.value})
};
getVisibleContacts = () =>{
  const {contacts,filter} = this.state;
  const normalizedFilter=filter.toLowerCase();
  return contacts.filter(contact=>
  contact.name.toLowerCase().includes(normalizedFilter));
};
componentDidMount(){
  const contacts = localStorage.getItem('contacts');
  const parseContacts = JSON.parse(contacts);

  if(parseContacts){
    this.setState({contacts:parseContacts});
  }
};
componentDidUpdate(prevProps,prevState){
  const{contacts}=this.state;

if(contacts !== prevState.contacts)
{localStorage.setItem('contacts', JSON.stringify(contacts));}
};

render() {
   const {filter,contacts} = this.state;
    const {addContact,deleteContact,changeFilter,getVisibleContacts} = this;
    const visibleContacts = getVisibleContacts();
   
    return (
    <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact}/>
        <h2>Contacts</h2>
        {contacts.length > 1 && (<Filter value={filter} onChange={changeFilter}/>)}
        {contacts.length > 0 
        ? (<ContactList contacts={visibleContacts} onDeleteContact={deleteContact}/>)
        : (<p>Your phonebook is empty. Please add contact.</p>)}
    </Container>
    );
  }
}

