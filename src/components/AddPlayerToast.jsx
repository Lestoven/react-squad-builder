import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt } from '@fortawesome/free-solid-svg-icons'
import { getUserLanguage, translate } from './i18n/translate'

function AddPlayerToast({ isOpen, setIsOpen, player, setSelectedPlayerFromBench, lang }) {
    const toggleToast = () => {
        setIsOpen(!isOpen)
    };

    const cancelAdding = () => {
        setSelectedPlayerFromBench(null)
        toggleToast()
    }

    return (
        <div className="addPlayer fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="bg-white min-w-500px border-white p-5 rounded-md shadow-md flex flex-col items-start items-center justify-between max-w-72">
                    <h4 className="mb-4 text-md font-bold dark:text-white break-words">{translate("addPlayerToast.addingToSquad", lang)} <br />
                        <span className="bg-blue-100 text-red-600 text-xl font-bold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                            {player["name"]}
                        </span>
                    </h4>
                    <div className="p-4 max-w-lg min-w-40 border border-gray-200 rounded-lg shadow dark:bg-gray-800 
                        dark:border-gray-700 flex flex-col" style={{ background: 'linear-gradient(rgb(0,200, 228), rgb(30, 40, 200))' }}>
                        <div className="relative mt-2 flex items-center justify-center">
                            <FontAwesomeIcon icon={faShirt} className="text-5xl md:text-7xl text-red-600" />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <span className="text-white text-xl md:text-3xl font-bold">{player["shirtNumber"]}</span>
                            </div>
                        </div>
                        <div className="p-2 flex flex-col items-center flex-grow">
                            <a className="text-center">
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 text-white">{player["name"]}</h5>
                                <h6 className="text-white">({translate(`position.${player["positionType"]}`, lang)})</h6>
                            </a>
                        </div>

                    </div>

                    <button className="mt-3 px-3 py-2 text-red-700 hover:text-white border border-red-700
                         hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                         text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white 
                         dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={cancelAdding}>
                        <p>{translate("addPlayerToast.cancelAddingPlayer", lang)}</p>
                    </button>
                </div>

            )}
            {player &&
                <button
                    onClick={toggleToast}
                    className="mt-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md focus:outline-none">
                    {!isOpen ?
                        translate("addPlayerToast.showSelectedPlayer", lang)
                        :
                        translate("addPlayerToast.hideSelectedPlayer", lang)
                    }
                </button>
            }

        </div>
    );
}

export default AddPlayerToast