import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Player } from 'media-stream-player'

// Force a login by fetching usergroup
const authorize = async (host) => {
  try {
    await window.fetch('/axis-cgi/usergroup.cgi', {
      credentials: 'include',
      mode: 'no-cors',
    })
  } catch (err) {
    console.error(err)
  }
}

/**
 * Example application that uses the `Player` component.
 */

export const SingleStream = () => {
  const [authorized, setAuthorized] = useState(false)

  let vapixParams = {}
  try {
    vapixParams = JSON.parse(window.localStorage.getItem('vapix')) ?? {}
  } catch (err) {
    console.warn('no stored VAPIX parameters: ', err)
  }

  useEffect(() => {
    authorize().then(() => {
      setAuthorized(true)
    })
  }, [])

  return (
    <>
      {authorized ? (
        <Player
          hostname={window.location.host}
          initialFormat="RTP_H264"
          autoPlay
          vapixParams={vapixParams}
        />
      ) : (
        <div>loading...</div>
      )}
    </>
  )
}
