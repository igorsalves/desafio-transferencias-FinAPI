import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addSenderIdToStatementsTable1641130059820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        "statements",
        new TableColumn({
          name: "sender_id",
          type: "uuid",
          isNullable: true,
        })
      );

      await queryRunner.createForeignKey(
        "statements",
        new TableForeignKey({
          name: 'FK_Users_Statements',
          columnNames: ["sender_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "users",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey(
        'statements',
        'FK_Users_Statements',
      );
    }

}
