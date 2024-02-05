import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './filter/filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactsForm } from './Form/ContactsForm';
import { ContactsWrap, Container, PhoneWrap } from './App.styled';

import { useSelector, useDispatch } from 'react-redux';

import { setFilter } from './redux/filter-slice';
import { getFilteredContacts } from './redux/selectors';
import { addContact, deleteContact } from './redux/contacts-slice';

export const App = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const addContacts = newContact => {
    const isContactsExist = contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    );
    if (isContactsExist) {
      Notify.warning(`${newContact.name}: is already in contacts`, {
        width: '400px',
        position: 'center-center',
        timeout: 3000,
        fontSize: '20px',
      });
    } else {
      const action = addContact(newContact);
      dispatch(action);
    }
  };

  const onChangeFilter = event => {
    const { value } = event.currentTarget;
    dispatch(setFilter(value));
  };

  const ondeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <Container>
      <PhoneWrap>
        <h1>Phonebook</h1>
        <ContactsForm addContacts={addContacts} />
      </PhoneWrap>
      <ContactsWrap>
        <h2>Contacts</h2>
        <Filter onChangeFilter={onChangeFilter} />
        <ContactsList contacts={contacts} onDelete={ondeleteContact} />
      </ContactsWrap>
    </Container>
  );
};
