import PropTypes from 'prop-types'
import React, { memo, useEffect, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import IconClose from '@/assets/svg/icon-close'
import IconArrowLeft from '@/assets/svg/icon-arrow-left'
import IconArrowRight from '@/assets/svg/icon-arrow-right'
import { BrowserWrapper } from './style'
import Indicator from '../Indicator'
import classNames from 'classnames'
import IconTriangleBottom from '@/assets/svg/icon-triangle-bottom'
import IconTriangleTop from '@/assets/svg/icon-triangle-top'

const PictureBrowser = memo((props) => {
  const { pictureUrls = [], closeClick } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isNext, setIsNext] = useState(true)
  const [showList, setShowList] = useState(true)
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])


  /** 事件处理的逻辑 */
  function closeBtnClickHandle() {
    document.body.style.overflow = "auto"
    if (closeClick) closeClick()
  }

  function controlClickHandle(isNext = true) {
    let newIndex = isNext ? currentIndex + 1 : currentIndex - 1
    if (newIndex < 0) newIndex = pictureUrls.length - 1
    if (newIndex > pictureUrls.length - 1) newIndex = 0
    setCurrentIndex(newIndex)
    setIsNext(isNext)
  }

  function bottomItemClickHandle(index) {
    setIsNext(index > currentIndex)
    setCurrentIndex(index)
  }

  return (
    <BrowserWrapper isNext={isNext} showList={showList}>
      <div className='top'>
        <span className='close-btn' onClick={closeBtnClickHandle}>
          <IconClose />
        </span>
      </div>
      <div className='slider'>
        <div className='control'>
          <div className="btn left" onClick={e => controlClickHandle(false)}>
            <IconArrowLeft width="77" height="77" />
          </div>
          <div className="btn right" onClick={e => controlClickHandle(true)}>
            <IconArrowRight width="77" height="77" />
          </div>
        </div>
        <div className='container'>
          <SwitchTransition mode='in-out'>
            <CSSTransition
              key={pictureUrls[currentIndex]}
              timeout={150}
              classNames="pic"
            >
              <img src={pictureUrls[currentIndex]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <div className='preview'>
        <div className='info'>
          <div className='desc'>
            <div className='count'>
              <span className='textLeft'>{currentIndex + 1}/{pictureUrls.length}:</span>
              <span className='textRight'> room Apartment 图片{currentIndex + 1}</span>
            </div>
            <div className='toggle' onClick={e => setShowList(!showList)}>
              <span>{showList ? "隐藏" : "显示"}照片列表</span>
              {showList ? <IconTriangleBottom /> : <IconTriangleTop />}
            </div>
          </div>
          <div className='list'>
            <Indicator selectIndex={currentIndex}>
              {
                pictureUrls.map((item, index) => {
                  return (
                    <div
                      className={classNames("item", { active: index === currentIndex })}
                      key={item}
                      onClick={e => bottomItemClickHandle(index)}
                    >
                      <img src={item} alt="" />
                    </div>
                  )
                })
              }
            </Indicator>
          </div>
        </div>
      </div>
    </BrowserWrapper>
  )
})

PictureBrowser.propTypes = {
  pictureUrls: PropTypes.array
}

export default PictureBrowser