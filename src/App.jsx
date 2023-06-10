import { Button } from 'reactstrap';
import InsertModal from './Components/InsertModal';
import { useState } from 'react';

function App() {

  const [modal, setModal] = useState(false);


  const handleSubmit = () => {
    window.location.reload();
  };
  return (
    <div className="App">
      <Button color="info" outline onClick={() => setModal(true)}>Adicionar Tarefa</Button>


      <InsertModal open = {modal} close={() => setModal(!modal)} submit={handleSubmit}/>
    </div>
  );
}

export default App;
