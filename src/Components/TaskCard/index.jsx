import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { format, parseISO  } from "date-fns";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);



  return (
    <>
      <Card onClick={toggleModal} style={{ cursor: "pointer" }}>
        <CardBody>
          <CardTitle tag="h5">{task.title}</CardTitle>
          <CardText>{task.description}</CardText>
          <CardText>
            <strong>Data de Conclusão:</strong> {format(parseISO(task.date), "dd/MM/yyyy", { timeZone: "America/Sao_Paulo" })}
          </CardText>
        </CardBody>
      </Card>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{task.title}</ModalHeader>
        <ModalBody>
          <p>{task.description}</p>
          <p>
            <strong>Data de Conclusão:</strong> {format(parseISO(task.date), "dd/MM/yyyy", { timeZone: "America/Sao_Paulo" })}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="outline-primary" onClick={() => onEdit(task)}>
            Editar
          </Button>{" "}
          <Button color="outline-danger" onClick={() => onDelete(task)}>
            Deletar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TaskCard;
