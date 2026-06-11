'use client'

import { useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'

type VimeoAnimationProps = {
  ln: string
}

interface WebkitDocument extends Document {
  webkitFullscreenElement: Element | null
  webkitExitFullscreen: () => Promise<void>
}

interface WebkitHTMLElement extends HTMLDivElement {
  webkitRequestFullscreen: () => Promise<void>
}

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
  // iOS: when the first (unmuted) play gets force-paused, we keep the video
  // paused and show a "Tap to play with sound" overlay. The second tap is a
  // fresh gesture and the opening is already buffered, so the unmuted resume
  // starts instantly and the gesture stays live -> sound plays.
  const [needsSoundTap, setNeedsSoundTap] = useState(false)

  // ---- DEBUG (remove once confirmed) ----
  const [debugLog, setDebugLog] = useState<string[]>([])
  const log = (msg: string) => {
    const t = new Date().toISOString().substr(14, 9)
    setDebugLog((l) => [...l.slice(-11), `${t} ${msg}`])
  }
  // ---------------------------------------

  const durationRef = useRef(0)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)
  const playRetryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const userPausedRef = useRef(false)
  const playingAtRef = useRef(0)

  useEffect(() => {
    const onChange = () => {
      const doc = document as WebkitDocument
      setIsFullscreen(!!(document.fullscreenElement || doc.webkitFullscreenElement))
    }
    document.addEventListener('fullscreenchange', onChange)
    document.addEventListener('webkitfullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      document.removeEventListener('webkitfullscreenchange', onChange)
    }
  }, [])

  useEffect(() => {
    setIframeKey(k => k + 1)
  }, [])

  const resetHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    setShowControls(true)
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000)
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

  const stopPlayRetry = () => {
    if (playRetryTimerRef.current) {
      clearInterval(playRetryTimerRef.current)
      playRetryTimerRef.current = null
    }
  }

  useEffect(() => {
    if (!iframeRef.current) return

    playerRef.current?.destroy()
    playerRef.current = null

    const iframe = iframeRef.current

    const initPlayer = () => {
      log('iframe loaded, init player')
      const player = new Player(iframe)
      playerRef.current = player

      player.ready()
        .then(() => {
          log('player ready')
          player.getDuration().then((d) => { durationRef.current = d })
        })
        .catch((e) => log(`ready err ${e?.name}`))

      player.on('play', () => {
        log('evt: play')
        setHasStarted(true)
        setIsPlaying(true)
      })
      player.on('playing', () => {
        log('evt: playing')
        stopPlayRetry()
        playingAtRef.current = Date.now()
        // We're actually playing now — hide the overlay if it was up.
        setNeedsSoundTap(false)
        player.getMuted().then((m) => log(`getMuted -> ${m}`)).catch(() => {})
      })
      player.on('pause', () => {
        log('evt: pause')
        setIsPlaying(false)
        const sincePlaying = Date.now() - playingAtRef.current
        // An involuntary pause right after playback started = iOS blocking
        // unmuted audio. Keep it paused and ask for a fresh tap.
        if (!userPausedRef.current && sincePlaying < 1500) {
          log('involuntary pause -> show tap-to-play overlay')
          setNeedsSoundTap(true)
        }
      })
      player.on('bufferstart', () => log('evt: bufferstart'))
      player.on('bufferend', () => log('evt: bufferend'))
      player.on('error', (e: { name?: string; message?: string }) =>
        log(`evt: ERROR ${e?.name} ${e?.message ?? ''}`)
      )
      player.on('timeupdate', (data) => {
        if (progressBarFillRef.current) {
          progressBarFillRef.current.style.width = `${data.percent * 100}%`
        }
        if (timestampRef.current) {
          timestampRef.current.textContent = formatTime(data.seconds)
        }
      })
      player.on('fullscreenchange', (data: { fullscreen: boolean }) => {
        setIsFullscreen(data.fullscreen)
      })
    }

    iframe.addEventListener('load', initPlayer, { once: true })

    return () => {
      stopPlayRetry()
      iframe.removeEventListener('load', initPlayer)
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [iframeKey])

  // First tap: attempt unmuted playback within the gesture.
  // Desktop/Android -> plays with sound, done. iOS -> may force-pause,
  // which the pause handler turns into the "Tap to play with sound" overlay.
  const togglePlay = () => {
    const p = playerRef.current
    if (!p) { log('togglePlay: no player'); return }
    if (isPlaying) {
      log('togglePlay -> pause (user)')
      userPausedRef.current = true
      stopPlayRetry()
      p.pause().catch((e) => log(`pause() rej ${e?.name}`))
    } else {
      log('togglePlay -> play (unmuted attempt)')
      userPausedRef.current = false
      p.setMuted(false).catch(() => {})
      p.play()
        .then(() => log('play() resolved'))
        .catch((e: Error) => log(`play() rej ${e.name}`))

      // Mobile: the first play() can stall in buffering before it ever
      // reaches 'playing'. Retry until it starts (or 'playing' stops us).
      stopPlayRetry()
      let attempts = 0
      playRetryTimerRef.current = setInterval(() => {
        attempts += 1
        if (attempts > 12 || userPausedRef.current) { stopPlayRetry(); return }
        p.getPaused().then((paused) => {
          log(`retry ${attempts}: paused=${paused}`)
          if (!paused) { stopPlayRetry(); return }
          p.play().catch(() => {})
        }).catch(() => stopPlayRetry())
      }, 800)
    }
    resetHideTimer()
  }

  // Second tap (overlay): fresh gesture + already-buffered opening, so the
  // unmuted resume starts instantly and iOS lets the sound through.
  const handleTapToPlay = () => {
    const p = playerRef.current
    if (!p) return
    log('tapToPlay -> unmute + play')
    userPausedRef.current = false
    setNeedsSoundTap(false)
    p.setMuted(false).catch(() => {})
    p.play()
      .then(() => log('tapToPlay play() resolved'))
      .catch((e: Error) => log(`tapToPlay play() rej ${e.name}`))
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
    const onMouseMove = (e: MouseEvent) => { if (isDraggingRef.current) seekToPosition(e.clientX) }
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
    const onTouchMove = (e: TouchEvent) => { if (isDraggingRef.current) seekToPosition(e.touches[0].clientX) }
    const onTouchEnd = () => {
      isDraggingRef.current = false
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
  }

  const handleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    const doc = document as WebkitDocument
    const elWebkit = el as WebkitHTMLElement
    const canRequestNative = !!(el.requestFullscreen || elWebkit.webkitRequestFullscreen)
    if (canRequestNative) {
      if (isFullscreen) {
        const exit = document.exitFullscreen ?? doc.webkitExitFullscreen
        exit?.call(document)
      } else {
        const enter = el.requestFullscreen ?? elWebkit.webkitRequestFullscreen
        enter?.call(el)
      }
    } else {
      try {
        const currentlyFullscreen = await playerRef.current?.getFullscreen()
        if (currentlyFullscreen) {
          await playerRef.current?.exitFullscreen()
        } else {
          await playerRef.current?.requestFullscreen()
        }
      } catch {}
    }
  }

  const src = `${ln}${ln.includes('?') ? '&' : '?'}controls=0&playsinline=1`

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
        src={src}
        title="Klattur introduction video"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* ---- DEBUG OVERLAY (remove once confirmed) ---- */}
      <div className="absolute top-2 left-2 z-50 max-w-[80%] bg-black/75 text-green-400 text-[10px] leading-tight font-mono p-2 rounded pointer-events-none whitespace-pre-wrap">
        {debugLog.length === 0 ? 'waiting...' : debugLog.join('\n')}
      </div>
      {/* ----------------------------------------------- */}

      {/* Click layer to toggle play while playing (sits below the sound overlay) */}
      {hasStarted && !needsSoundTap && (
        <div
          className="absolute top-0 left-0 w-full pointer-events-auto"
          style={{ bottom: '52px' }}
          onClick={togglePlay}
        />
      )}

      {/* Initial big play button */}
      {!hasStarted && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] h-[21%] rounded-full bg-[#13333E] hover:bg-[#254c5c] active:bg-[#254c5c] border-none cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="white" width="48%">
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </button>
      )}

      {/* "Tap to play with sound" overlay (iOS, after the unmuted attempt was blocked) */}
      {hasStarted && needsSoundTap && (
        <button
          onClick={handleTapToPlay}
          className="absolute inset-0 z-20 w-full h-full bg-black/40 border-none cursor-pointer flex flex-col items-center justify-center gap-3"
        >
          <span className="w-[12%] h-[21%] min-w-[44px] min-h-[44px] rounded-full bg-[#13333E] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" width="48%">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </span>
          <span className="text-white text-[15px] font-medium flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            Tap to play with sound
          </span>
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
