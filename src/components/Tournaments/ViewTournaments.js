import * as axios from '../../utils/axiosApi'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Spinner, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { successMessage } from '../../utils/message'

const ViewTournaments = () => {
  const history = useHistory()
  let { id } = useParams()
  const urlEdit = `tournaments/${id}.json`
  const [tournament, setTournament] = useState({})

  if (!tournament.hasOwnProperty('attributes')) {
    axios.request(urlEdit, {}, "GET").then(res => {
      if (res) {
        const dateString = new Date(res.attributes.timestamps.startsAt)
        const date = dateString.toDateString()
        const hours = dateString.toLocaleTimeString()
        return setTournament({ ...res, date: date + " " + hours })
      } else {
        console.log('error')
      }

    })
  }

  const addParticipants = (e) => {
    e.preventDefault()
    const url = `tournaments/${id}/participants.json`
    const addParticipant = prompt('Display Name')
    if (addParticipant) {
      axios.request(url, {
        data: {
          type: "Participants", attributes: {
            name: addParticipant,
          }
        }
      }, "POST").then(res => {
        successMessage('success', `successfully add participant ${addParticipant}`)
        return res
      })
    }
  }

  const [participantLength, setParticipantLength] = useState([])

  if (participantLength.length === 0) {
    const url = `tournaments/${id}/participants.json`
    axios.request(url, {}, "GET").then(res => {
      setParticipantLength(res)
      return res
    })
  }
  const getParticipants = () => {
    history.push(`/tournaments/${id}/participants`)
  }

  return (
    <>
      {
        !tournament.hasOwnProperty('attributes') ?
          <h1>Loading Data... Please wait <Spinner animation="border" /></h1>
          :
          <>
            <br></br>
            <Card style={{ width: '18rem' }}>
              {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
              <Card.Body>
                <Card.Title>{tournament.attributes.name}</Card.Title>
                <Card.Text>
                  {tournament.attributes.description}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{tournament.date}</ListGroupItem>
                <ListGroupItem>{tournament.attributes.tournamentType}</ListGroupItem>
                <ListGroupItem>{tournament.id}</ListGroupItem>
                <ListGroupItem onClick={getParticipants} style={{ cursor: 'pointer' }}>  <small><strong>{participantLength.length === 0 ? <small>0</small> : participantLength.length}</strong></small> Participants</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="" onClick={addParticipants} style={{ color: '#000' }}>Add Participants</Card.Link>
                <Card.Link href="#" style={{ color: '#000' }}>Another Link</Card.Link>
              </Card.Body>
            </Card>
          </>
      }

    </>
  )
}

export default ViewTournaments
