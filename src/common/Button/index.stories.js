import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Button from './index';

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs]
};

export const Default = () => <Button label="Click Me" />;

export const Image = () => (
  <Button
    label="Click Me"
    image="https://i.picsum.photos/id/823/150/100.jpg?hmac=KYQs5Il5EXyllcKuq7w5OFYVMYdVnmZfDbMuPxlDaAI"
  />
);

export const Icon = () => (
  <Button
    label="Click Me"
    image="https://i.picsum.photos/id/823/150/100.jpg?hmac=KYQs5Il5EXyllcKuq7w5OFYVMYdVnmZfDbMuPxlDaAI"
  />
);

export const MultiIcon = () => (
  <Button
    label="Click Me"
    image="https://i.picsum.photos/id/823/150/100.jpg?hmac=KYQs5Il5EXyllcKuq7w5OFYVMYdVnmZfDbMuPxlDaAI"
  />
);

// export const Sizes = () => {
//   const size = select(
//     'size',
//     {
//       sm: 'sm',
//       md: 'md',
//       lg: 'lg'
//     },
//     'sm'
//   );
//   return (
//     <Avatar
//       src="https://pngimage.net/wp-content/uploads/2019/05/bitmoji-png-1.png"
//       size={size}
//     />
//   );
// };
