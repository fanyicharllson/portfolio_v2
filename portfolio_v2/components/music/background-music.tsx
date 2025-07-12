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
  Trash2,
  FileAudio,
  X,
  Upload,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { defaultPlaylist, Track } from "@/public/myMusic";
import { toast } from "@/hooks/use-toast";

export function BackgroundMusic() {
  const [playlist, setPlaylist] = useState<Track[]>(defaultPlaylist);
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

  // Upladong custom Music
  const customObjectUrls = useRef<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupObjectUrls();
    };
  }, []);

  // Cleanup function for object URLs(Clean up mp3 files after use)
  const cleanupObjectUrls = () => {
    customObjectUrls.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    customObjectUrls.current.clear();
  };

  // Get audio duration
  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      const objectUrl = URL.createObjectURL(file);

      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration || 180; // fallback to 3 minutes
        URL.revokeObjectURL(objectUrl);
        resolve(duration);
      });

      audio.addEventListener("error", () => {
        URL.revokeObjectURL(objectUrl);
        resolve(180); // fallback duration
      });

      audio.src = objectUrl;
    });
  };

  // Handle file upload
  const handleFileUpload = async (files: FileList | File[]) => {
    setIsUploading(true);

    try {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(validateFile);

      if (validFiles.length === 0) {
        setIsUploading(false);
        return;
      }

      const newTracks: Track[] = [];

      for (const file of validFiles) {
        const objectUrl = URL.createObjectURL(file);
        customObjectUrls.current.add(objectUrl);

        const duration = await getAudioDuration(file);

        const track: Track = {
          id: `custom-${Date.now()}-${Math.random()}`,
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          artist: "Custom Upload",
          url: objectUrl,
          duration,
          scrollSpeed: 0.5,
          isCustom: true,
          file,
          objectUrl,
        };

        newTracks.push(track);
      }

      setPlaylist((prev) => [...prev, ...newTracks]);

      setIsExpanded(true);

      toast({
        title: "Music Uploaded! 🎵",
        description: `Added ${newTracks.length} track(s) to your playlist.`,
      });

      setShowUpload(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Upload Error",
        description: "Failed to upload music files.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Remove custom track
  const removeCustomTrack = (trackId: string) => {
    const track = playlist.find((t) => t.id === trackId);
    if (track?.isCustom && track.objectUrl) {
      URL.revokeObjectURL(track.objectUrl);
      customObjectUrls.current.delete(track.objectUrl);
    }

    setPlaylist((prev) => prev.filter((t) => t.id !== trackId));

    // Adjust current track index if needed
    const trackIndex = playlist.findIndex((t) => t.id === trackId);
    if (trackIndex <= currentTrack && currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }

    toast({
      title: "Track Removed",
      description: "Custom track removed and resources freed.",
    });
  };

  // Clear all custom tracks
  const clearCustomTracks = () => {
    playlist.forEach((track) => {
      if (track.isCustom && track.objectUrl) {
        URL.revokeObjectURL(track.objectUrl);
        customObjectUrls.current.delete(track.objectUrl);
      }
    });

    setPlaylist(defaultPlaylist);
    setCurrentTrack(0);

    toast({
      title: "Custom Music Cleared",
      description: "All custom tracks removed and resources freed.",
    });
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  // File validation
  const validateFile = (file: File): boolean => {
    // Check file type
    if (
      !file.type.startsWith("audio/") ||
      !file.name.toLowerCase().endsWith(".mp3")
    ) {
      toast({
        title: "Invalid File Type",
        description: "Please upload MP3 files only.",
        variant: "destructive",
      });
      return false;
    }

    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload files smaller than 50MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

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

  const customTracksCount = playlist.filter((t) => t.isCustom).length;

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={currentTrackData?.url}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp3,audio/mp3"
        multiple
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        className="hidden"
      />

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="p-6 bg-slate-900/95 backdrop-blur-md border-slate-700/50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FileAudio className="h-5 w-5 text-blue-400" />
                      Upload Your Music
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowUpload(false)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-sm text-slate-300 space-y-2">
                    <p>• Only MP3 files are supported</p>
                    <p>• Maximum file size: 50MB</p>
                    <p>• Files are automatically removed when you leave</p>
                  </div>

                  {/* Drag and Drop Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      dragOver
                        ? "border-blue-400 bg-blue-400/10"
                        : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 font-medium mb-2">
                      {dragOver
                        ? "Drop your MP3 files here"
                        : "Drag & drop MP3 files here"}
                    </p>
                    <p className="text-slate-500 text-sm mb-4">or</p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                      {isUploading ? "Uploading..." : "Choose Files"}
                    </Button>
                  </div>

                  {/* Custom tracks management */}
                  {customTracksCount > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                          Custom tracks: {customTracksCount}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearCustomTracks}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Clear All
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <Card className="p-4 w-80 bg-slate-900/95 backdrop-blur-md border-slate-700/50 overflow-y-auto max-h-95">
                <div className="space-y-3">
                  {/* Header with Upload Button */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm">
                      Music Player
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowUpload(true);
                        setIsExpanded(false);
                      }}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 h-8 px-3 text-xs font-medium cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Music
                    </Button>
                  </div>
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
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400 font-medium">
                        Playlist ({playlist.length} tracks)
                      </p>
                      {customTracksCount > 0 && (
                        <span className="text-xs text-blue-400">
                          {customTracksCount} custom
                        </span>
                      )}
                    </div>
                    {playlist.map((track, index) => (
                      <div
                        key={track.id}
                        className={`flex items-center justify-between text-xs p-1 rounded transition-colors ${
                          index === currentTrack
                            ? "bg-blue-600/30 text-blue-300"
                            : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setCurrentTrack(index);
                            setCurrentTime(0);
                            if (isPlaying) {
                              setTimeout(() => audioRef.current?.play(), 100);
                            }
                          }}
                          className="flex-1 text-left flex items-center gap-1"
                        >
                          {track.isCustom && (
                            <FileAudio className="h-3 w-3 text-blue-400" />
                          )}
                          <span className="truncate">
                            {track.title} - {track.artist}
                          </span>
                        </button>
                        {track.isCustom && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCustomTrack(track.id)}
                            className="text-red-400 hover:text-red-300 h-6 w-6 p-0 ml-1"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="text-xs text-slate-500 text-center pt-2 border-t border-slate-700/50">
                    🎵 Custom Music Player •{" "}
                    {customTracksCount > 0
                      ? `${customTracksCount} Custom`
                      : "Default"}{" "}
                    • Auto-cleanup
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
            className={`w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 cursor-pointer ${
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
