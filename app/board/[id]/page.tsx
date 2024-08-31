"use client"

import React from 'react';
import { Canvas } from './_components/canvas';

interface ParamsProps {
    params: {
        id: string;
    }
}

const BoardPage = ({params}: ParamsProps) => {

  return (
      <Canvas id= {params.id} />
  );
};

export default BoardPage;
