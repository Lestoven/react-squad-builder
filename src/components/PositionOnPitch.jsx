import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faShirt, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { DISPLAY_NUMBER, DISPLAY_POSITION } from './ShirtDisplayOptions'

export default function PositionOnPitch({ selectedPlayerFromBench, playerOnPosition, removePlayerFromPitch, index, addText, shirtDisplayType, colorSettings, position }) {
    if (playerOnPosition === undefined) { //If player hasn't added to the position yet
        return (
            <>
                <FontAwesomeIcon icon={faPlus} className="text-2xl md:text-4xl text-white absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                {
                    selectedPlayerFromBench === null ? //Selected Player is not null when user want to add a player from the bench to the squad
                        <>
                            <FontAwesomeIcon icon={faShirt} className="text-6xl md:text-7xl text-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            {
                                addText.length <= 20 ?
                                    <span className="player-name bg-purple-100 text-purple-800 text-base md:text-xl md:leading-none leading-none font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[48px] md:top-[58px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        dangerouslySetInnerHTML={{ __html: addText }}>
                                    </span>
                                    :
                                    <span className="player-name bg-purple-100 text-purple-800 text-base md:text-xl md:leading-none leading-none font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[48px] md:top-[58px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        dangerouslySetInnerHTML={{ __html: addText }}>
                                    </span>
                            }
                        </>
                        :
                        <FontAwesomeIcon icon={faShirt} className="text-6xl md:text-7xl text-blue-600 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                }
            </>
        )
    }
    let toDisplayOnShirt = ""

    if(shirtDisplayType == DISPLAY_NUMBER) {
        toDisplayOnShirt = (<span className="player-number text-2xl md:text-3xl absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2
             -translate-y-1/2" style={{color: colorSettings["shirtTextColor"]}}>{playerOnPosition["shirtNumber"]}</span>)
    } else if(shirtDisplayType === DISPLAY_POSITION) {
        toDisplayOnShirt = (<span className="player-number text-xl md:text-2xl absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2
             -translate-y-1/2" style={{color: colorSettings["shirtTextColor"]}}>{position["positionName"]}</span>)
    }
    return (
        <>
            {
                selectedPlayerFromBench === null ? //Selected Player is not null when user want to add a player from the bench to the squad
                <>
                    <FontAwesomeIcon icon={faShirt} className="player-shirt text-6xl md:text-7xl absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                     style={{color: colorSettings["starterShirtColor"]}}/>
                    <FontAwesomeIcon onClick={(e) => (removePlayerFromPitch(e, index))} icon={faCircleXmark} className="remove-btn text-2xl md:text-2xl text-red-600 absolute z-20
                    top-1/4 pb-16 md:pb-20 ml-8 md:ml-10 transform -translate-y-1/2" />
                </>
                :
                <FontAwesomeIcon icon={faShirt} className="text-6xl md:text-7xl absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                style={{color: colorSettings["starterShirtColor"]}}/>
            }

            {toDisplayOnShirt}
            
            {
                playerOnPosition["name"].length <= 20 ?
                <span className="player-name bg-purple-100 text-purple-800 text-lg md:text-xl md:leading-none leading-none font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[53px] md:top-[59px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    dangerouslySetInnerHTML={{ __html: playerOnPosition["name"] }}>
                </span>
                :
                <span className="player-name bg-purple-100 text-purple-800 text-lg md:text-xl md:leading-none leading-none font-medium me-2 px-2.5 py-0.5 dark:bg-purple-900 dark:text-purple-300 
                        absolute z-10 top-[63px] md:top-[68px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    dangerouslySetInnerHTML={{ __html: playerOnPosition["name"] }}>
                </span>
            }
        </>
    )
}