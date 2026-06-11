'use client'

import { useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'


type VimeoAnimationProps = {
  ln: string;
};



export default function VimeoAnimation({ ln }: VimeoAnimationProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<Player | null>(null)
  const progressBarFillRef = useRef<HTMLDivElement | null>(null)
  const timestampRef = useRef<HTMLSpanElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  const durationRef = useRef(0)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  useEffect(() => {
    setIframeKey(k => k + 1)
  }, [])

  const resetHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    setShowControls(true)
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

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

    playerRef.current?.destroy()
    playerRef.current = null

    const iframe = iframeRef.current

    const initPlayer = () => {
      const player = new Player(iframe)
      playerRef.current = player

      player.ready().then(() => {
        player.getDuration().then((d) => {
          durationRef.current = d
        })
      }).catch(() => {})

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
    }

    iframe.addEventListener('load', initPlayer, { once: true })

    return () => {
      iframe.removeEventListener('load', initPlayer)
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [iframeKey])

  const togglePlay = async () => {
    if (!playerRef.current) return
    if (isPlaying) {
      await playerRef.current.pause()
    } else {
      await playerRef.current.play()
    }
    resetHideTimer()
  }

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

  const handleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen()
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative rounded-[35px] overflow-hidden"
      style={{ paddingTop: '56.25%' }}
      onMouseEnter={resetHideTimer}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        setShowControls(false)
      }}
      onTouchStart={resetHideTimer}
    >
      <iframe
        key={iframeKey}
        ref={iframeRef}
        src= {`${ln}?controls=0`}
        title="Klattur introduction video"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute top-0 left-0 w-full h-full"
      />

      {hasStarted && (
        <div
          className="absolute top-0 left-0 w-full pointer-events-auto"
          style={{ bottom: '52px' }}
          onClick={togglePlay}
        />
      )}

      {!hasStarted && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] h-[21%] rounded-full  bg-[#13333E] hover:bg-[#254c5c] border-none cursor-pointer flex items-center justify-center hover:scale-110 active:scale-100"
        >
          <svg viewBox="0 0 24 24" fill="white" width="48%">
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </button>
      )}

      {hasStarted && (
        <>
          <div
            className={`absolute bottom-5.5 left-5.5 right-5.5 bg-[#254c5c] rounded-md flex items-center gap-2.5 px-3 py-1.5 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          >
            <button onClick={togglePlay} className="bg-transparent border-none text-white cursor-pointer p-0.5 flex items-center justify-center">
              {isPlaying
                ? <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                : <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><polygon points="8,5 19,12 8,19"/></svg>
              }
            </button>

            <span ref={timestampRef} className="text-white text-[13px] font-mono min-w-[38px]">
              00:00
            </span>

            <div
              ref={progressBarRef}
              onMouseDown={handleSeekMouseDown}
              onTouchStart={handleSeekTouchStart}
              className="flex-1 h-[3px] bg-white/30 cursor-pointer rounded-sm relative"
              style={{ touchAction: 'none' }}
            >
              <div ref={progressBarFillRef} className="w-0 h-full bg-white rounded-sm relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md -mr-1.5" />
              </div>
            </div>

            <button
              onClick={handleFullscreen}
              className="bg-transparent border-none text-white cursor-pointer p-0.5 flex items-center justify-center"
            >
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
