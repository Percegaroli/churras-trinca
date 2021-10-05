export interface NewChurrasFormSchema {
  name: string;
  description: string;
  date: Date;
  suggestedValue: string;
  suggestedValueOpenbar: string;
  guests: Array<Guest>
}

type Guest = {
  name: string;
}

export interface NewChurrasFormProps {
  close: () => void
}