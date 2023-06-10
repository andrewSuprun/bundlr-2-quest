import React, { useState, useEffect } from 'react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import SuggestedProfile from '../components/SuggestedProfile'
import { useAccount } from 'wagmi'
import { SiSpringCreators } from 'react-icons/si'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Navigation, Pagination])

const RightNav = () => {
  const [suggestedProfileHandles, setSuggestedProfileHandles] = useState([])
  const { isConnected } = useAccount()

  useEffect(() => {
    // Hardcoded list of profiles to follow
    // BUILDOOOORS: Add your own profiles to this list
    const profiles = [
      'llamakahlo.test',
      'llamaanime.test',
      'llamablackandwhite.test',
      'llamafigurine.test',
    ]
    // Shuffle the order
    for (let i = profiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[profiles[i], profiles[j]] = [profiles[j], profiles[i]]
    }
    // Pick just 4
    setSuggestedProfileHandles(profiles.slice(0, 4))
  }, [])

  return (
    <div className="right-nav-container">
      {isConnected && (
        <>
          <div className="logo-container">
            <SiSpringCreators className="logo-icon" />
            <span className="logo-text">OnlyBundlr</span>
          </div>

          <h1 className="section-title">Suggested Profiles</h1>
          <div className="profiles-container">
            <Swiper
              className="swiper-container"
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {suggestedProfileHandles.map((suggestedProfileHandle, id) => (
                <SwiperSlide key={id}>
                  <SuggestedProfile handle={suggestedProfileHandle} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  )
}

export default RightNav
