import React from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title }) => {
  return (
    <div className="w-full max-w-5xl aspect-video bg-black rounded-xl shadow-2xl shadow-purple-500/30 overflow-hidden">
      <iframe
        className="w-full h-full"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
