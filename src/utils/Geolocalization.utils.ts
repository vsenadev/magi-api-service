import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as polyline from 'polyline';
import {
  IRoute,
  IRouteInfo,
  IRoutePoint,
  ISteps,
} from '@src/model/Delivery.model';

dotenv.config();

@Injectable()
export class Geolocalization {
  constructor() {}

  async getLatitudeLongitude(
    street: string,
    neighborhood: string,
    number: number,
  ): Promise<IRoute> {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${street.trim().replace(' ', '+')}+${number},+${neighborhood.trim().replace(' ', '+')}&format=json&limit=1`,
    );

    return {
      longitude: parseFloat(res.data[0]?.lon),
      latitude: parseFloat(res.data[0]?.lat),
    };
  }

  async getRouteBetweenToPoints(
    latOne: number,
    lonOne: number,
    latTwo: number,
    lonTwo: number,
  ): Promise<IRouteInfo> {
    const res = await axios.get(
      `http://router.project-osrm.org/route/v1/driving/${latOne},${lonOne};${latTwo},${lonTwo}?overview=full&steps=true`,
    );
    return this.getRouteCoordinates(res.data.routes);
  }

  async getRouteCoordinates(data: IRoutePoint): Promise<IRouteInfo> {
    try {
      if (!data || !data[0].legs || !data[0].legs[0].steps) {
        throw new Error('No route data available');
      }

      const coordinates = [];

      data[0].legs[0].steps.forEach((step: ISteps) => {
        const decodedPoints = polyline?.decode(step?.geometry);

        decodedPoints.forEach(([lat, lon]) => {
          coordinates.push({ longitude: lon, latitude: lat });
        });
      });

      return {
        coordinates: coordinates,
        duration: data[0].duration,
        distance: data[0].distance,
      };
    } catch (error) {
      throw new Error(`Failed to fetch route coordinates: ${error.message}`);
    }
  }

  async createMapsUrl(
    start: IRoute,
    end: IRoute,
    waypoints: IRoute[],
  ): Promise<string> {
    const maxWaypoints = 23;
    let sampledWaypoints = waypoints;

    if (waypoints.length > maxWaypoints) {
      const interval = Math.ceil(waypoints.length / maxWaypoints);
      sampledWaypoints = waypoints.filter((_, index) => index % interval === 0);
    }

    const waypointString = sampledWaypoints
      .map((point) => `${point.latitude},${point.longitude}`)
      .join('|');

    const baseUrl = 'https://www.google.com/maps/dir/?api=1';
    return `${baseUrl}&origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&waypoints=${waypointString}`;
  }

  async calcuteEndDate(
    startDate: Date,
    durationInSeconds: number,
  ): Promise<Date> {
    return new Date(startDate.getTime() + durationInSeconds * 1000);
  }
}
