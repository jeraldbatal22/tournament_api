import * as axios from '../../utils/axiosApi'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { errorMessage, successMessage } from '../../utils/message'

const ViewTournaments = () => {
  const history = useHistory()
  let { id } = useParams()
  const urlEdit = `tournaments/${id}.json`
  const [tournament, setTournament] = useState({})
  const [participantLength, setParticipantLength] = useState([])

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

    const find = participantLength.find(res => res.attributes.name === addParticipant)
    if (find) {
      return errorMessage('Error', `Participant ${addParticipant} is already taken`)
    }

    if (addParticipant === "") {
      return errorMessage('Error', `Invalid Participant`)
    }

    if (addParticipant) {
      axios.request(url, {
        data: {
          type: "Participants", attributes: {
            name: addParticipant,
          }
        }
      }, "POST").then(res => {
        successMessage('success', `successfully add participant ${addParticipant}`)
        getParticipantsLength()
        return res
      })
    }

  }

  const getParticipantsLength = () => {
    const url = `tournaments/${id}/participants.json`
    axios.request(url, {}, "GET").then(res => {
      setParticipantLength(res)
      return res
    })
  }

  if (participantLength.length === 0) {
    getParticipantsLength()
  }

  const getParticipants = () => {
    history.push(`/tournaments/${id}/participants`)
  }

  useEffect(() => {
    getParticipantsLength()
  }, [])

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
                {/* <Card.Link href="#" style={{ color: '#000' }}>Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          </>
      }

    </>
  )
}

export default ViewTournaments
