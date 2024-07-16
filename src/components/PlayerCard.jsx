import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt } from '@fortawesome/free-solid-svg-icons'
import { getUserLanguage, translate } from './i18n/translate'

export default function PlayerCard({ player, id, onClickFunc, showPosition = true, lang }) {
    return (
        <div key={id} className="player-card p-4 max-w-lg border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col" style={{ background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgb(200, 130, 0))' }}>
            <div className="relative mt-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faShirt} className="pickable-player-card text-6xl md:text-7xl" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className="text-white text-2xl md:text-3xl player-number">{player["shirtNumber"]}</span>
                </div>
            </div>
            <div className="flex flex-col items-center flex-grow">
                <div className="text-center">
                    <h5 className="mt-2 text-lg font-bold text-gray-900 text-white leading-none">{player["name"]}</h5>
                    {showPosition === true ? <h6 className="mb-1 text-white">({translate(`position.${player["positionType"]}`, lang)})</h6> : <></>}
                </div>
                <div className="flex-grow" />
                <div className="flex justify-center items-center">
                    <button className="px-2 py-1 md:px-3 md:py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-red-600 via-purple-600 
                        to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 
                        shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg" onClick={onClickFunc}>
                        <p>{translate("playerSelectModal.addPlayer", lang)}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}