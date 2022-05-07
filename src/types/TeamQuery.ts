export type TeamQuery = {
  team: {
    id: string;
    game: string;
    players: Array<{
      id: string;
      name: string;
    }>;
  };
};
