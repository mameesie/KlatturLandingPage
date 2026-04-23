'use client'

import { useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'

export default function VimeoAnimation() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<Player | null>(null)
  const progressBarFillRef = useRef<HTMLDivElement | null>(null)
  const timestampRef = useRef<HTMLSpanElement | null>(null)

  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showControls, setShowControls] = useState(false)

  const durationRef = useRef(0)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Start/reset the auto-hide countdown
  const resetHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    setShowControls(true)
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false)
      setShowVolumeSlider(false)
    }, 3000)
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  useEffect(() => {
    if (!iframeRef.current) return

    const player = new Player(iframeRef.current)
    playerRef.current = player

    player.getDuration().then((d) => {
      durationRef.current = d
    })

    player.on('play', () => {
      setHasStarted(true)
      setIsPlaying(true)
    })

    player.on('pause', () => setIsPlaying(false))

    player.on('timeupdate', (data) => {
      if (progressBarFillRef.current) {
        progressBarFillRef.current.style.width = `${data.percent * 100}%`
      }
      if (timestampRef.current) {
        timestampRef.current.textContent = formatTime(data.seconds)
      }
    })

    return () => {
      player.destroy()
    }
  }, [])

  const togglePlay = async () => {
    if (!playerRef.current) return
    if (isPlaying) {
      await playerRef.current.pause()
    } else {
      await playerRef.current.setVolume(volume)
      await playerRef.current.play()
    }
    resetHideTimer()
  }

  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)

  const seekToPosition = async (clientX: number) => {
    if (!playerRef.current || !progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const percent = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    if (progressBarFillRef.current) {
      progressBarFillRef.current.style.width = `${percent * 100}%`
    }
    await playerRef.current.setCurrentTime(percent * durationRef.current)
    resetHideTimer()
  }

  const handleSeekMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true
    seekToPosition(e.clientX)

    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) seekToPosition(e.clientX)
    }
    const onMouseUp = () => {
      isDraggingRef.current = false
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const handleSeekTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true
    seekToPosition(e.touches[0].clientX)

    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) seekToPosition(e.touches[0].clientX)
    }
    const onTouchEnd = () => {
      isDraggingRef.current = false
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
  }

  const handleVolume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setVolume(v)
    await playerRef.current?.setVolume(v)
    resetHideTimer()
  }

  const handleFullscreen = () => {
    iframeRef.current?.requestFullscreen()
  }

  const VolumeIcon = () => {
    if (volume === 0) return (
      <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
    )
    if (volume < 0.5) return (
      <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
        <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
      </svg>
    )
    return (
      <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
    )
  }

  return (
    <div
      className="relative rounded-[35px] overflow-hidden"
      style={{ paddingTop: '56.25%' }}
      onMouseEnter={resetHideTimer}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        setShowControls(false)
        setShowVolumeSlider(false)
      }}
      onTouchStart={resetHideTimer}
    >
      {/* iframe — always receives pointer events so Vimeo error buttons work */}
      <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1184349934?controls=0"
        allow="autoplay; fullscreen; picture-in-picture"
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Transparent overlay — sits above iframe to intercept clicks for our controls,
          but only covers the area above the controls bar so error buttons remain clickable */}
      {hasStarted && (
        <div
          className="absolute top-0 left-0 w-full pointer-events-auto"
          style={{ bottom: '52px' }}
          onClick={togglePlay}
        />
      )}

      {/* Center Play */}
      {!hasStarted && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] h-[21%] rounded-full bg-[#254c5c] border-none cursor-pointer flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="white" width="48%">
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </button>
      )}

      {hasStarted && (
        <>
          {/* Vertical volume panel */}
          <div
            className={`absolute bottom-[62px] right-[64px] bg-[#254c5c] rounded-lg px-2.5 py-3 flex flex-col items-center transition-opacity duration-200 ${showVolumeSlider && showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              className="cursor-pointer accent-white bg-[#254c5c] volume-slider" 
              style={{
                writingMode: 'vertical-lr' as React.CSSProperties['writingMode'],
                direction: 'rtl' as React.CSSProperties['direction'],
                height: '80px',
                width: '4px',
              }}
            />
          </div>

          {/* Controls bar */}
          <div
            className={`absolute bottom-5.5 left-5.5 right-5.5 bg-[#254c5c] rounded-md flex items-center gap-2.5 px-3 py-1.5 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Play/Pause */}
            <button onClick={togglePlay} className="bg-transparent border-none text-white cursor-pointer p-0.5 flex items-center justify-center">
              {isPlaying
                ? <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                : <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><polygon points="8,5 19,12 8,19"/></svg>
              }
            </button>

            {/* Timestamp */}
            <span ref={timestampRef} className="text-white text-[13px] font-mono min-w-[38px]">
              00:00
            </span>

            {/* Progress bar */}
            <div
              ref={progressBarRef}
              onMouseDown={handleSeekMouseDown}
              onTouchStart={handleSeekTouchStart}
              className="flex-1 h-[3px] bg-white/30 cursor-pointer rounded-sm relative"
              style={{ touchAction: 'none' }}
            >
              <div ref={progressBarFillRef} className="w-0 h-full bg-white rounded-sm relative">
                {/* Drag handle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md -mr-1.5" />
              </div>
            </div>

            {/* Volume icon */}
            <button
              onClick={() => { setShowVolumeSlider(v => !v); resetHideTimer() }}
              className="bg-transparent border-none text-white cursor-pointer p-0.5 flex items-center justify-center"
            >
              <VolumeIcon />
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="bg-transparent border-none text-white cursor-pointer p-0.5 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
