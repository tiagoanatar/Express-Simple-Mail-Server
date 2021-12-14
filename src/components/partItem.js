import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export const PartItem = ({ item, parts, setParts }) => {

  // selected state
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (parts.includes(item['Catalog or Item Number']) === true){
      setSelected(true)
    } else {
      setSelected(false)
    }
  },[parts])

  return (
    <tr>
      <td>{item['Manufacturer']}</td>
      <td>{item['Catalog or Item Number']}</td>
      <td style={{fontSize:'70%'}}>{item['Description'].split('.').join(' ')}</td>
      <td>
        { selected 
        ? (<Button 
          variant="dark"
          onClick={() => {
            const removedItem = parts.filter((subItem) => item['Catalog or Item Number'] !== subItem)
            setParts(removedItem)
            setSelected(!selected)
          }
          }>
          Remove Part
        </Button>) 
        : (<Button 
          variant="primary" 
          onClick={() => {
            setParts([...parts, item['Catalog or Item Number']])
            setSelected(!selected)
          }
        }>
          Select Part
        </Button>)}
      </td>
    </tr>
  )
}