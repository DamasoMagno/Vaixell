import { gql } from "@apollo/client";

export const HOME = gql`
  {
    page(where: { slug: "Home" }) {
      id
      title
      description
      twitch
      partners {
        id
        name
        addressSite
        codeCoupon
        percentageCoupon
        icon {
          url
        }
      }
      teams {
        id
        game
      }
      contacts {
        id
        name
        address
        icon {
          url
        }
      }
    }
  }
`;
