import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

interface FilterOptions {
  sortOrder: 'newest' | 'oldest';
  filterBy: 'all' | 'email' | 'phone' | 'telegram';
}

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, sortOrder: e.target.value as 'newest' | 'oldest' });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, filterBy: e.target.value as 'all' | 'email' | 'phone' | 'telegram' });
  };

  return (
    <Form className="mb-3">
      <Row>
        <Col md={6}>
          <Form.Group controlId="sortOrder">
            <Form.Label>Сортировка</Form.Label>
            <Form.Select value={filters.sortOrder} onChange={handleSortChange}>
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="filterBy">
            <Form.Label>Фильтр по типу контакта</Form.Label>
            <Form.Select value={filters.filterBy} onChange={handleFilterChange}>
              <option value="all">Все</option>
              <option value="email">Только Email</option>
              <option value="phone">Только Телефон</option>
              <option value="telegram">Только Telegram</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
export type { FilterOptions };
