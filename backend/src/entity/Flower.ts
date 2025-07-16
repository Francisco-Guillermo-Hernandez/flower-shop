
import { Entity, ObjectIdColumn, ObjectId, Column, PrimaryColumn } from 'typeorm'
import { DynamicConstructor } from '../utils/decorators';

@Entity('flowers')
@DynamicConstructor()
export class Flower {

    @ObjectIdColumn({ select: false })
    _id!: ObjectId;

    get id(): string {
        return this._id.toHexString();
    }

    @Column({ type: 'string', length: 50 })
    name!: string

    @Column({ type: 'string' })
    description!: string

    @Column({ type: 'number' })
    existences!: number

    @Column({ type: 'number' })
    pricePerUnit!: number

    @Column({ type: 'number' })
    costPerUnit!: number;
    
    @Column({ type: 'string' })
    image!: string 

    @Column({ type: 'date' })
    lastUpdate!: Date

    constructor(args: any) {
        this.lastUpdate = new Date();
    }

}
