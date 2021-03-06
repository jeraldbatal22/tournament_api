import { Form, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeid } from '../../id_generator/makeId'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as axios from '../../utils/axiosApi'
import { errorMessage, successMessage } from '../../utils/message'

const CreateTournaments = () => {
  const history = useHistory()
  const [newTournament] = useState({
    data: {
      type: "Tournaments", attributes: {
        name: '',
        url: makeid(8),
        description: '',
        game: '',
        tournament_type: '',
        starts_at: '',
      }
    }
  })

  const onHandleChange = (e) => {
    const { value, name } = e.target
    newTournament.data.attributes[name] = value
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    const url = `tournaments.json`
    axios.request(url, newTournament, "POST").then(res => {
      if (res) {
        successMessage('Success', `Successfully created tournament of ${newTournament.data.attributes.name}`)
        history.push('/')
        return res
      } else {
        errorMessage('Error', 'Select type of tournament')
      }
    })
  }

  return (
    <Form onSubmit={onHandleSubmit}>
      <br></br>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Tournament Name
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Tournament Name" name="name" onChange={onHandleChange} required />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          URL
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="" value={newTournament.data.attributes.url} name="url" onChange={onHandleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control as="textarea" rows={3} style={{ resize: 'none' }} name="description" onChange={onHandleChange} required />
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
            <option value="pubg_mobile">Axie Infinity</option>
            <option value="pubg_mobile">Sausage Man</option>
            <option value="pubg_mobile">NBA 2k19</option>
            <option value="pubg_mobile">Tongits Go</option>
            <option value="pubg_mobile">Valorant</option>
            <option value="pubg_mobile">Counter Strike Go</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label as="legend" column sm={2}>
          Type
        </Form.Label>
        <Col sm={10}>
          <Form.Select onChange={onHandleChange} name="tournament_type" required>
            <option value="mobile_legends">Select Type</option>
            <option value="single elimination">Single Stage Tournament</option>
            <option value="double elimination">Two Stage Tournament ??? groups compete separately, winners proceed to a final stage (e.g. World Cup)</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Start Time
        </Form.Label>
        <Col sm="2">
          <Form.Control type="datetime-local" placeholder="Tournament Name" onChange={onHandleChange} name="starts_at" required />
        </Col>
      </Form.Group>
      <Button variant="primary" type="submit" style={{ float: 'right', fontWeight: 'bold', color: '#fff' }}>SAVE AND CONTINUE</Button>
    </Form>
  )
}

export default CreateTournaments
