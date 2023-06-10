import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from "reactstrap";

function InsertModal(props) {
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
              <Label for="title">
                  Titulo da Tarefa
              </Label>
              <Input
                  id="title"
                  name="title"
                  placeholder="Titulo da Tarefa"
                  type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label for="title">
                  Descrição da Tarefa
              </Label>
              <Input
                  id="description"
                  name="description"
                  placeholder="Descrição da Tarefa"
                  type="textarea"
              />
            </FormGroup>
            <FormGroup>
              <Label for="data">
                  Data de conclusão
              </Label>
              <Input
                  id="data"
                  name="data"
                  placeholder="Data de conclusão"
                  type="date"
              />
            </FormGroup>
          </Form>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.submit}>
            Adicionar
          </Button>{' '}
          <Button color="secondary" onClick={props.close}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InsertModal;