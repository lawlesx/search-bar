import { useEffect, useState } from 'react'

export type Data = {
  id: string
  name: string
  items: string[]
  address: string
  pincode: string
}

const useMockData = () => {
  const [data, setData] = useState<Data[]>([])

  // Fetch data from API
  useEffect(() => {
    fetch('https://mocki.io/v1/a0f57a34-3afb-467e-94dd-b6fc5d2e28af')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return { data }
}

export default useMockData
