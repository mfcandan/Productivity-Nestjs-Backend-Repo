export class CreateToDoDto {
  task: string;
  tag: string;
}

export class UpdateToDoDto {
  task?: string;
  tag?: string;
  completed?: boolean;
}
