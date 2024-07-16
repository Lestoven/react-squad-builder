import { getUserLanguage, translate } from './i18n/translate'
import PlayerCard from './PlayerCard'
import { Fragment } from 'react';
import AddPlayerToast from './AddPlayerToast.jsx'
import React, { useState } from 'react';
import { isSelected } from './utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faDownload } from '@fortawesome/free-solid-svg-icons'
import domtoimage from 'dom-to-image-more';


export default function Pitch({ renderPositions, renderFormationSelector, availablePlayers, selectedPlayers, selectedPlayerFromBench,
    setSelectedPlayerFromBench, isToastOpen, setIsToastOpen, setSettingsModalOpen, lang }) {

    const addPlayerFromBench = (player) => {
        setSelectedPlayerFromBench(player)
        setIsToastOpen(true)
    }

    function hideElements(className) {
        var elements = document.querySelectorAll(className);
        elements.forEach(function (element) {
            element.classList.add('hide-on-capture');
        });
    }

    function showElements(className) {
        var elements = document.querySelectorAll(className);
        elements.forEach(function (element) {
            element.classList.remove('hide-on-capture');
        });
    }

    const handleSave = () => {
        const options = {
            style: {
                border: 'none',
                //padding: '0px',
            }
        };
        hideElements(".remove-btn"); // Hide player remove circles while creating the image
        var node = document.querySelector("#pitch-content");

        domtoimage
            .toPng(node, options)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'filename.png';
                link.href = dataUrl
                link.click();
                showElements(".remove-btn") // Putting  player remove circles back
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

    }

    return (
        <>
            <div className="flex items-center justify-center mt-2 md:mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 no-gap">
                    <div className="md:col-span-1 items-center justify-center">
                        <label htmlFor="countries" className="text-lg font-medium text-black">{translate("pitchTexts.pickFormation", lang)}</label>
                        {renderFormationSelector()}
                    </div>
                    <div className="mt-2 md:col-span-1 flex items-end justify-center">
                        <button className="ml-4 flex items-center space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                         hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg
                          shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 
                          py-2.5 text-center me-2 mb-2" onClick={(e) => { e.target.blur(); setSettingsModalOpen(true) }}>
                            {translate("menu.settings", lang)} &nbsp;<FontAwesomeIcon icon={faSliders} className="text-black text-2xl md:text-lg" /></button>

                        <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4
                             focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSave}>
                            {translate("download.download", lang)} &nbsp;<FontAwesomeIcon icon={faDownload} className="text-black text-2xl md:text-lg" /></button>
                    </div>
                </div>
            </div>


            <div className="w-full md:p-4 p-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 no-gap items-start">
                    <div className="md:col-span-2 football-pitch flex items-center justify-center mt-1" id="pitch-content">
                        <div className="wrapper flex justify-content-center">
                            <div className="relative">
                                <img src="football_pitch_full.jpg" alt="Soccer Pitch" className="block md:hidden h-screen object-cover" />
                                <img src="football_pitch_cropped.png" alt="Soccer Pitch" className="hidden md:block rounded-md h-screen object-cover p-2" />
                                {renderPositions()}
                            </div>
                        </div>
                    </div>
                    <div className="player-block md:col-span-1 space-y-6 border border-white rounded-md shadow mt-6" id="bench-content">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-1 md:gap-4 md:pl-4 md:pr-4 md:pt-6">
                            {availablePlayers.map((player, id) => { //Rendering player to the bench that are not in the starting XI
                                return (
                                    <Fragment key={id}>
                                        {isSelected(selectedPlayers, player) === false ? //If we cant find it in the selectedPlayers(starting XI)
                                            <PlayerCard player={player} id={id} onClickFunc={() => addPlayerFromBench(player)} showPosition={true} lang={lang} />
                                            :
                                            <></>
                                        }
                                    </Fragment>
                                )
                            })}
                        </div>
                        <h2 className="font-extrabold pb-4 text-3xl text-black">{translate("substitutes.substitutes", lang)}</h2>
                    </div>
                </div>
            </div>
            <AddPlayerToast isOpen={isToastOpen} setIsOpen={setIsToastOpen} player={selectedPlayerFromBench} setSelectedPlayerFromBench={setSelectedPlayerFromBench} lang={lang} />
        </>
    )
}