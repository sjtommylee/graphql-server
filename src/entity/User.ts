import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
/**
 * @Decorator {entity} - essentially this decorator is used to mark classes that will be an entity (tabl, document etc.)
 * database schema will be created for all classes decorated with it.
 *
 * @User - this user entity has 4 columns, with the id as the PK.
 *
 * @BeforeInsert -  This listener will ensure that the following code is executed at the start
 *
 */

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 255 }) email: string;

  @Column("text") password: string;

  @Column("boolean", { default: false }) confirmed: boolean;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
