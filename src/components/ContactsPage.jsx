import React, { useEffect, useState } from 'react';
import { fetchContacts, addContact, deleteContact } from '../services/api';
import { Box, Button, TextField, List, ListItem, ListItemText, IconButton, Paper, Typography, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [error, setError] = useState(''); // Stare pentru erori
  const [successMessage, setSuccessMessage] = useState(''); // Stare pentru mesaje de succes

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
      const addedContact = await addContact(newContact); // Trimitere cerere API
      setContacts((prevContacts) => [...prevContacts, addedContact]);
      setNewContact({ name: '', phone: '' }); // Resetare formular după adăugare
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

  return (
    <Paper elevation={3} sx={{ padding: 4, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Contacts
      </Typography>
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
