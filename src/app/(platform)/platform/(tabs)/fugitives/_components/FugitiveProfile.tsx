import { RiCalendarFill, RiCriminalFill, RiEyeFill, RiMapPin2Fill, RiShieldFill, RiUserFill } from 'react-icons/ri';

import Link from 'next/link';

import type { FugitiveRaw, LocationHistoryRaw } from '@/server/db/types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { relativeDate } from '@/lib/utils';

const formatCoordinate = (coord?: number) => {
  if (coord === undefined || coord === null) return 'N/A';
  return coord.toFixed(6);
};

const getDangerLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'destructive';
    case 'captured':
      return 'secondary';
    case 'inactive':
      return 'outline';
    default:
      return 'default';
  }
};

interface FugitiveProfileProps {
  fugitiveDetails: FugitiveRaw;
  locationHistory: LocationHistoryRaw[];
}

const FugitiveProfile: React.FC<FugitiveProfileProps> = ({ fugitiveDetails, locationHistory }) => {
  return (
    <div className="mx-auto space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">{fugitiveDetails.fullName}</h1>
          <p className="text-muted-foreground">Fugitive ID: {fugitiveDetails.id}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={getDangerLevelColor(fugitiveDetails.dangerLevel)}>
            <RiShieldFill className="mr-1 h-3 w-3" />
            {fugitiveDetails.dangerLevel} Risk
          </Badge>
          <Badge variant={getStatusColor(fugitiveDetails.status)}>{fugitiveDetails.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Main Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RiUserFill className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Full Name</label>
                  <p className="mt-1 text-sm font-medium">{fugitiveDetails.fullName}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Gender</label>
                  <p className="mt-1 text-sm font-medium">{fugitiveDetails.gender}</p>
                </div>
                {fugitiveDetails.birthDate && (
                  <div>
                    <label className="text-muted-foreground text-sm font-medium">Birth Date</label>
                    <p className="mt-1 text-sm font-medium">{relativeDate(fugitiveDetails.birthDate)}</p>
                  </div>
                )}
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Nationality</label>
                  <p className="mt-1 text-sm font-medium">{fugitiveDetails.nationality || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">ID Number</label>
                  <p className="mt-1 text-sm font-medium">{fugitiveDetails.identifyNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm font-medium">Added By</label>
                  <p className="mt-1 text-sm font-medium">{fugitiveDetails.addedByUserName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RiEyeFill className="h-5 w-5" />
                Description & Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-muted-foreground text-sm font-medium">Physical Appearance</label>
                <p className="bg-muted mt-2 rounded-md p-3 text-sm">
                  {fugitiveDetails.appearance || 'No appearance description available.'}
                </p>
              </div>
              <div>
                <label className="text-muted-foreground text-sm font-medium">Additional Notes</label>
                <p className="bg-muted mt-2 rounded-md p-3 text-sm">
                  {fugitiveDetails.notes || 'No additional notes available.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RiMapPin2Fill className="h-5 w-5" />
                Location History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {locationHistory.length > 0 ? (
                <div className="space-y-4">
                  {locationHistory.map((location, index) => (
                    <div key={location.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{location.place || `Location ${index + 1}`}</h4>
                          <p className="text-muted-foreground mt-1 text-xs">{relativeDate(location.createdAt)}</p>
                        </div>

                        {location.latitude && location.longitude && (
                          <Badge variant="outline" className="text-xs">
                            {formatCoordinate(location.latitude)}, {formatCoordinate(location.longitude)}
                          </Badge>
                        )}
                      </div>
                      {location.context && <p className="text-muted-foreground mt-2 text-sm">{location.context}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  <RiMapPin2Fill className="mx-auto mb-2 h-12 w-12 opacity-50" />
                  <p>No location history available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Photo and Quick Info */}
        <div className="space-y-6">
          {/* Photo */}
          <Card>
            <CardContent className="p-6">
              <div className="bg-muted border-muted-foreground/25 flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center">
                  <RiCriminalFill className="text-muted-foreground/50 mx-auto mb-2 h-16 w-16" />
                  <p className="text-muted-foreground text-sm">No photo available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Danger Level</span>
                <Badge variant={getDangerLevelColor(fugitiveDetails.dangerLevel)}>{fugitiveDetails.dangerLevel}</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Status</span>
                <Badge variant={getStatusColor(fugitiveDetails.status)}>{fugitiveDetails.status}</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Added</span>
                <span className="text-sm font-medium">{relativeDate(fugitiveDetails.createdAt)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Last Updated</span>
                <span className="text-sm font-medium">{relativeDate(fugitiveDetails.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Current Location */}
          {fugitiveDetails.latitude && fugitiveDetails.longitude && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RiMapPin2Fill className="h-5 w-5" />
                  Last Known Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Latitude</span>
                    <span className="font-mono text-sm">{formatCoordinate(fugitiveDetails.latitude)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Longitude</span>
                    <span className="font-mono text-sm">{formatCoordinate(fugitiveDetails.longitude)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Tracking Button */}
          <Card>
            <CardContent className="p-6">
              <Button asChild className="h-12 w-full text-base font-medium">
                <Link href={`/platform/ai-tracking/${fugitiveDetails.id}`}>
                  <RiEyeFill className="mr-2 h-5 w-5" />
                  Track with AI
                </Link>
              </Button>
              <p className="text-muted-foreground mt-2 text-center text-xs">
                Use AI-powered tracking to locate {fugitiveDetails.fullName}
              </p>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <RiCalendarFill className="h-5 w-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Predicting</span>
                <Badge variant={fugitiveDetails.whilePredicting ? 'default' : 'secondary'}>
                  {fugitiveDetails.whilePredicting ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <Separator />
              <div className="text-muted-foreground text-xs">
                <p>Record ID: {fugitiveDetails.id}</p>
                <p className="mt-1">Added by: {fugitiveDetails.addedByUserName}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FugitiveProfile;
