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
  // True only when the *user* pressed pause — blocks the auto-resume below.
  const userPausedRef = useRef(false)
  // Counts involuntary auto-resumes so a device that never unmutes can't loop forever.
  const resumeAttemptsRef = useRef(0)

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

  // Resume playback with sound. Used both for the very first play and for the
  // involuntary (muted) auto-resume. setMuted(false)+play() with no awaits
  // between, to keep the user-activation intact.
  const playWithSound = () => {
    const p = playerRef.current
    if (!p) return
    userPausedRef.current = false
    p.setMuted(false).catch(() => {})
    p.play()
      .then(() => log('play() resolved'))
      .catch((e: Error) => log(`play() rej ${e.name}`))
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
        player.getMuted().then((muted) => {
          log(`getMuted -> ${muted}`)
          if (muted && resumeAttemptsRef.current < 5) {
            // iOS started playback muted despite our unmute request. Briefly
            // pause it — the pause handler immediately resumes WITH sound, and
            // that gesture-chained resume is what makes the audio stick.
            log('muted -> pause to trigger unmuted resume')
            player.pause().catch(() => {})
          } else if (!muted) {
            // Real sound is playing — reset the safety counter.
            resumeAttemptsRef.current = 0
          }
        }).catch(() => {})
      })

      player.on('pause', () => {
        log('evt: pause')
        setIsPlaying(false)
        // User-initiated pause: respect it, do not resume.
        if (userPausedRef.current) {
          log('user pause - staying paused')
          return
        }
        // Safety cap so a device that never unmutes can't flicker forever.
        if (resumeAttemptsRef.current >= 5) {
          log('resume cap reached - staying paused')
          return
        }
        resumeAttemptsRef.current += 1
        log(`involuntary pause -> auto resume #${resumeAttemptsRef.current}`)
        playWithSound()
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

  const togglePlay = () => {
    const p = playerRef.current
    if (!p) { log('togglePlay: no player'); return }
    if (isPlaying) {
      log('togglePlay -> pause (user)')
      userPausedRef.current = true
      stopPlayRetry()
      p.pause().catch((e) => log(`pause() rej ${e?.name}`))
    } else {
      log('togglePlay -> play')
      resumeAttemptsRef.current = 0
      playWithSound()

      // Mobile: first play() can stall in buffering before reaching 'playing'.
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] h-[21%] rounded-full bg-[#13333E] hover:bg-[#254c5c] active:bg-[#254c5c] border-none cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95"
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
