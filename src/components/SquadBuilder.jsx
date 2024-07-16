import React from 'react'
import App from './App'
import './index.css'

export default function SquadBuilder({players, defaultJerseyColor = "#9B1C1C", defaultJerseyTextColor = "#FFFFFF", lang=null}) {
  return (
    <>
      <div className="squad-builder-tailwind">
        <App players={players} defaultJerseyColor={defaultJerseyColor} defaultJerseyTextColor={defaultJerseyTextColor} lang={lang}/>
      </div>
    </>
  )
}