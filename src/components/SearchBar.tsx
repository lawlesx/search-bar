import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Data } from '../hooks/useMockData'
import { highlightText as highlightTextCore } from '../utils/helpers'
import { CrossIcon, SearchIcon } from './icons'

const SearchBar = ({ data }: { data: Data[] }) => {
  /**
   * States
   */
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState<typeof data>([])
  const [currIndex, setCurrIndex] = useState<number | null>(null)
  const [isKeyboardNav, setIsKeyboardNav] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  /**
   * Refs
   */
  const listContainerRef = useRef<HTMLUListElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (filteredData.length === 0) return

      switch (event.key) {
        case 'ArrowUp':
          setIsKeyboardNav(true)
          setCurrIndex((prevIndex) => (prevIndex === null ? filteredData.length - 1 : Math.max(prevIndex - 1, 0)))
          break
        case 'ArrowDown':
          setIsKeyboardNav(true)
          setCurrIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, filteredData.length - 1)))
          break
        case 'Enter':
          if (currIndex !== null) {
            handleSelection(filteredData[currIndex])
          }
          break
        case 'Escape':
          setSearch('')
          setCurrIndex(null)
          setFilteredData([])
          setIsDropdownOpen(false)
          break
        default:
          break
      }
    },
    [currIndex, filteredData]
  )

  // Handle click outside the search container to close the dropdown
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false)
      setCurrIndex(null)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [handleClickOutside, handleKeyDown])

  const handleSelection = (item: Data) => {
    console.log('Selected:', item)
    alert(`Selected: ${item.name}`)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrIndex(null)
    const value = e.target.value

    const filteredData = data.filter((item) => {
      // Fuzzy search
      return Object.values(item).some((val) => {
        if (Array.isArray(val)) return val.some((v) => v.toLowerCase().includes(value.toLowerCase()))

        return val.toString().toLowerCase().includes(value.toLowerCase())
      })
    })
    setFilteredData(filteredData)
  }

  useEffect(() => {
    if (currIndex !== null && listContainerRef.current) {
      const selectedItem = listContainerRef.current?.querySelector(`li:nth-child(${currIndex + 1})`)
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [currIndex, listContainerRef])

  const highlightText = useCallback((text: string) => highlightTextCore(text, search), [search])

  return (
    <div className='search-container' ref={searchContainerRef}>
      <SearchIcon />
      <input
        type='text'
        placeholder='Search users by ID, address, name ...'
        className='search-input'
        value={search}
        onChange={handleSearch}
        onFocus={() => setIsDropdownOpen(true)}
      />
      {search ? (
        <button
          type='button'
          onClick={() => {
            setSearch('')
            setCurrIndex(null)
            setIsDropdownOpen(false)
            setFilteredData([])
          }}
        >
          <CrossIcon className='cross-icon' />
        </button>
      ) : null}
      {search && isDropdownOpen ? (
        filteredData.length > 0 ? (
          <ul className='dropdown' ref={listContainerRef}>
            {filteredData.map((item, i) => (
              <li
                key={i}
                style={{ background: i === currIndex ? '#fffdbe' : 'transparent' }}
                onMouseEnter={() => (isKeyboardNav ? null : setCurrIndex(i))}
                onMouseMove={() => setIsKeyboardNav(false)}
                onClick={() => handleSelection(item)}
                role='option'
                tabIndex={0}
              >
                <p>{highlightText(item.id)}</p>
                <h1>{highlightText(item.name)}</h1>
                {getItemsIfExists(item.items, search).length ? (
                  <ul className='item-list'>
                    {getItemsIfExists(item.items, search).map((item, i) => (
                      <li key={i}>"{highlightText(item)}" found in items</li>
                    ))}
                  </ul>
                ) : null}
                <p>Address: {highlightText(item.address)}</p>
                <p>Pincode: {highlightText(item.pincode)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className='not-found'>No User Found</div>
        )
      ) : null}
    </div>
  )
}

const getItemsIfExists = (items: string[], searchTerm: string) => {
  return items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
}

export default SearchBar
