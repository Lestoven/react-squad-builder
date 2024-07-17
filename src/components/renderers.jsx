import { Fragment } from 'react'
import { getUserLanguage, translate } from './i18n/translate'
import PositionOnPitch from './PositionOnPitch.jsx'

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
        <select onChange={handleFormationChange} id="countries" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {Object.keys(formationsData).map((formation, index) => (
                        <option key={index} value={formation}>{formation}</option>
                    ))}
        </select>
    )
}