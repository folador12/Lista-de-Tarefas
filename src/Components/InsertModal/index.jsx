import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  Form,
} from "reactstrap";
import { useEffect, useState } from "react";
import useStorage from "../../Hooks/useStorage";

import { toast } from "react-toastify";

function InsertModal(props) {
  const { saveTask, editTask } = useStorage();

  const [info, setInfo] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (props.taskEdit) {
      setInfo({
        title: props.taskEdit.title,
        description: props.taskEdit.description,
        date: props.taskEdit.date,
      });
    }
  }, [props.taskEdit]);

  const verify = (data) => {
    if (data.title === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Campo obrigatório",
      }));
      return false;
    } else if (data.title !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "",
      }));
    }

    if (data.description === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Campo obrigatório",
      }));
      return false;
    } else if (data.description !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "",
      }));
    }

    if (data.date === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Campo obrigatório",
      }));
      return false;
    } else if (data.date !== "") {
      if (
        data.date.split("-")[0] < new Date().getFullYear() ||
        data.date.split("-")[1] < new Date().getMonth() ||
        data.date.split("-")[2] < new Date().getDate()
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date: "Data inválida",
        }));
        return false;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date: "",
        }));
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (verify(info)) {
      if (props.edit) {
        editTask(props.taskEdit.title, info);
        props.close();
        toast.success("Tarefa atualizada com sucesso!");
      } else {
        saveTask(info);
        props.close();
        toast.success("Tarefa adicionada com sucesso!");
      }
    }
  };
  return (
    <div>
      <Modal
        isOpen={props.open}
        toggle={props.close}
        modalTransition={{ timeout: 200 }}
      >
        <ModalHeader toggle={props.close}>Adicionar Tarefa</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Titulo da Tarefa</Label>
              <Input
                id="title"
                name="title"
                defaultValue={props.taskEdit?.title}
                value={info.title}
                placeholder="Titulo da Tarefa"
                invalid={errors.title !== ""}
                type="text"
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
              />
              <div className="text-danger">{errors.title}</div>
            </FormGroup>
            <FormGroup>
              <Label for="title">Descrição da Tarefa</Label>
              <Input
                id="description"
                name="description"
                defaultValue={props.taskEdit?.description}
                value={info.description}
                placeholder="Descrição da Tarefa"
                invalid={errors.description !== ""}
                type="textarea"
                onChange={(e) =>
                  setInfo({ ...info, description: e.target.value })
                }
              />
              <div className="text-danger">{errors.description}</div>
            </FormGroup>
            <FormGroup>
              <Label for="data">Data de conclusão</Label>
              <Input
                id="data"
                name="data"
                defaultValue={props.taskEdit?.date}
                value={info.date}
                placeholder="Data de conclusão"
                invalid={errors.date !== ""}
                type="date"
                onChange={(e) => setInfo({ ...info, date: e.target.value })}
              />
              <div className="text-danger">{errors.date}</div>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            {props.edit ? "Editar" : "Adicionar"}
          </Button>{" "}
          <Button color="secondary" onClick={props.close}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InsertModal;
