"use client"

import React from 'react';
import { Canvas } from './_components/canvas';

import { Room } from "@/components/room"
import { Loading } from '@/components/canvas-loading';

interface ParamsProps {
    params: {
        id: string;
    }
}

const BoardPage = ({params}: ParamsProps) => {

  return (
      <Room roomId={params.id}
        fallback={<Loading />}
      >
        <Canvas id= {params.id} />
      </Room>
  );
};

export default BoardPage;
