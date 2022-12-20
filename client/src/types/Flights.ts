export type Flights = {
  id: number,
  name: string,
  ticketCost?: number,
  rows?: number,
  cols?: number,
  seats?: Seats,
};

export type Seats = {
  [key: string]: number[],
};
