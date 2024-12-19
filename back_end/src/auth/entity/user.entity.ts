import { Journal } from 'src/journals/entity/journal.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;
 
  @OneToMany(() => Journal, (journal) => journal.user)
  journals: Journal[];

}
