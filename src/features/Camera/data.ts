import { Filter } from './types';

export const dependencies = {
  dog: ['./jeelizFaceFilter/dog/dependencies.min.js', './jeelizFaceFilter/dog/index.js'],
  bees: [
    './jeelizFaceFilter/bees/dependencies.min.js',
    './jeelizFaceFilter/bees/index.js'
  ],
  halloween: ['./jeelizFaceFilter/halloween/index.js'],
  deform: ['./jeelizFaceFilter/deform/index.js']
};

export const defaultFilters: Filter[] = ['dog', 'halloween', 'deform', 'bees', 'tmp'];
