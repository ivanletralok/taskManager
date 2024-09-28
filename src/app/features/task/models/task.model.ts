export interface Skill {
  name: string;
}

export interface Person {
  id: number;
  name: string;
  age: number;
  skills: Skill[];
}

export interface Task {
  id: number;
  name: string;
  deadline: Date;
  completed: boolean;
  people: Person[];
}
