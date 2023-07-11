import React from 'react'
import { Skeleton } from '@mui/material'

interface IProps {
  width: number
  height: number
}

export const ChartSkeleton: React.FC<IProps> = ({ width, height }) => {
  return <Skeleton variant="rectangular" width={width} height={height}></Skeleton>
}
