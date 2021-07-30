import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import * as axios from '../../utils/axiosApi'
import DeleteTournaments from './DeleteTournaments'

const Tournaments = (props) => {
  const history = useHistory()
  const [tournaments, setTournaments] = useState([])
  const [tournament, setTournament] = useState({})
  const [isShow, setIsShow] = useState(false)

  const getData = () => {
    const url = "tournaments.json"
    const data = axios.request(url, {}, "GET").then(res => {
      return setTournaments(res)
    })
    return data
  }

  if (tournaments.length === 0) {
    getData()
  }

  const onViewTournament = (list) => {
    history.push(`tournaments/view/${list}`)
  }

  const onHandleDelete = (list) => {
    setIsShow(true)
    const find = tournaments.find(tournament => tournament.id === list.id)
    getData()
    setTournament(find)
  }

  const editTournament = (list) => {
    history.push(`/tournaments/edit/${list.id}`)
  }

  const getRoute = () => {
    history.push('/tournaments/create')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <br></br>
      {
        tournaments.length !== 0 ?
          <>
            <Button variant="warning" onClick={getRoute} style={{ float: 'right', marginRight: '570px' }}>Create Tournaments</Button>
            <br></br><br></br><br></br>
            {
              tournaments.map((list, index) => {
                const dateString = new Date(list.attributes.timestamps.startsAt)
                const date = dateString.toDateString()
                const hours = dateString.toLocaleTimeString()
                return <div key={index}>
                  <Card className="text-center">
                    <Card.Header>{list.type}</Card.Header>
                    <Card.Body>
                      <Card.Title>{list.attributes.name}</Card.Title>
                      <Card.Title>Date Start At {date} {hours}</Card.Title>
                      <Card.Text>
                        {list.attributes.description}
                      </Card.Text>
                      <Button variant="primary" onClick={() => onViewTournament(list.id)}>Check to view</Button>{' '}
                      <Button variant="danger" onClick={() => onHandleDelete(list)}>Delete Tournament</Button>{' '}
                      <Button variant="warning" onClick={() => editTournament(list)}>Edit Tournament</Button>
                    </Card.Body>
                  </Card>
                  <br></br>
                </div>
              })
            }
          </>
          :
          <h1>Loading Data... Please wait <Spinner animation="border" /></h1>
      }

      {isShow && <DeleteTournaments show={isShow} onHide={setIsShow} tournament={tournament} tournaments={tournaments} getData={getData} />}

    </div>
  )
}

export default Tournaments
