import React, { Component } from 'react';
import { IoIosPersonAdd } from 'react-icons/io';
import s from './ContactForm.module.css'

export default class ContactForm extends Component{
    state={
    name: '',
    number: ''
    };

      handleChange = event=>{
        const {name,value}=event.currentTarget;
        this.setState({[name]:value})
      };
      handleSubmit = event=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
      };
      reset=()=>{
        this.setState({name: '', number: ''})
      }

    render(){
        const {handleChange,handleSubmit}=this;
        const {name,number}=this.state;

        return(
            <form className={s.form} onSubmit={handleSubmit}>
            <label> 
            <span>Name</span>   
            <input
            type="text"
            name="name"
            value={name}
            onChange = {handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            />
        </label>
        <label> 
            <span>Number</span>
            <input
            type="tel"
            name="number"
            value={number}
            onChange = {handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            />   
        </label>
            <button className={s.button}  type ="submit"><IoIosPersonAdd size ={50}/></button>
    </form>
        );
    }
}
