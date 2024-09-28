import Grid from '@mui/material/Grid';
// eslint-disable-next-line import/named
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';
import React from 'react';

const skeletonProps: SkeletonProps = {
  variant: 'rounded',
  height: 30,
  animation: 'wave',
};

export const AdminMembersSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
      <Grid item xs={3}>
        <Skeleton {...skeletonProps} />
      </Grid>
    </Grid>
  );
};
