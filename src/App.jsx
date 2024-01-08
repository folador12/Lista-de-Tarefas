import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { Button, Label, Input, FormGroup, Form, Row, Col } from "reactstrap";

import InsertModal from "./Components/InsertModal/index.jsx";
import TaskCard from "./Components/TaskCard/index.jsx";

import useStorage from "./Hooks/useStorage";

function App() {
  const { tasks, deleteTask } = useStorage();
  const [info, setInfo] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [taskEdit, setTaskEdit] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [filterInfo, setFilterInfo] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleEdit = (editedTask) => {
    setEdit(true);
    setTaskEdit(editedTask);
    setModal(true);
  };

  useEffect(() => {
    let filtered = tasks;

    if (filterInfo.title) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(filterInfo.title.toLowerCase())
      );
    }

    if (filterInfo.description) {
      filtered = filtered.filter((task) =>
        task.description
          .toLowerCase()
          .includes(filterInfo.description.toLowerCase())
      );
    }

    if (filterInfo.startDate) {
      filtered = filtered.filter(
        (task) => new Date(task.date) >= new Date(filterInfo.startDate)
      );
    }

    if (filterInfo.endDate) {
      filtered = filtered.filter(
        (task) => new Date(task.date) <= new Date(filterInfo.endDate)
      );
    }

    setFilteredTasks(filtered);
  }, [filterInfo, tasks]);

  const handleFilter = () => {
    setFilterInfo({
      title: info.title,
      description: info.description,
      startDate: info.startDate,
      endDate: info.endDate,
    });
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div className="container">
        <div className="filter">
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="title">Título da Tarefa</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Título da Tarefa"
                    type="text"
                    onChange={(e) =>
                      setInfo({ ...info, title: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="description">Descrição da Tarefa</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Descrição da Tarefa"
                    type="text"
                    onChange={(e) =>
                      setInfo({ ...info, description: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="startDate">De</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    onChange={(e) =>
                      setInfo({ ...info, startDate: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="endDate">Até</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    onChange={(e) =>
                      setInfo({ ...info, endDate: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="buttons">
          <Button
            color="outline-primary"
            className="me-2"
            onClick={handleFilter}
          >
            Filtrar
          </Button>

          <Button color="outline-success" onClick={() => setModal(true)}>
            Adicionar
          </Button>
        </div>

        <div className="task-cards">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.title}
              task={task}
              onEdit={handleEdit}
              onDelete={(deletedTask) => deleteTask(deletedTask.title)}
            />
          ))}
        </div>
      </div>
      <InsertModal
        open={modal}
        close={() => setModal(!modal)}
        edit={edit}
        taskEdit={taskEdit}
      />
      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
