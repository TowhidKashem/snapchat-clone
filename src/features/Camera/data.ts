import { Filter } from './types';

export const dependencies = {
  dog: [
    './jeelizFaceFilter/filters/dog/dependencies.min.js',
    './jeelizFaceFilter/filters/dog/index.js'
  ],
  bees: [
    './jeelizFaceFilter/filters/bees/dependencies.min.js',
    './jeelizFaceFilter/filters/bees/index.js'
  ],
  halloween: ['./jeelizFaceFilter/filters/halloween/index.js'],
  deform: ['./jeelizFaceFilter/filters/deform/index.js']
};

export const filters: Filter[] = ['dog', 'halloween', 'deform', 'bees', 'dog'];
