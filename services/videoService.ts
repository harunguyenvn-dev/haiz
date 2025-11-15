
import { Video } from '../types';


const CSV_URL = 'https://raw.githubusercontent.com/harunguyenvn-dev/data/main/hen.csv';

// @ts-ignore
const Papa = window.Papa;

export const fetchVideos = (): Promise<Video[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: any[] }) => {
        
        const validVideos = results.data.filter(item => item.link && item.link.trim() !== '');
        resolve(validVideos as Video[]);
      },
      error: (error: Error) => {
        console.error("Lỗi", error);
        reject(new Error('không lấy được video ...'));
      },
    });
  });
};
