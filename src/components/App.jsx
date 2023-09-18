import { Component } from "react";
import { nanoid } from "nanoid";
import { PhonebookForm } from "./PhonebookForm/PhonebookForm";
import { PhonebookList } from "./PhonebookList/PhonebookList";
import { ContactsFilter } from "./PhonebookFilter/Phonebookfilter";
import { SubTitle, Title } from "./App.styled";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (newContact) => {
    const existingContact = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (existingContact) {
      alert(`Contact "${newContact.name}" already exists in the phonebook.`);
      return;
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
    }));
    alert(`Contact "${newContact.name}"added`);
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) {
      this.setState({ contacts: storedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, name, number, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <Title>Phonebook</Title>
        <PhonebookForm onAdd={this.addContact} />
        <SubTitle>Contacts</SubTitle>
        <ContactsFilter
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />
        <PhonebookList
          contacts={filteredContacts}
          name={name}
          number={number}
          deleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}
