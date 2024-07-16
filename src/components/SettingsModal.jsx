import { Button, Modal } from 'flowbite-react';
import { getUserLanguage, translate } from './i18n/translate'
import { DISPLAY_NUMBER, DISPLAY_POSITION, DISPLAY_NOTHING } from './ShirtDisplayOptions';

export default function SettingsModal({ settingsModalOpen, setSettingsModalOpen, shirtDisplayType, setShirtDisplayType, colorSettings, setColorSettings, lang }) {
    var debounce = function (fn, t) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), t)
        }
    }; // Function to delay the setting a state, if state change is called again in "t" milliseconds, it resets teh waiting

    let colorChanger = debounce((obj, value) => setColorSettings({
        ...colorSettings, [obj]: value // Updating state
    }), 5)

    const handleShirtColorChange = (e) => {
        colorChanger("starterShirtColor", e.target.value)
    }

    const handleShirtTextColorChange = (e) => {
        colorChanger("shirtTextColor", e.target.value)
    }
    return (
        <Modal className="modal squad-builder-tailwind" show={settingsModalOpen} onClose={() => setSettingsModalOpen(false)}>
            <div className="w-full h-full">
                <Modal.Header><span className="modal-title">{translate("menu.settings", lang)}</span></Modal.Header>
                <Modal.Body>
                    <div className="space-y-3">
                        <h2 className="text-purple-600 text-2xl font-extrabold uppercase leading-normal">{translate("menu.jerseyText", lang)}</h2>
                        <div className={`flex items-center font-sans tracking-tight ${shirtDisplayType === DISPLAY_NUMBER ? "italic" : ""}`}>
                            <input defaultChecked={shirtDisplayType === DISPLAY_NUMBER} id="number-radio" type="radio" value=""
                                name="default-radio" onChange={() => setShirtDisplayType(DISPLAY_NUMBER)}
                                className="custom-radio w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600
                                                dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="number-radio" className="ms-2 text-sm font-medium text-gray-900
                                            dark:text-gray-300">{translate("menu.number", lang)}</label>
                        </div>
                        <div className={`flex items-center font-sans tracking-tight ${shirtDisplayType === DISPLAY_POSITION ? "italic" : ""}`}>
                            <input defaultChecked={shirtDisplayType === DISPLAY_POSITION} id="position-radio" type="radio" value=""
                                name="default-radio" onChange={() => setShirtDisplayType(DISPLAY_POSITION)}
                                className="custom-radio w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 
                                                dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="position-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{translate("menu.position", lang)}</label>
                        </div>
                        <div className={`flex items-center font-sans tracking-tight ${shirtDisplayType === DISPLAY_NOTHING ? "italic" : ""}`}>
                            <input defaultChecked={shirtDisplayType === DISPLAY_NOTHING} id="nothing-radio" type="radio" value=""
                                name="default-radio" onChange={() => setShirtDisplayType(DISPLAY_NOTHING)}
                                className="custom-radio w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="nothing-radio"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{translate("menu.nothing", lang)}</label>
                        </div>


                        <h2 className="text-purple-600 text-2xl font-extrabold uppercase leading-normal">{translate("menu.colors", lang)}</h2>

                        <div className="colorPicker mx-auto bg-white p-6 rounded-md shadow-md text-center p-4 border border-gray-300 rounded-sm">
                            <div className="flex justify-between space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="colorPicker" className="block text-sm font-medium text-gray-700 font-sans tracking-tight">{translate("menu.jerseyColor", lang)}</label>
                                    <input defaultValue={colorSettings["starterShirtColor"]} type="color" id="shirtColorPicker" name="shirtColorPicker" onChange={handleShirtColorChange}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="colorPicker" className="block text-sm font-medium text-gray-700 font-sans tracking-tight">{translate("menu.textColor", lang)}</label>
                                    <input defaultValue={colorSettings["shirtTextColor"]} type="color" id="shirtTextColorPicker" name="shirtTextColorPicker" onChange={handleShirtTextColorChange}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4
                            focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-0.5
                            text-center me-2 mb-2" onClick={() => setSettingsModalOpen(false)}>{translate("playerSelectModal.closeModal", lang)}</Button>
                </Modal.Footer>
            </div>
        </Modal>
    );
}