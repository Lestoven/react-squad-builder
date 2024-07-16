import { useState, useEffect } from 'react'
import Pitch from './Pitch.jsx'
import PlayerSelectModal from './PlayerSelectModal.jsx'
import { renderPositions, renderFormationSelector } from './renderers.jsx'
import InformationModal from './InformationModal.jsx'
import SettingsModal from './SettingsModal.jsx'
import { DISPLAY_NUMBER } from './ShirtDisplayOptions.js'

function App({players, defaultJerseyColor, defaultJerseyTextColor, lang}) {
    const [selectedFormation, setSelectedFormation] = useState("") //The current selected formation
    const [formationsData, setFormationsData] = useState([]) //The available formations 
    const [playerPositions, setPlayerPositions] = useState([]) //The position on the pitch
    const [playerSelectModalOpen, setPlayerSelectModalOpen] = useState(false) //Is modal open to pick player

    const [informationModalOpen, setInformationModalOpen] = useState(false) //Storing wheter the modal showing information open or closed
    const [settingsModalOpen, setSettingsModalOpen] = useState(false) //Is the "settigns" modal open
    const [informationModalType, setInformationModalType] = useState("info")
    const [informationModalMessage, setInformationModalMessage] = useState("")
    const [currentPositionType, setCurrentPositionType] = useState("attacker") //The position type the user is picking to add (attacker/midfielder/defender/goalkeeper)
    const [availablePlayers, setAvailablePlayers] = useState( //All of the avialable players from the squad
        players
    )
    const [selectedPosition, setSelectedPosition] = useState(null) //The current position the user is picking(from the modal) which player to add
    const [selectedPlayers, setSelectedPlayers] = useState([]) //Keeping track of the selected player by the user, members of the starting XI
    const [selectedPlayerFromBench, setSelectedPlayerFromBench] = useState(null) //The player the user selected from the bench to add to the squad
    const [isToastOpen, setIsToastOpen] = useState(false) //Toast that showing player that we want add from the bench to the startign XI(selected players)
    const [shirtDisplayType, setShirtDisplayType] = useState(DISPLAY_NUMBER) //State to store what to display on the shirt(shirt Number or Postition like ST)

    const [colorSettings, setColorSettings] = useState({starterShirtColor: defaultJerseyColor, shirtTextColor: defaultJerseyTextColor})

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)

    const updateDimensions = () => {
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
    }

    const handleFormationChange = (event) => {
        let newFormation = event.target.value //Getting the new formation
        setSelectedFormation(newFormation) //Chaning to formation
        setPlayerPositions(formationsData[newFormation]["positions"]) //Loading the position data
    }

    const addPlayerToPitch = (player) => { //Adding a player to the pitch
        let oldSelectedPlayers = selectedPlayers;
        oldSelectedPlayers = oldSelectedPlayers.filter(selectedPlayer => selectedPlayer["positionOnPitch"] !== selectedPosition); //Checking if player has been alreay added to this position, if yes filter it out
        player["positionOnPitch"] = selectedPosition //Adding to the correct position
        setSelectedPlayers([...oldSelectedPlayers, player]) //Adding to the starting XI
        setSelectedPosition(null) //Nulling the current selected position
    }

    const handlePositionClick = (positionType, index) => { //Handle clicking on a player position on the pitch
        if (selectedPlayerFromBench === null) //If user want to add player from the the modal (not from the bench)
        {
            setCurrentPositionType(positionType); //Setting the type of the position
            setSelectedPosition(index); //Setting the id(the exact position) to know where to add
            setPlayerSelectModalOpen(true); //Opening the modal
        }
        else //If user  want to add/swap player from the bench into the squad
        {
            addPlayerFromBenchToSquad(index, positionType)
        }
    }

    const addPlayerFromBenchToSquad = (index, positionType) => { //swap Player from bench and starting XI or adding from the bench to the starting XI
        setIsToastOpen(false) //Closing the toast indicating whic player we slected from the bench
        if (selectedPlayerFromBench["positionType"] !== positionType && 
                !selectedPlayerFromBench["alternativePositions"].split(/[,;\/\s]+/).includes(positionType)) { //If the selected player's position is not compatible with the position we want to put him in
            setSelectedPlayerFromBench(null) //Setting the player selected from the bench back to null
            setInformationModalOpen(true) //Open the information modal
            setInformationModalType("wrong_position")
            setInformationModalMessage(`${selectedPlayerFromBench["name"]},${selectedPlayerFromBench["positionType"]},${positionType}`)
            return
        }
        let oldSelectedPlayers = selectedPlayers;
        oldSelectedPlayers = oldSelectedPlayers.filter(selectedPlayer => selectedPlayer.positionOnPitch !== index); //Filter out the player on the selected position

        const currentSelectedPlayerFromBench = selectedPlayerFromBench
        currentSelectedPlayerFromBench["positionOnPitch"] = index //Setting the player's position
        setSelectedPlayers([...oldSelectedPlayers, currentSelectedPlayerFromBench]) //Adding player to the starting XI
        setSelectedPlayerFromBench(null) //Setting the player selected from the bench back to null
    }

    const removePlayerFromPitch = (e, index) => { //Removing player from the starting XI
        e.stopPropagation(); //Stopping the PlayerSelectModal from opening
        let oldSelectedPlayers = selectedPlayers
        setSelectedPlayers(oldSelectedPlayers.filter(player => player.positionOnPitch !== index)) //Filter out the player from the selected players(starting XI) that on the position we want to clear
    }

    useEffect(() => { //loading the formations and setting some default values
        fetch("formations.json")
            .then(response => response.json())
            .then(data => { let jsonData = Object.entries(data); setFormationsData(data); setPlayerPositions(jsonData[0][1]["positions"]); setSelectedFormation(jsonData[0][0]) })
            .catch(error => console.error('Error fetching formations:', error))

        //We need to determine the screen size in order to show the correct pitch on desktop and mobile(mobile one is different)
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    return (
        <div id="squad-builder">
            <Pitch renderPositions={() => renderPositions(playerPositions, selectedPlayers, selectedPlayerFromBench, removePlayerFromPitch, screenWidth, 
                handlePositionClick, shirtDisplayType, colorSettings, lang)} 
                 renderFormationSelector={() => renderFormationSelector(handleFormationChange, formationsData)}
                 availablePlayers={availablePlayers} selectedPlayers={selectedPlayers} selectedPlayerFromBench={selectedPlayerFromBench} lang={lang}
                  setSelectedPlayerFromBench={setSelectedPlayerFromBench} isToastOpen={isToastOpen} setIsToastOpen={setIsToastOpen} setSettingsModalOpen={setSettingsModalOpen} />
            <PlayerSelectModal playerSelectModalOpen={playerSelectModalOpen} setPlayerSelectModalOpen={setPlayerSelectModalOpen} currentPositionType={currentPositionType}
                availablePlayers={availablePlayers} addPlayerToPitch={addPlayerToPitch} selectedPlayers={selectedPlayers} lang={lang}/>
            <InformationModal informationModalOpen={informationModalOpen} setInformationModalOpen={setInformationModalOpen}
                informationModalType={informationModalType} informationModalMessage={informationModalMessage} lang={lang}/>
            <SettingsModal settingsModalOpen={settingsModalOpen} setSettingsModalOpen={setSettingsModalOpen}
                shirtDisplayType={shirtDisplayType} setShirtDisplayType={setShirtDisplayType} colorSettings={colorSettings} setColorSettings={setColorSettings} lang={lang}/>
        </div>
    )
}

export default App
