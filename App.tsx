
import React, { useState, useEffect, useCallback } from 'react';
import { Video } from './types';
import { fetchVideos } from './services/videoService';
import VideoPlayer from './components/VideoPlayer';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoading(true);
        const fetchedVideos = await fetchVideos();
        if (fetchedVideos.length === 0) {
          setError('Xem sẻ ếch vui vẻ...');
        } else {
          setVideos(fetchedVideos);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Lỗi không xác định...');
      } finally {
        setIsLoading(false);
      }
    };
    loadVideos();
  }, []);

  const handleNextVideo = useCallback(() => {
    setCurrentIndex((prevIndex) => {
     
      const nextIndex = prevIndex + 1;
      return nextIndex >= videos.length ? 0 : nextIndex;
    });
  }, [videos.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
        <p className="text-xl font-semibold">Xem cho vui chứ đừng sục</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-400 p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-3xl font-bold mb-2">Ôi không! HẾT SỤC RỒI!</h2>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <p>KHÔNG CÓ PHIM ĐANG LỖI!!!! :___0</p>
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200 p-4 sm:p-6 md:p-8 transition-colors duration-500">
      <div className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 truncate" title={currentVideo.title}>
          {currentVideo.title || "Một thước phim không tên..."}
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-2">
          Đang chiếu phim {currentIndex + 1} trên tổng số {videos.length}
        </p>
      </div>
      
      <VideoPlayer key={currentVideo.id || currentIndex} src={currentVideo.link} title={currentVideo.title} />

      <div className="mt-8 text-center">
        <p className="text-gray-500 mb-4 italic">BỘ NÀY KHÔNG HAY TA SANG BỘ KHÁC</p>
        <button
          onClick={handleNextVideo}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg shadow-purple-500/20 transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Món Tiếp Theo
        </button>
      </div>
    </div>
  );
};

export default App;
