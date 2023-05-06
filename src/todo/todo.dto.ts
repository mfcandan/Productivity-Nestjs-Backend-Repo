export class CreateToDoDto {
  task: string;
  tag: string;
  image?: string;
}

export class UpdateToDoDto {
  task?: string;
  tag?: string;
  image?: string;
  completed?: boolean;
}
