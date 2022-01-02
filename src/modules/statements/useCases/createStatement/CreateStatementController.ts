import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFERS = 'transfer',
}

export class CreateStatementController {
  async handle(request: Request, response: Response) {
    let user_id = request.user.id;
    const { amount, description } = request.body;
    let sender_id = null;

    const splittedPath = request.originalUrl.split("/");
    let type = splittedPath[4] as OperationType;

    if (splittedPath[4] === "transfers") {
      sender_id = user_id;
      user_id = request.params?.user_id;
      type = OperationType.TRANSFERS;
    }

    const createStatement = container.resolve(CreateStatementUseCase);

    const statement = await createStatement.execute({
      user_id,
      type,
      amount,
      description,
      sender_id,
    });

    return response.status(201).json(statement);
  }
}
