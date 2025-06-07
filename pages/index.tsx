import React, { useEffect, useReducer, useState } from 'react';
import Head from 'next/head';
import { Container, Button } from 'react-bootstrap';
import ContactForm, { ContactInput } from '../components/ContactForm';
import ContactList from '../components/ContactList';
import FilterBar, { FilterOptions } from '../components/FilterBar';
import { Contact } from '../types/contact';
import { contactReducer, initialState } from '../store/reducer';
import { v4 as uuidv4 } from 'uuid';
import { deleteContact, getAllContacts, saveContact } from '../utils/db';

const HomePage: React.FC = () => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sortOrder: 'newest',
    filterBy: 'all',
  });

  useEffect(() => {
    getAllContacts().then((contacts) => {
      contacts.forEach((c) => {
        dispatch({ type: 'ADD', payload: c });
      });
    });
  }, []);

  const handleAdd = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  const handleFormSubmit = async (data: ContactInput) => {
    const newContact: Contact = {
      ...data,
      id: editingContact?.id ?? uuidv4(),
      createdAt: editingContact?.createdAt ?? Date.now(),
    };

    dispatch({
      type: editingContact ? 'EDIT' : 'ADD',
      payload: newContact,
    });

    await saveContact(newContact);

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setShowModal(false);
    }, 1500);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    dispatch({ type: 'DELETE', payload: id });
    await deleteContact(id);
  };

  const filteredAndSorted = [...state.contactList]
    .filter((c) => {
      switch (filters.filterBy) {
        case 'email':
          return !!c.email;
        case 'phone':
          return !!c.phone;
        case 'telegram':
          return !!c.telegram;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      return filters.sortOrder === 'newest'
        ? b.createdAt - a.createdAt 
        : a.createdAt - b.createdAt; 
    });

  return (
    <>
      <Head>
        <title>Контактная книжка</title>
      </Head>
      <Container className="py-4">
        <h1 className="mb-4">Контактная книжка</h1>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button onClick={handleAdd}>Добавить</Button>
        </div>

        <FilterBar filters={filters} onChange={setFilters} />

        <ContactList
          contacts={filteredAndSorted}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ContactForm
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleFormSubmit}
          initialData={editingContact}
          showAlert={showAlert}
        />
      </Container>
    </>
  );
};

export default HomePage;
