import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';

import Fugitives from './Fugitives';

const FugitiveList = async () => {
  const fugitiveList = (await db.select().from(fugitives)).map((fugitive) => ({
    ...fugitive,
    appearance: null,
    notes: null,
  }));

  return <Fugitives fugitives={fugitiveList} />;
};

export default FugitiveList;
