export function isSelected(selectedPlayers, player) {
    return selectedPlayers.find(selectedPlayer => {
        return selectedPlayer.id === player.id
    }) !== undefined
}