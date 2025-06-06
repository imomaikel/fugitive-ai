import React from 'react';

import { api } from '@/trpc/react';

import Loader from '@/components/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { relativeDate } from '@/lib/utils';

import Predict from './Predict';

interface PredictionsProps {
  fugitiveId: string;
}

const Predictions: React.FC<PredictionsProps> = ({ fugitiveId }) => {
  const { data, isLoading, refetch } = api.tracking.getPreviousPredictions.useQuery({ fugitiveId });

  const noPredictions = data?.previousPredictions?.length === 0 && !isLoading;

  return (
    <div className="flex flex-col space-y-4">
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Previous Predictions</CardTitle>
          <CardDescription>The previous predictions of this fugitive</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <Loader className="size-16" />}
          {noPredictions && !isLoading && <p className="text-muted-foreground">No previous predictions found</p>}
          {!isLoading && !noPredictions && (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Reasoning</TableHead>
                  <TableHead>Predicted Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.previousPredictions ?? []).map((prediction) => (
                  <TableRow key={prediction.id}>
                    <TableCell>{prediction.city}</TableCell>
                    <TableCell>{prediction.country}</TableCell>
                    <TableCell>{prediction.location}</TableCell>
                    <TableCell className="text-justify whitespace-pre-wrap">{prediction.reasoning}</TableCell>
                    <TableCell>{relativeDate(prediction.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                {data?.lastPrediction && (
                  <TableRow>
                    <TableCell colSpan={4}>Last Prediction</TableCell>
                    <TableCell>{relativeDate(data.lastPrediction)}</TableCell>
                  </TableRow>
                )}
              </TableFooter>
            </Table>
          )}
        </CardContent>
      </Card>
      <Predict fugitiveId={fugitiveId} refetch={refetch} />
    </div>
  );
};

export default Predictions;
