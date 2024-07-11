import { Categoria } from '../enums/categoria.enum';
import { Status } from '../enums/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'campanhas' })
export class Campanha {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'datetime', default: () => 'NOW()' })
  dataCadastro: Date;

  @Column({ nullable: true, type: 'datetime' })
  dataInicio: Date;

  @Column({ nullable: true, type: 'datetime' })
  dataFim: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Ativa,
  })
  status: string;

  @Column({
    type: 'enum',
    enum: Categoria,
    default: Categoria.Reconhecimento,
  })
  categoria: string;

  @Column({ nullable: false, default: false })
  removido: boolean;
}
