import { useState } from 'react';

export default function Form({ onAddItems }) {
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
