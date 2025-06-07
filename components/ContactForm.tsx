import React, { useEffect } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Contact } from '../types/contact';

interface ContactFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: ContactInput) => void;
  initialData?: Contact | null;
  showAlert: boolean;
}

export type ContactInput = Omit<Contact, 'id' | 'createdAt'>;

const ContactForm: React.FC<ContactFormProps> = ({
  show,
  onClose,
  onSubmit,
  initialData,
  showAlert,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactInput>();

  const watchEmail = watch('email');
  const watchPhone = watch('phone');
  const watchTelegram = watch('telegram');

  useEffect(() => {
    if (initialData) {
      const { id, createdAt, ...formData } = initialData;
      reset(formData);
    } else {
      reset();
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: ContactInput) => {
    if (!data.email && !data.phone && !data.telegram) {
      return;
    }
    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Редактировать контакт' : 'Добавить контакт'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && <Alert variant="success">Контакт сохранён!</Alert>}
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control {...register('firstName', { required: true })} />
            {errors.firstName && <div className="text-danger">Обязательное поле</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control {...register('lastName', { required: true })} />
            {errors.lastName && <div className="text-danger">Обязательное поле</div>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Отчество</Form.Label>
            <Form.Control {...register('middleName')} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control {...register('email')} type="email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Телефон</Form.Label>
            <Form.Control {...register('phone')} type="tel" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telegram</Form.Label>
            <Form.Control {...register('telegram')} />
          </Form.Group>
          {!watchEmail && !watchPhone && !watchTelegram && (
            <div className="text-danger mb-2">
              Укажите хотя бы один способ связи (email, телефон или Telegram)
            </div>
          )}
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactForm;
