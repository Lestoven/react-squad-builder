import './App.css'
import SquadBuilder from './components/SquadBuilder'

const App = () => {
  const players = [
    {
      "id": 1,
      "positionType": "goalkeeper",
      "alternativePositions": "",
      "name": "Gianluigi Donnarumma",
      "shirtNumber": 21
    },
    {
      "id": 2,
      "positionType": "defender",
      "alternativePositions": "",
      "name": "João Cancelo",
      "shirtNumber": 2
    },
    {
      "id": 3,
      "positionType": "defender",
      "alternativePositions": "",
      "name": "Raphael Varane",
      "shirtNumber": 4
    },
    {
      "id": 4,
      "positionType": "defender",
      "alternativePositions": "",
      "name": "Mats Hummels",
      "shirtNumber": 6
    },
    {
      "id": 5,
      "positionType": "defender",
      "alternativePositions": "",
      "name": "Alphonso Davies",
      "shirtNumber": 19
    },
    {
      "id": 6,
      "positionType": "midfielder",
      "alternativePositions": "",
      "name": "N'Golo Kanté",
      "shirtNumber": 7
    },
    {
      "id": 7,
      "positionType": "midfielder",
      "alternativePositions": "",
      "name": "Pedri",
      "shirtNumber": 10
    },
    {
      "id": 37,
      "positionType": "midfielder",
      "alternativePositions": "",
      "name": "Jude Bellingham",
      "shirtNumber": 5
    },
    {
      "id": 8,
      "positionType": "midfielder",
      "alternativePositions": "",
      "name": "Kevin De Bruyne",
      "shirtNumber": 17
    },
    {
      "id": 9,
      "positionType": "attacker",
      "alternativePositions": "midfielder/defender",
      "name": "Jadon Sancho",
      "shirtNumber": 11
    },
    {
      "id": 10,
      "positionType": "attacker",
      "alternativePositions": "",
      "name": "Kylian Mbappé",
      "shirtNumber": 10
    },
    {
      "id": 11,
      "positionType": "attacker",
      "alternativePositions": "",
      "name": "Cristiano Ronaldo",
      "shirtNumber": 7
    },
    {
      "id": 13,
      "positionType": "defender",
      "alternativePositions": "",
      "name": "Virgil van Dijk",
      "shirtNumber": 4
    },
    {
      "id": 18,
      "positionType": "attacker",
      "alternativePositions": "",
      "name": "Erling Haaland",
      "shirtNumber": 9
    },
    {
      "id": 20,
      "positionType": "goalkeeper",
      "alternativePositions": "",
      "name": "Alisson Becker",
      "shirtNumber": 1
    },
    {
      "id": 24,
      "positionType": "attacker",
      "alternativePositions": "",
      "name": "Antoine Griezmann",
      "shirtNumber": 17
    },
    {
      "id": 26,
      "positionType": "attacker",
      "alternativePositions": "",
      "name": "Vinicius Junior",
      "shirtNumber": 20
    },
    {
      "id": 27,
      "positionType": "midfielder",
      "alternativePositions": "",
      "name": "Joshua Kimmich",
      "shirtNumber": 6
    }
  ]
  return (
    <SquadBuilder players={players} defaultJerseyColor={"rgb(0,0,0)"} defaultJerseyTextColor={"#FFFF00"} lang={"en"}/>
  )
}
export default App
