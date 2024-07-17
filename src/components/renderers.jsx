import { Fragment } from 'react'
import { getUserLanguage, translate } from './i18n/translate'
import PositionOnPitch from './PositionOnPitch.jsx'
import CustomSelect from './CustomSelect.jsx'

export function renderPositions(playerPositions, selectedPlayers, selectedPlayerFromBench,
    removePlayerFromPitch, screenWidth, handlePositionClick, shirtDisplayType, colorSettings, lang) {
    return (

        playerPositions.map((position, index) => { // mapping throught the positions
            const positionType = position.positionType // Getting the type of the position (attacker/midfielder/defender/goalkeeper)
            const addText = translate(`positionAdd.${positionType}`, lang) // Getting the translation of the add player label
            const playerOnPosition = selectedPlayers.find(player => player.positionOnPitch == index); // Getting the player that has been added to this position(if not yet it's undefined)
            return (
                <Fragment key={index}>
                    <div key={index} className="player-on-pitch absolute cursor-pointer"
                        style={{
                            bottom: `${screenWidth <= 1280 ? position.bottom["mobile"] : position.bottom["desktop"]}%`,
                            right: `${screenWidth <= 1280 ? position.right["mobile"] : position.right["desktop"]}%`,
                        }}
                        onClick={() => handlePositionClick(positionType, index)} >

                        <PositionOnPitch selectedPlayerFromBench={selectedPlayerFromBench} playerOnPosition={playerOnPosition}
                            removePlayerFromPitch={removePlayerFromPitch} index={index} addText={addText} shirtDisplayType={shirtDisplayType}
                            colorSettings={colorSettings} position={position} />
                    </div>
                </Fragment>
            )
        })
    )
}

export function renderFormationSelector(handleFormationChange, formationsData) { // rendering the formation selector when user can change the current formation
    return (
        <CustomSelect formationsData={formationsData} handleFormationChange={handleFormationChange}/>
    )
}