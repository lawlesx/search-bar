/**
 * @param {string} text - The text string to be highlighted.
 * @param {string} searchTerm - The search term to highlight within the text.
 * @returns {JSX.Element[]} An array of JSX elements or string representing the highlighted text parts.
 */
export const highlightText = (text: string, searchTerm: string) => {
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={i} className='highlight'>
        {part}
      </span>
    ) : (
      part
    )
  )
}
