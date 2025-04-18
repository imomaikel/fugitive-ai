import 'server-only';

import { fugitiveLogs, fugitives, locationHistory } from '@/server/db/schema';
import type { FugitiveInsert, LocationHistoryInsert } from '@/server/db/types';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { and, eq, isNotNull } from 'drizzle-orm';

/* **********************************************************************************************
 * IMPORTANT NOTICE
 *
 * This file contains sample data intended solely for development, testing, or demonstration.
 *
 * The dataset has been generated using AI and may include fictional or approximated content.
 * It is not guaranteed to be accurate or historically correct.
 *
 * In particular, the location history entries are speculative and should not be interpreted
 * as factual. Do not use this data in any real-world or production context.
 *
 ********************************************************************************************** */

type DataInsertType = (FugitiveInsert & { locationHistory: Omit<LocationHistoryInsert, 'fugitiveId'>[] })[];
dotenv.config({ path: '.env' });

const exampleData = [
  {
    fullName: 'Alphonse Gabriel Capone',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1899-01-17T00:00:00Z'),
    identifyNumber: 'AC-1931-FED',
    nationality: 'American',
    appearance: 'Heavyset, dark hair and eyes, notable scar on left cheek',
    notes: 'Led Chicago Outfit during Prohibition; convicted of tax evasion; died of pneumonia, January 25 1947',
    addedByUserName: 'system',
    latitude: 25.793449,
    longitude: -80.139198,
    status: 'no longer wanted',
    locationHistory: [
      { place: "Lou Mitchell's Café, Chicago, Illinois, U.S.", context: 'Having breakfast with associates' },
      { place: "St. Mary's Church, Chicago, Illinois, U.S.", context: 'Attending Sunday mass incognito' },
      { place: 'Congress Plaza Hotel, Chicago, Illinois, U.S.', context: 'Meeting with Outfit lieutenants' },
      { place: 'The Green Mill, Chicago, Illinois, U.S.', context: 'Overseeing a nightly jazz performance' },
    ],
  },
  {
    fullName: 'Pablo Emilio Escobar Gaviria',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1949-12-01T00:00:00Z'),
    identifyNumber: 'PE-1993-COL',
    nationality: 'Colombian',
    appearance: 'Short stature, dark hair, mustache',
    notes: 'Founder and leader of the Medellín Cartel; shot by police, December 2 1993',
    addedByUserName: 'system',
    latitude: 6.244203,
    longitude: -75.581212,
    status: 'no longer wanted',
    locationHistory: [
      { place: 'Café Viani, Medellín, Colombia', context: 'Discussing cartel logistics over coffee' },
      { place: 'Hacienda Nápoles Airstrip, Colombia', context: 'Inspecting private plane runway' },
      { place: 'Iglesia de la Veracruz, Medellín, Colombia', context: 'Attending a discreet prayer' },
      { place: 'El Poblado Shopping Center, Medellín, Colombia', context: 'Picking up supplies' },
    ],
  },
  {
    fullName: 'Joaquín Archivaldo Guzmán Loera',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1957-04-04T00:00:00Z'),
    identifyNumber: 'JG-2016-MEX',
    nationality: 'Mexican',
    appearance: 'Short (168 cm), dark hair, gaunt',
    notes: 'Head of the Sinaloa Cartel; multiple prison escapes; sentenced to life + 30 years at ADX Florence',
    addedByUserName: 'system',
    latitude: 25.790466,
    longitude: -108.985886,
    status: 'incarcerated',
    locationHistory: [
      { place: 'Local market, Culiacán, Sinaloa, Mexico', context: 'Buying fresh produce' },
      { place: 'Seaside café, Mazatlán, Sinaloa, Mexico', context: 'Meeting cartel contact' },
      { place: 'Private airstrip, Los Cabos, Mexico', context: 'Departing on a charter flight' },
    ],
  },
  {
    fullName: 'Theodore Robert Bundy',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1946-11-24T00:00:00Z'),
    identifyNumber: 'TB-1978-FL',
    nationality: 'American',
    appearance: 'Athletic build, light brown hair, blue eyes',
    notes: 'Confessed to 30+ homicides; executed by electrocution at Florida State Prison, January 24 1989',
    addedByUserName: 'system',
    latitude: 30.433283,
    longitude: -87.240372,
    status: 'executed',
    locationHistory: [
      { place: 'Trail diner, Pitkin County, Colorado, U.S.', context: 'Having lunch alone' },
      { place: 'Aspen courthouse lawn, Colorado, U.S.', context: 'Observing proceedings before escape' },
      { place: 'Gainesville bookstore, Florida, U.S.', context: 'Reading legal transcripts' },
      { place: 'Pensacola pawn shop, Florida, U.S.', context: 'Selling stolen goods' },
    ],
  },
  {
    fullName: 'Charles Milles Manson',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1934-11-12T00:00:00Z'),
    identifyNumber: 'CM-1969-CA',
    nationality: 'American',
    appearance: 'Lean build, long hair, mustache/beard',
    notes: 'Leader of the Manson Family; died of natural causes at Kern County Hospital, November 19 2017',
    addedByUserName: 'system',
    latitude: 35.859603,
    longitude: -117.088544,
    status: 'no longer wanted',
    locationHistory: [
      { place: 'Sunnyslope Ranch, Death Valley, California, U.S.', context: 'Gathering followers for retreat' },
      { place: 'Shoshone Visitor Center, California, U.S.', context: 'Buying supplies for hideout' },
      { place: 'Panamint Springs Café, California, U.S.', context: 'Meeting cult lieutenants' },
    ],
  },
  {
    fullName: 'Osama bin Mohammed bin Awad bin Laden',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1957-03-10T00:00:00Z'),
    identifyNumber: 'OBL-2011-OP',
    nationality: 'Saudi Arabian',
    appearance: 'Tall, dark beard, slender',
    notes: 'Founder of al-Qaeda; killed by U.S. Navy SEALs, May 2 2011',
    addedByUserName: 'system',
    latitude: 34.168751,
    longitude: 73.221497,
    status: 'no longer wanted',
    locationHistory: [
      { place: 'Peshawar safehouse, Pakistan', context: 'Holding council with lieutenants' },
      { place: 'Abbottabad bazaar, Pakistan', context: 'Purchasing daily necessities' },
    ],
  },
  {
    fullName: 'John Herbert Dillinger',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1903-06-22T00:00:00Z'),
    identifyNumber: 'JD-1934-FBI',
    nationality: 'American',
    appearance: 'Medium build, slicked-back hair',
    notes: "Bank robber dubbed 'Public Enemy No. 1'; shot outside Biograph Theater, July 22 1934",
    addedByUserName: 'system',
    latitude: 41.92639,
    longitude: -87.64972,
    status: 'no longer wanted',
    locationHistory: [
      { place: "St. Joseph's Hospital, Chicago, Illinois, U.S.", context: 'Receiving treatment for gunshot wound' },
      { place: 'Columbus Café, Indiana, U.S.', context: 'Meeting accomplices for getaway planning' },
      { place: 'Indianapolis Union Station, Indiana, U.S.', context: 'Boarding a train south' },
      { place: 'Biograph Theater alleyway, Chicago, Illinois, U.S.', context: 'Waiting for show intermission' },
    ],
  },
  {
    fullName: 'Bonnie Elizabeth Parker',
    gender: 'female',
    dangerLevel: 'high',
    birthDate: new Date('1910-10-01T00:00:00Z'),
    identifyNumber: 'BP-1934-LA',
    nationality: 'American',
    appearance: 'Petite, blonde hair, fashionable clothing',
    notes: 'One half of Bonnie and Clyde; shot dead in law-enforcement ambush, May 23 1934',
    addedByUserName: 'system',
    latitude: 32.5491,
    longitude: -93.0521,
    status: 'no longer wanted',
    locationHistory: [
      { place: 'Bus station, Commerce, Oklahoma, U.S.', context: 'Catching a ride to Texas' },
      { place: 'Gas station diner, Commerce, Oklahoma, U.S.', context: 'Grabbing a quick meal' },
      { place: 'Farmhouse hideout, Louisiana, U.S.', context: 'Laying low after robbery' },
      { place: 'Bienville Parish road, Louisiana, U.S.', context: 'Driving toward Gibsland ambush point' },
    ],
  },
  {
    fullName: 'Clyde Chestnut Barrow',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1909-03-24T00:00:00Z'),
    identifyNumber: 'CB-1934-LA',
    nationality: 'American',
    appearance: 'Slim, dark hair, thin mustache',
    notes: 'Partner to Bonnie Parker; shot dead in ambush, May 23 1934',
    addedByUserName: 'system',
    latitude: 32.5491,
    longitude: -93.0521,
    status: 'no longer wanted',
    locationHistory: [
      { place: 'Service station, Commerce, Oklahoma, U.S.', context: 'Filling gas for getaway car' },
      { place: 'Diner, Shreveport, Louisiana, U.S.', context: 'Discussing escape routes' },
      { place: 'Back road outside Gibsland, Louisiana, U.S.', context: 'Scanning for lawmen activity' },
    ],
  },
  {
    fullName: "James Joseph 'Whitey' Bulger",
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1929-09-03T00:00:00Z'),
    identifyNumber: 'WB-2018-USP',
    nationality: 'American',
    appearance: 'Short, white hair, stocky build',
    notes: "Leader of Boston's Winter Hill Gang; killed in prison assault, October 30 2018",
    addedByUserName: 'system',
    latitude: 34.024212,
    longitude: -118.496475,
    status: 'no longer wanted',
    locationHistory: [
      { place: 'Irish pub, South Boston, Massachusetts, U.S.', context: 'Meeting FBI informant handler' },
      { place: 'Subway station, Boston, Massachusetts, U.S.', context: 'Boarding car to South Bay' },
      { place: 'Safehouse, South Bay, Boston, Massachusetts, U.S.', context: 'Hiding from rival crews' },
      { place: 'Apartment building lobby, Santa Monica, California, U.S.', context: 'Exiting after paying rent' },
    ],
  },
  {
    fullName: 'Zdzisław Najmrodzki',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1954-08-20T00:00:00Z'),
    identifyNumber: 'ZN-1983-PL',
    nationality: 'Polish',
    appearance: 'Medium build, dark hair, agile',
    notes: 'Polish car thief known for 29 prison escapes; died in car crash during escape, August 31 1995',
    addedByUserName: 'system',
    latitude: 52.2075,
    longitude: 21.01111,
    status: 'no longer wanted',
    locationHistory: [
      { place: 'Hala Mirowska Market, Warsaw, Poland', context: 'Shopping for vegetables' },
      { place: 'Warsaw Central Station, Poland', context: 'Catching a train north' },
      { place: 'Petrol station, near Mława, Poland', context: 'Refueling getaway car' },
      { place: 'Forest path, Masovian Voivodeship, Poland', context: 'Hiding from pursuing officers' },
    ],
  },
  {
    fullName: 'Władysław Mazurkiewicz',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1911-01-31T00:00:00Z'),
    identifyNumber: 'WM-1955-PL',
    nationality: 'Polish',
    appearance: 'Refined demeanor, polite',
    notes: 'Executed serial killer; hanged at Montelupich Prison, January 29 1957',
    addedByUserName: 'system',
    latitude: 52.23,
    longitude: 21.01111,
    status: 'executed',
    locationHistory: [
      { place: 'Café Bristol, Warsaw, Poland', context: 'Meeting an informant' },
      { place: 'Tram stop, Marszałkowska Street, Warsaw, Poland', context: 'Waiting for transport' },
      { place: 'Żoliborz neighborhood street, Warsaw, Poland', context: 'Observing potential targets' },
      { place: 'Park Ujazdowski, Warsaw, Poland', context: 'Taking a stroll to appear calm' },
    ],
  },
  {
    fullName: 'Karol Kot',
    gender: 'male',
    dangerLevel: 'high',
    birthDate: new Date('1946-12-18T00:00:00Z'),
    identifyNumber: 'KK-1966-PL',
    nationality: 'Polish',
    appearance: 'Young, slight build, mustache',
    notes: 'Teenage murderer; arrested June 1 1966; executed by hanging, May 16 1968',
    addedByUserName: 'system',
    latitude: 50.06139,
    longitude: 19.93722,
    status: 'executed',
    locationHistory: [
      { place: 'Kraków Main Square, Poland', context: 'Buying postcards' },
      { place: 'Church of St. Mary, Kraków, Poland', context: 'Lighting a candle' },
      { place: 'Nowa Huta factory gate, Kraków, Poland', context: 'Loitering before next attack' },
      { place: 'District post office, Kraków, Poland', context: 'Mailing anonymous letters' },
    ],
  },
] satisfies DataInsertType;

export const populateDatabase = async () => {
  const { db } = await import('@/server/db');

  await db.transaction(async (tx) => {
    await Promise.all(
      exampleData.map((fugitive) =>
        tx
          .delete(fugitives)
          .where(and(eq(fugitives.identifyNumber, fugitive.identifyNumber), isNotNull(fugitives.identifyNumber))),
      ),
    );
    await Promise.all(
      exampleData.map(async (fugitive) => {
        try {
          const fugitiveId = crypto.randomUUID();

          await tx.insert(fugitives).values({
            ...fugitive,
            id: fugitiveId,
          });
          await tx.insert(fugitiveLogs).values({
            fugitiveId,
            message: `SYSTEM: Added ${fugitive.fullName} fugitive`,
          });
          if (fugitive.locationHistory.length) {
            await tx.insert(locationHistory).values(
              fugitive.locationHistory.map((location) => ({
                ...location,
                fugitiveId,
              })),
            );
          }
        } catch (error) {
          console.error('Error populating database row:', error);
        }
      }),
    );
  });
};
