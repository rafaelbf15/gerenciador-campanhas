import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  nome: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'datetime', default: () => 'NOW()' })
  dataCadastro: Date;

  @Column({ nullable: true, type: 'datetime' })
  dataAtualizacao: Date;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  hashPassword: string;

  public updateHashPassword(hash: string): void {
    this.hashPassword = hash;
  }
}
