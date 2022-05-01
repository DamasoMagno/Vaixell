export type Home = {
  title: string;
  description: string;
  twitch: string;
  contacts: Array<{
    id: string;
    name: string;
    address: string;
    icon: string;
  }>;
  partners: Array<{
    id: string;
    name: string;
    addressSite: string;
    icon: string;
    coupon: {
      code: string;
      percentageValue: string;
    };
  }>;
  teams: Array<{
    id: string;
    game: string;
    players: Array<{
      id: string;
      name: string;
      profilePhoto: string;
    }>;
  }>;
};
