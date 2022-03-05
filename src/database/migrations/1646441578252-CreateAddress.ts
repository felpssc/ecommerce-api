import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAddress1646441578252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "district",
            type: "varchar",
          },
          {
            name: "number",
            type: "varchar",
          },
          {
            name: "cep",
            type: "varchar",
          },
          {
            name: "clientId",
            type: "uuid",
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
      "addresses",
      new TableForeignKey({
        name: "FK_addresses_client",
        columnNames: ["clientId"],
        referencedColumnNames: ["id"],
        referencedTableName: "clients",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("addresses", "FK_addresses_client");
    await queryRunner.dropTable("addresses");
  }
}
