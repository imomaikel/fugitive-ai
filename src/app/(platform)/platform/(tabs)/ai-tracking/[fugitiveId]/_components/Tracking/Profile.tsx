import { RiCriminalFill } from 'react-icons/ri';

import type { FugitiveRaw } from '@/server/db/types';
import { AlertTriangle, Calendar, Globe, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { calculateAge, relativeDate } from '@/lib/utils';

interface ProfileProps {
  fugitive: FugitiveRaw;
}

const Profile: React.FC<ProfileProps> = ({
  fugitive: {
    fullName,
    gender,
    status,
    identifyNumber,
    nationality,
    appearance,
    notes,
    birthDate,
    createdAt,
    dangerLevel,
  },
}) => {
  return (
    <div className="flex flex-col">
      <Card className="mx-auto w-full shadow-lg">
        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center text-xl text-white">
                {fullName}
                <Badge className="ml-2 uppercase">{status}</Badge>
                <Badge className="ml-2 uppercase">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {dangerLevel}
                </Badge>
              </CardTitle>
              <div className="mt-1 text-sm text-slate-400">
                ID: {identifyNumber} • Added: {relativeDate(createdAt)}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-3 grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="flex space-x-4">
                <div className="relative flex h-28 w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-800">
                  <RiCriminalFill className="h-1/2 w-1/2" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <div className="text-xs text-slate-500">Gender</div>
                      <div className="flex items-center text-slate-300">
                        <User className="mr-1 h-3 w-3 text-slate-400" />
                        {gender.toUpperCase()}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500">Age</div>
                      <div className="flex items-center text-slate-300">
                        <Calendar className="mr-1 h-3 w-3 text-slate-400" />
                        {birthDate ? calculateAge(birthDate) : <span>Unknown</span>}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500">Nationality</div>
                      <div className="flex items-center text-slate-300">
                        <Globe className="mr-1 h-3 w-3 text-slate-400" />
                        {nationality}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-800" />

              <div>
                <div className="mb-1 text-xs text-slate-500">Case Notes</div>
                <div className="max-h-24 overflow-y-auto rounded-md bg-slate-800/50 p-2 text-sm text-slate-300">
                  {notes}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div>
                <div className="mb-1 text-xs text-slate-500">Physical Appearance</div>
                <div className="max-h-32 overflow-y-auto rounded-md bg-slate-800/50 p-2 text-sm text-slate-300">
                  {appearance}
                </div>
              </div>

              <Separator className="bg-slate-800" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
