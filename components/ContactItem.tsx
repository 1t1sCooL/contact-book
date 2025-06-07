import React from 'react';
import { Contact } from '../types/contact';
import { Card, Button } from 'react-bootstrap';

interface ContactItemProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <Card className="mb-2 shadow-sm">
      <Card.Body>
        <Card.Title>
          {contact.lastName} {contact.firstName} {contact.middleName && contact.middleName}
        </Card.Title>
        <Card.Text>
          {contact.email && (
            <>
              <strong>Email:</strong> {contact.email}
              <br />
            </>
          )}
          {contact.phone && (
            <>
              <strong>Телефон:</strong> {contact.phone}
              <br />
            </>
          )}
          {contact.telegram && (
            <>
              <strong>Telegram:</strong> {contact.telegram}
              <br />
            </>
          )}
          <small className="text-muted">
            Добавлен: {new Date(contact.createdAt).toLocaleString()}
          </small>
        </Card.Text>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={onEdit}>
            Редактировать
          </Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            Удалить
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContactItem;