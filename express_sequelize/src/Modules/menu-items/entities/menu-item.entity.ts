import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize';

@Table({
  tableName: 'menu_item',
  updatedAt: false,
})
export default class MenuItem extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  name: string;

  @Column
  url: string;

  // @Column({
  //   type: 'integer',
  //   defaultValue: null,
  // } as ModelAttributeColumnOptions)
  // parentId: number;

  @ForeignKey(() => MenuItem)
  @Column({
    type: 'integer',
    defaultValue: null,
  } as ModelAttributeColumnOptions)
  parentId: number;

  // @BelongsTo(() => MenuItem)
  // menues: MenuItem

  @Column({ type: 'datetime' } as ModelAttributeColumnOptions)
  declare createdAt: Date;

  @HasMany(() => MenuItem,
  {
    foreignKey: 'parentId',
    //  constraints: false,
  }
)
// child: Module[];
  children: MenuItem[]
}
