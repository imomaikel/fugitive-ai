import { useRef } from 'react';
import { ImMagicWand } from 'react-icons/im';

import { api } from '@/trpc/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { errorToast } from '@/lib/utils';

interface PredictProps {
  fugitiveId: string;
  refetch: () => void;
}

const Predict: React.FC<PredictProps> = ({ fugitiveId, refetch }) => {
  const toastRef = useRef<string | number | null>(null);

  const { mutate: predict, isPending } = api.tracking.predict.useMutation({
    onError: errorToast,
    onSettled: () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
      toastRef.current = null;
    },
    onSuccess: (data) => {
      if (data?.success) {
        refetch();
        toast.success('Prediction successful. Check the previous predictions table for the results.');
      } else {
        errorToast(data?.message || 'Something went wrong');
      }
    },
  });

  const handlePredict = () => {
    toastRef.current = toast.loading('Predicting...');
    predict({ fugitiveId });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Prediction</CardTitle>
        <CardDescription>Ready to predict?</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="aspect-video h-16 cursor-pointer" onClick={handlePredict} disabled={isPending}>
          <ImMagicWand className="size-8" />
          <span>Predict with AI</span>
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground">It should take around one minute to predict.</p>
      </CardFooter>
    </Card>
  );
};

export default Predict;
