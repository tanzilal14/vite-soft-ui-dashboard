import gql from "graphql-tag";
// export const labs = gql`
//   query {
//     labs(filter: {}, paging: { limit: 10 }, sorting: []) {
//       nodes {
//         id
//         name
//       }
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//       }
//       totalCount
//     }
//   }
// `;

export const LABS = gql`
  query labs(
    $filter: labFilter
    $paging: OffsetPaging!
    $sorting: [labSort!]!
  ) {
    labs(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        name
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;
