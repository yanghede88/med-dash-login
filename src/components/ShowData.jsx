import { memo, useState, useCallback } from 'react'
import { Card, Tag } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import useGenerateRandomData from './useGenerateRandomData'

const CloseButton = ({ onClose }) => <SvgIcon iconName="close" onClick={onClose} />

const ShowData = () => {
  // Generate random data for the cards 
   const [data, setData] = useState(
    Array.from({ length: 4}, useGenerateRandomData())
  )
  // close the cards
  const handleCloseCard = useCallback(
    (id) => {
      setData([...data.filter((item) => item.id !== id)])
    },
    [data]
  )


  function onCloseClick(id) {
    handleCloseCard(id)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map(({ title, id, color, list }) => (
        <Card
          title={title}
          bordered={false}
          key={id}
          extra={<CloseButton onClose={() => onCloseClick(id)} />}
        >
          {list.map(({ title: innerTitle, desc: innerDesc }, idx) => (
  <div className="flex justify-between items-center mb-2" key={idx}>
    <span>{innerTitle}</span>
    <Tag className="px-4" color={color}>
      {innerDesc}
    </Tag>
  </div>
))}
        </Card>
      ))}
    </div>
  )
}

export default ShowData;
