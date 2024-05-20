import { useState } from 'react';
import logo from './assets/logoPlanejeAproveite.png';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList(id) {
    const condirmed = window.confirm(
      'Tem certeza que quer deletar os itens da lista?'
    );
    if (condirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <img src={logo} alt="logo planeje e aproveite"></img>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>O que você precisa fazer antes de viajar?</h3>
      <div className="add-form--inputs">
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>+</button>
      </div>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input');

  if (!items.length) return '';

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Adicionados recentemente</option>
          <option value="description">Ordem alfabética</option>
          <option value="packed">Finalizados por último</option>
        </select>
        <button onClick={onClearList}>Limpar lista</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>
          Adicione na lista o que não pode faltar para realizar sua viagem
        </em>
      </p>
    );

  const numItems = items.length;
  const numPcked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPcked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'Seu checklist está completo! Boa viagem!'
          : `Você tem ${numItems} itens na sua lista, e concluiu ${numPcked} (
        ${percentage}%)`}
      </em>
    </footer>
  );
}
