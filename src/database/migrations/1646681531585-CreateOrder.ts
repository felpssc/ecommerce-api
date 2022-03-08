import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateOrder1646681531585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "clientId",
            type: "uuid",
          },
          {
            name: "status",
            type: "varchar",
            enum: ["pending", "delivered"],
          },
          {
            name: "payment_price",
            type: "decimal(10,2)",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        name: "FK_orders_clientId",
        columnNames: ["clientId"],
        referencedColumnNames: ["id"],
        referencedTableName: "clients",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders", "FK_orders_clientId");
    await queryRunner.dropTable("orders");
  }
}
