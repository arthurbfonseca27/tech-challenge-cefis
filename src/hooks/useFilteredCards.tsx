import useCards from './useCards'

const useFilteredCards = () => {
  const cards = useCards()

  const filteredCards = cards
  // cards.filter((card) => card.column === title)

  return filteredCards
}

export default useFilteredCards
