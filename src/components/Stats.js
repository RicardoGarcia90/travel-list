export default function Stats({ items }) {
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
