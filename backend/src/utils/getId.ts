import { ObjectId } from 'mongodb';

export const getId = (id: string | null |  Array<string>) => new ObjectId(typeof id === 'string' ? id: '');