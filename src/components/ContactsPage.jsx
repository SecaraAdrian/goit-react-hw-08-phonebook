import React, { useEffect, useState } from 'react';
import { fetchContacts, addContact, deleteContact } from '../services/api';
import { Box, Button, TextField, List, ListItem, ListItemText, IconButton, Paper, Typography, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook pentru navigare
  const location = useLocation(); // Hook pentru locația curentă

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsData = await fetchContacts();
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching contacts', error);
        setError('Failed to fetch contacts.');
      }
    };

    getContacts();
  }, []);

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone) {
      setError('Both name and phone are required.');
      return;
    }
    
    try {
      const addedContact = await addContact(newContact);
      setContacts((prevContacts) => [...prevContacts, addedContact]);
      setNewContact({ name: '', phone: '' });
      setSuccessMessage('Contact added successfully!');
      setError('');
    } catch (error) {
      console.error('Error adding contact', error);
      setError('Failed to add contact.');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact', error);
      setError('Failed to delete contact.');
    }
  };

  const handleBack = () => {
    // Verificăm dacă există o istorie de navigare pentru a ne întoarce
    if (location.key !== 'default') {
      navigate(-1); // Navigăm înapoi la pagina anterioară
    } else {
      navigate('/auth'); // Dacă nu există istorie, navigăm la pagina de autentificare
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>
          My Contacts
        </Typography>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          label="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <IconButton color="primary" onClick={handleAddContact} sx={{ marginLeft: 2 }}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteContact(contact.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${contact.name}: ${contact.phone}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ContactsPage;
