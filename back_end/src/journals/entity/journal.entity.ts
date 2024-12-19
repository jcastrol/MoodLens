import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios as User } from '../../auth/entity/user.entity'; // Asumiendo que tienes una entidad User

@Entity('diarios')
export class Journal {
  @PrimaryColumn({ name: '_id', type: 'char', length: 36 })
  id: string;

  @Column({name: 'fecha', type: 'datetime' })
  date: Date;

  @Column({  name: 'url_imagen',type: 'text', nullable: true })
  imageUrl: string;

  @Column({  name: 'usuario_uuid',type: 'char', length: 36 })
  userUuid: string;

  @Column({  name: 'descripcion',type: 'text', nullable: true })
  description: string;

  @Column({ name: 'emoticono',type: 'varchar', length: 50, nullable: true })
  emoji: string;

  // Relación con el usuario
  @ManyToOne(() => User, (user) => user.journals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_uuid' })
  user: User;
}
