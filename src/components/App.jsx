import React, { useEffect, useState } from "react";
import { Form } from 'components/Form/Form';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';
import css from "./App.module.css";


export function UserForm() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) ?? []);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const newContacts = JSON.parse(contacts);
    newContacts !== null && setContacts(newContacts);
  }, []);
    
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteItem = (id) => {
      const updatedContacts = contacts.filter(contact => contact.id !== id);

      setContacts(updatedContacts);
  };

  const formSubmitData = data => {
      const existingContact = contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase());

      if (existingContact) {
          alert(`${data.name} is already in contacts!`);
          return;
      }

      setContacts(prevContacts => [...prevContacts, data])
  }

  const findContact = evt => {
    setFilter(evt.target.value);
  }

  return(
      <div className={css.form_wrapper}>
          <h2>Phonebook</h2>
          <Form onSubmit={formSubmitData}></Form>                
          <h2>Contacts</h2>
          <Filter filterName={findContact}></Filter>
          <Contacts contacts={contacts} filter={filter} deleteContact={deleteItem}></Contacts>
      </div>
  ); 
};

export default UserForm;