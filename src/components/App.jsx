import React, { useState, useEffect,useRef } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')) || []);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  

  const addContact = (name, number) => {
    if (isContactExists(name)) {
      alert(`Contact "${name}" is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const isContactExists = (name) => {
    return contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.wrapperApp}>
      <h1>Phonebook</h1>
      <div className="wrapperForm">
        <ContactForm onAddContact={addContact} contacts={contacts} />
      </div>
      <h2>Contacts</h2>
      <div className="wrapperList">
        <Filter filter={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
      </div>
    </div>
  );
};

