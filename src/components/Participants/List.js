import React, { useEffect, useState } from 'react'
import { ListGroup, Spinner, Button, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as axios from '../../utils/axiosApi'
import { useHistory, useParams } from 'react-router-dom'
import { errorMessage, successMessage } from '../../utils/message'

const List = (props) => {
  const history = useHistory()
  const [participants, setParticipants] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()
  const url = `tournaments/${id}/participants.json`

  const getParticipants = () => {
    axios.request(url, {}, "GET").then(res => {
      setIsLoading(false)
      return setParticipants(res)
    })
  }

  const getRouteBack = () => {
    history.push(`/tournaments/view/${id}`)
  }

  const deleteParticipant = (participant) => {
    const deleteUrl = `/tournaments/${id}/participants/${participant.id}.json`
    axios.request(deleteUrl, {}, "DELETE").then(res => {
      getParticipants()
      return res
    })
  }

  const editParticipant = (participant) => {
    const addParticipant = prompt('Edit participant', participant.attributes.name)
    const editUrl = `/tournaments/${id}/participants/${participant.id}.json`
    console.log(editUrl)
    console.log(participant)
    const find = participants.find(res => res.attributes.name === addParticipant)
    if (find) {
      return errorMessage('Error', `Participant ${addParticipant} is already taken`)
    }
    if (addParticipant) {
      axios.request(editUrl, { data: { attributes: { name: addParticipant } } }, "PUT").then(res => {
        successMessage('Success', `Successfully Updated ${participant.attributes.name} to ${addParticipant}`)
        getParticipants()
        console.log(res)
        return res
      })
    }
  }

  useEffect(() => {
    getParticipants()
  }, [])

  return (
    <>
      {
        isLoading ? <h1>Loading Data... Please wait <Spinner animation="border" /></h1> :
          participants.length === 0 ?
            <>
              <h1>No participants</h1>
              <Button variant="dark" type="submit" onClick={getRouteBack}>Back</Button>{' '}<br></br><br></br>
            </>
            :
            <>
              <h1>Tournament Participants</h1>
              <Button variant="dark" type="submit" onClick={getRouteBack}>Back</Button>{' '}<br></br><br></br>
              {
                participants.map((participant, index) => (
                  <Col sm="2" key={index}>
                    <ListGroup  >
                      <ListGroup.Item >
                        {participant.attributes.name}
                        <i className="fas fa-user-edit" onClick={() => editParticipant(participant)} style={{ cursor: 'pointer', float: "right", marginLeft: "10px" }}></i>
                        <i className="fas fa-trash" onClick={() => deleteParticipant(participant)} style={{ cursor: 'pointer', float: "right" }}></i>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                ))
              }
            </>

      }

    </>
  )
}

export default List
