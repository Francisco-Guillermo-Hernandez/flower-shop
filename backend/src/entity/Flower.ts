
import { Entity, ObjectIdColumn, ObjectId, Column, PrimaryColumn } from 'typeorm'

@Entity('flowers')
export class Flower {

    @ObjectIdColumn()
    id!: ObjectId;

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


}
