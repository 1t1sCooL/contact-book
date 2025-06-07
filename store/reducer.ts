import { Contact } from '../types/contact';

export interface State {
  contactList: Contact[];
}

export type Action =
  | { type: 'ADD'; payload: Contact }
  | { type: 'EDIT'; payload: Contact }
  | { type: 'DELETE'; payload: string };

export const initialState: State = {
  contactList: [],
};

export const contactReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD':
      return {
        contactList: [action.payload, ...state.contactList],
      };
    case 'EDIT':
      return {
        contactList: state.contactList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE':
      return {
        contactList: state.contactList.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};
