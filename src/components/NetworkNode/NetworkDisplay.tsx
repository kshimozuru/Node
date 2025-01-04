import React from 'react';
import { Network3D } from './Network3D';
import type { NetworkDisplayProps } from './types';

export function NetworkDisplay(props: NetworkDisplayProps) {
  return <Network3D {...props} />;
}