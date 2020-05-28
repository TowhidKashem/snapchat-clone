import { Media } from 'features/Media/types';

export const dummySnaps = (
  lat: number,
  lon: number
): Array<{
  lat: number;
  lon: number;
  media: Media[];
}> => [
  {
    lat: lat - 0.005,
    lon: lon + 0.005,
    media: [
      {
        location: 'Corona, Queens',
        time: 0,
        type: 'video',
        file: 'sample-1.mp4'
      },
      {
        location: 'Maspeth, Queens',
        time: 0,
        type: 'photo',
        file: 'https://i.picsum.photos/id/987/400/600.jpg'
      }
    ]
  },
  {
    lat: lat - 0.003,
    lon: lon - 0.005,
    media: [
      {
        location: 'New York City, New York',
        time: 0,
        type: 'video',
        file: 'sample-2.mp4'
      },
      {
        location: 'Maspeth, Queens',
        time: 0,
        type: 'photo',
        file: 'https://i.picsum.photos/id/987/500/600.jpg'
      }
    ]
  }
  // {
  //   lat: lat - 0.01,
  //   lon: lon - 0.002,
  //   media: {
  //     location: 'New York City, New York',
  //     time: 'Sat',
  //     file: 'sample-1.mp4'
  //   }
  // },
  // {
  //   lat: lat + 0.007,
  //   lon: lon + 0.005,
  //   media: {
  //     location: 'New York City, New York',
  //     time: 'Sat',
  //     file: 'sample-2.mp4'
  //   }
  // },
  // {
  //   lat: lat + 0.003,
  //   lon: lon - 0.0,
  //   media: {
  //     location: 'New York City, New York',
  //     time: 'Sat',
  //     file: 'sample-1.mp4'
  //   }
  // },
  // {
  //   lat: lat + 0.007,
  //   lon: lon - 0.007,
  //   media: {
  //     location: 'New York City, New York',
  //     time: 'Sat',
  //     file: 'sample-2.mp4'
  //   }
  // }
];
