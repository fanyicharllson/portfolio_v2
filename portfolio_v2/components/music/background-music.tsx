/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  SkipForward,
  SkipBack,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { playlist } from "@/public/myMusic";

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showSetupMessage, setShowSetupMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      setIsLoading(false);
      setHasError(false);
      console.log("Audio loaded successfully:", playlist[currentTrack].title);
    };

    const handleError = (e: Event) => {
      setHasError(true);
      setIsLoaded(false);
      setIsLoading(false);
      setIsPlaying(false);
      console.error("Audio failed to load:", playlist[currentTrack].url, e);
    };

    const handleEnded = () => nextTrack();

    const handleCanPlay = () => {
      setIsLoading(false);
      setIsLoaded(true);
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    // Load the current track
    audio.load();

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (hasError) {
      setShowSetupMessage(true);
      setTimeout(() => setShowSetupMessage(false), 3000);
      return;
    }

    try {
      if (isPlaying) {
        await audio.pause();
        setIsPlaying(false);
      } else {
        // Ensure audio is loaded before playing
        if (audio.readyState < 2) {
          setIsLoading(true);
          await new Promise((resolve) => {
            const handleCanPlay = () => {
              audio.removeEventListener("canplay", handleCanPlay);
              resolve(true);
            };
            audio.addEventListener("canplay", handleCanPlay);
          });
          setIsLoading(false);
        }

        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setHasError(true);
      setIsPlaying(false);
      setShowSetupMessage(true);
      setTimeout(() => setShowSetupMessage(false), 3000);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextIndex);
    setCurrentTime(0);
    setIsLoaded(false);
    setHasError(false);
    setIsLoading(false);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(() => {
          setHasError(true);
          setIsPlaying(false);
        });
      }, 500);
    }
  };

  const prevTrack = () => {
    const prevIndex =
      currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setCurrentTime(0);
    setIsLoaded(false);
    setHasError(false);
    setIsLoading(false);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(() => {
          setHasError(true);
          setIsPlaying(false);
        });
      }, 500);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentTrackData = playlist[currentTrack];
  const progress =
    currentTrackData && audioRef.current && audioRef.current.duration
      ? (currentTime / audioRef.current.duration) * 100
      : 0;

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={currentTrackData?.url}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Setup Message */}
      <AnimatePresence>
        {showSetupMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 right-6 z-50"
          >
            <Card className="p-4 bg-amber-900/95 backdrop-blur-md border-amber-700/50 max-w-xs">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-amber-100 font-medium mb-1">Audio Error</p>
                  <p className="text-amber-200/80 text-xs">
                    Failed to load audio. Check your internet connection or try
                    another track.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Player */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="fixed bottom-30 right-6 z-50"
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <Card className="p-4 w-80 bg-slate-900/95 backdrop-blur-md border-slate-700/50">
                <div className="space-y-3">
                  {/* Track Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {currentTrackData?.title}
                      {hasError && (
                        <span className="text-red-400 ml-2">(Error)</span>
                      )}
                      {isLoading && (
                        <span className="text-blue-400 ml-2">(Loading...)</span>
                      )}
                    </h3>
                    <p className="text-slate-400 text-xs truncate">
                      {currentTrackData?.artist}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-700 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-1000 ${
                          hasError
                            ? "bg-red-500"
                            : isLoading
                            ? "bg-blue-500 animate-pulse"
                            : "bg-gradient-to-r from-blue-500 to-purple-500"
                        }`}
                        style={{
                          width: `${hasError ? 0 : isLoading ? 50 : progress}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>
                        {formatTime(
                          audioRef.current?.duration ||
                            currentTrackData?.duration ||
                            0
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevTrack}
                      disabled={isLoading}
                      className="text-slate-300 hover:text-white h-8 w-8 p-0 disabled:opacity-50"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      disabled={isLoading}
                      className={`text-slate-300 hover:text-white h-10 w-10 p-0 disabled:opacity-50 ${
                        hasError
                          ? "bg-red-800/50"
                          : isLoading
                          ? "bg-blue-800/50"
                          : "bg-slate-800/50"
                      }`}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          <Music className="h-5 w-5" />
                        </motion.div>
                      ) : hasError ? (
                        <AlertCircle className="h-5 w-5" />
                      ) : isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextTrack}
                      disabled={isLoading}
                      className="text-slate-300 hover:text-white h-8 w-8 p-0 disabled:opacity-50"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-slate-300 hover:text-white h-6 w-6 p-0"
                    >
                      {isMuted ? (
                        <VolumeX className="h-3 w-3" />
                      ) : (
                        <Volume2 className="h-3 w-3" />
                      )}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={(value) => setVolume(value[0] / 100)}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>

                  {/* Track List */}
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    <p className="text-xs text-slate-400 font-medium">
                      Playlist:
                    </p>
                    {playlist.map((track, index) => (
                      <button
                        key={track.id}
                        onClick={() => {
                          setCurrentTrack(index);
                          setCurrentTime(0);
                          if (isPlaying) {
                            setTimeout(() => audioRef.current?.play(), 100);
                          }
                        }}
                        className={`w-full text-left text-xs p-1 rounded transition-colors ${
                          index === currentTrack
                            ? "bg-blue-600/30 text-blue-300"
                            : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                        }`}
                      >
                        {track.title} - {track.artist}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${
              hasError
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : isLoading
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            <motion.div
              animate={{
                rotate: isPlaying ? 360 : 0,
                scale: isPlaying ? [1, 1.1, 1] : 1,
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                },
                scale: {
                  duration: 0.5,
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                },
              }}
            >
              {hasError ? (
                <AlertCircle className="h-6 w-6" />
              ) : isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Music className="h-6 w-6" />
                </motion.div>
              ) : (
                <Music className="h-6 w-6" />
              )}
            </motion.div>
            <span className="sr-only">Toggle music player</span>
          </Button>
        </motion.div>

        {/* Status Indicators */}
        <AnimatePresence>
          {isPlaying && !hasError && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </motion.div>
          )}

          {hasError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
