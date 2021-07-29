import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
import * as axios from '../../utils/axiosApi'

const DeleteTournaments = (props) => {
  const handleClose = () => props.onHide(false);
  const onHandleDelete = () => {
    const url = `tournaments/${props.tournament.id}.json`
    axios.request(url, {}, "DELETE").then(res => {
      return res
    })
    props.getData()
    props.onHide(false)
  }

  useEffect(() => {
    props.getData()
  })

  return (
    <Modal show={props.show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {props.tournament.attributes.name} {props.tournament.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure? you want to delete this tournaments?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onHandleDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteTournaments
