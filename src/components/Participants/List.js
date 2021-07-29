import React, { useEffect, useState } from 'react'
import { ListGroup, Spinner, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as axios from '../../utils/axiosApi'
import { useHistory, useParams } from 'react-router-dom'
import { successMessage } from '../../utils/message'

const List = () => {
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
      successMessage('Success', `Successfully deleted ${participant.attributes.name}`)
      getParticipants()
      return res
    })
  }

  useEffect(() => {
    getParticipants()
  })

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
                  <ListGroup key={index}>
                    <ListGroup.Item><strong onClick={() => deleteParticipant(participant)} style={{ cursor: 'pointer' }}>X</strong> {participant.attributes.name}</ListGroup.Item>
                  </ListGroup>
                ))
              }
            </>

      }

    </>
  )
}

export default List
