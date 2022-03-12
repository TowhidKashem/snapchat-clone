import React from 'react';
import { Deform } from './icons/Deform.svg';
import { Dog } from './icons/Dog.svg';
import { Bees } from './icons/Bees.svg';
import { Liberty } from './icons/Liberty.svg';
import { Halloween } from './icons/Halloween.svg';

export const filterButtonIcons = {
  deform: <Deform />,
  dog: <Dog />,
  bees: <Bees />,
  liberty: <Liberty />,
  halloween: <Halloween />
};

export type Filter = keyof typeof filterButtonIcons;

export type FilterState = {
  initialized: boolean;
  isLoading: boolean;
  showButtons: boolean;
  filters: Filter[];
  active: Filter | null;
};

export type CameraState = {
  isBrowserCompatible: boolean;
  stream: MediaStream | null;
  capture: boolean;
};

export type CameraMode = 'user' | 'environment';

export type Photo = {
  month: string;
  year: number;
  images: string[];
};
