import React from 'react';
import { Contact } from '../types/contact';
import { Card, Button } from 'react-bootstrap';

interface Props {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactList: React.FC<Props> = ({ contacts, onEdit, onDelete }) => {
  // Группировка по доступным полям
  const grouped = {
    email: contacts.filter(c => c.email),
    phone: contacts.filter(c => c.phone),
    telegram: contacts.filter(c => c.telegram),
    other: contacts.filter(c => !c.email && !c.phone && !c.telegram),
  };

  const renderGroup = (title: string, list: Contact[]) => {
    if (list.length === 0) return null;

    return (
      <div key={title} className="mb-4">
        <h5 className="mb-3">{title.toUpperCase()}</h5>
        {list.map((contact) => (
          <Card key={contact.id} className="mb-2">
            <Card.Body>
              <Card.Title>
                {contact.lastName} {contact.firstName} {contact.middleName || ''}
              </Card.Title>
              <Card.Text>
                {contact.email && <div><strong>Email:</strong> {contact.email}</div>}
                {contact.phone && <div><strong>Телефон:</strong> {contact.phone}</div>}
                {contact.telegram && <div><strong>Telegram:</strong> {contact.telegram}</div>}
              </Card.Text>
              <div className="d-flex justify-content-end gap-2">
                <Button size="sm" variant="primary" onClick={() => onEdit(contact)}>
                  Редактировать
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(contact.id)}>
                  Удалить
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderGroup('email', grouped.email)}
      {renderGroup('phone', grouped.phone)}
      {renderGroup('telegram', grouped.telegram)}
      {renderGroup('other', grouped.other)}
    </div>
  );
};

export default ContactList;
