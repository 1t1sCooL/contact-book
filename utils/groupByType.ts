import { Contact } from '../types/contact';

export type ContactChannel = 'email' | 'phone' | 'telegram' | 'none';

export const getContactChannels = (contact: Contact): ContactChannel[] => {
  const channels: ContactChannel[] = [];
  if (contact.email) channels.push('email');
  if (contact.phone) channels.push('phone');
  if (contact.telegram) channels.push('telegram');
  if (channels.length === 0) channels.push('none');
  return channels;
};

export const groupByChannel = (contacts: Contact[]): Record<ContactChannel, Contact[]> => {
  const groups: Record<ContactChannel, Contact[]> = {
    email: [],
    phone: [],
    telegram: [],
    none: [],
  };

  contacts.forEach((contact) => {
    const channels = getContactChannels(contact);
    channels.forEach((channel) => {
      groups[channel].push(contact);
    });
  });

  return groups;
};
