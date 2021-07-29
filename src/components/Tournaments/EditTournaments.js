import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as axios from '../../utils/axiosApi'


const EditTournaments = () => {
  const history = useHistory()
  let { id } = useParams()
  const urlEdit = `tournaments/${id}.json`

  const [newEdit, setNewEdit] = useState({})

  if (!newEdit.hasOwnProperty('data')) {
    axios.request(urlEdit, {}, "GET").then(res => {
      return setNewEdit({ ...newEdit, data: res })
    })
  }

  const onHandleChange = (e) => {
    const { value, name } = e.target
    newEdit.data.attributes[name] = value
    setNewEdit(newEdit)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    newEdit.data.attributes.tournament_type = newEdit.data.attributes.tournamentType
    delete newEdit.data.attributes.tournamentType
    axios.request(urlEdit, newEdit, "PUT").then(res => {
      return res
    })
    history.push('/')
  }

  return (
    <>
      {newEdit.hasOwnProperty('data') ?

        <Form onSubmit={onHandleSubmit}>
          <br></br>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Tournament Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" defaultValue={newEdit.data.attributes.name} placeholder="Tournament Name" name="name" onChange={onHandleChange} required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              URL
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="" name="url" value={newEdit.data.id} onChange={onHandleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control as="textarea" rows={3} style={{ resize: 'none' }} defaultValue={newEdit.data.attributes.description} name="description" onChange={onHandleChange} required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" >
            <Form.Label column sm="2">
              Game
            </Form.Label>
            <Col sm="10">
              <Form.Select onChange={onHandleChange} name="game" aria-required>
                <option value="mobile_legends" >Select Game</option>
                <option value="mobile_legends">Mobile Legends</option>
                <option value="call_of_duty_mobile">Call of Duty Mobile</option>
                <option value="lol_wildrift">Lol Wildrift</option>
                <option value="pubg_mobile">Pubg Mobile</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Type
            </Form.Label>
            <Col sm={10}>
              <Form.Select onChange={onHandleChange} name="tournamentType" defaultValue={newEdit.data.attributes.tournamentType}>
                <option value="mobile_legends">Select Type</option>
                <option value="single elimination">Single Stage Tournament</option>
                <option value="double elimination">Two Stage Tournament — groups compete separately, winners proceed to a final stage (e.g. World Cup)</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Start Time
            </Form.Label>
            <Col sm="10">
              <Form.Control type="datetime-local" placeholder="Tournament Name" onChange={onHandleChange} defaultValue={newEdit.data.attributes.timestamps.startsAt} name="starts_at" />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ float: 'right', fontWeight: 'bold', color: '#fff' }}>Save Update</Button>
          <Button variant="light" type="submit" style={{ float: 'right', fontWeight: 'bold', color: '#fff' }}>Cancel</Button>{' '}
        </Form>
        : <h1>Loading Data... Please wait <Spinner animation="border" /></h1>
      }
    </>
  )
}

export default EditTournaments
