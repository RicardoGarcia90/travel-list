import logo from './assets/logoPlanejeAproveite.png';

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <img src={logo} alt="logo planeje e aproveite"></img>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>O que você precisa ou quer fazer em sua viagem?</h3>
    </div>
  );
}

function PackingList() {
  return <div className="list"></div>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>Você tem X itens na sua lista, e concluiu X (X%)</em>
    </footer>
  );
}
