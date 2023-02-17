import PropTypes from 'prop-types'
import React, { memo, useRef, useState } from 'react'
import { Rating } from '@mui/material'
import { ItemWrapper } from './style'
import { Carousel } from 'antd'
import IconArrowLeft from '@/assets/svg/icon-arrow-left'
import IconArrowRight from '@/assets/svg/icon-arrow-right'
import Indicator from '@/base-ui/Indicator';
import classNames from 'classnames'

const RoomItem = memo((props) => {
  const { itemData, itemWidth = "25%", itemClick } = props
  const [selectIndex, setSelectIndex] = useState(0)
  const sliderRef = useRef()

  function controlClickHandle(isRight = true, event) {
    if (isRight) sliderRef.current.next()
    else sliderRef.current.prev()

    let newIndex = isRight ? selectIndex + 1 : selectIndex - 1
    if (newIndex < 0) newIndex = itemData.picture_urls.length - 1
    if (newIndex > itemData.picture_urls.length - 1) newIndex = 0
    setSelectIndex(newIndex)
    //阻止冒泡
    event.stopPropagation()
  }

  function itemClickHandle() {
    if (itemClick) itemClick(itemData)
  }

  const pictureElement = (
    <div className="cover">
      <img src={itemData.picture_url} alt="" />
    </div>
  )
  const sliderElement = (
    <div className="slider">
      <div className="control">
        <div className="btn left" onClick={e => controlClickHandle(false, e)}>
          <IconArrowLeft width="30" height="30" />
        </div>
        <div className="btn right" onClick={e => controlClickHandle(true, e)}>
          <IconArrowRight width="30" height="30" />
        </div>
      </div>
      <div className='indicator'>
        <Indicator selectIndex={selectIndex}>
          {
            itemData.picture_urls?.map((item, index) => {
              return (
                <div className='item' key={item}>
                  <span className={classNames("dot", { active: selectIndex === index })}></span>
                </div>
              )
            })
          }
        </Indicator>
      </div>
      <Carousel dots={false} ref={sliderRef}>
        {
          itemData.picture_urls?.map(item => {
            return (
              <div className='cover' key={item}>
                <img src={itemData.picture_url} alt="" />
              </div>
            )
          })
        }
      </Carousel>
    </div>
  )


  return (
    <ItemWrapper
      verifyColor={itemData?.verify_info?.text_color || "#39576a"}
      itemWidth={itemWidth}
      onClick={itemClickHandle}
    >
      <div className='inner'>
        {!itemData.picture_urls ? pictureElement : sliderElement}
        <div className='desc'>
          {itemData.verify_info.messages.join(" · ")}
        </div>
        <div className='name'>{itemData.name}</div>
        <div className='price'>¥{itemData.price}/晚</div>
        <div className='bottom'>
          <Rating
            value={itemData.star_rating ?? 5}
            precision={0.1}
            readOnly
            sx={{ fontSize: "12px", color: "#00848A", marginRight: "-1px" }}
          />
          <span className='count'>{itemData.reviews_count}</span>
          {
            itemData.bottom_info && <span className='extra'>·{itemData.bottom_info?.content}</span>
          }
        </div>
      </div>
    </ItemWrapper >
  )
})

RoomItem.propTypes = {
  itemData: PropTypes.object
}

export default RoomItem