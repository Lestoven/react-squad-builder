import React from 'react'
import App from './App'
import './index.css'

export default function SquadBuilder({players}) {
  return (
    <>
      <App players={players}/>
      <link href="https://fonts.googleapis.com/css2?family=Haettenschweiler&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas Neue:wght@400;500;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;500;700&display=swap" rel="stylesheet" />
    </>
  )
}