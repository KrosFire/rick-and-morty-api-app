import { reactive, watchEffect } from "vue";
import { gql, ApolloClient, NormalizedCacheObject } from "@apollo/client/core";
import { FetchResponse, FetchNumberOfRecords } from "./useFetch.types";
import { range } from "@/helpers";

export const fetchNumberOfRecords = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): FetchNumberOfRecords => {
  const response = reactive<FetchNumberOfRecords>({ loading: true, data: 0 });

  const query = gql`
    query fetchNumberOfRecords {
      characters {
        info {
          count
        }
      }
    }
  `;

  apolloClient.query({ query }).then(({ data }) => {
    response.data = data.characters.info.count;
    response.loading = false;
  });

  return response;
};

export const fetchRecords = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  page: number,
  pageSize: number,
  ids: number[] = []
): FetchResponse => {
  const numberOfRecords = fetchNumberOfRecords(apolloClient);
  const response = reactive<FetchResponse>({
    loading: true,
    data: {
      numberOfRecords: 0,
      records: [],
    },
  });

  if (ids.length === 0) {
    const firstRecordId = (page - 1) * pageSize + 1;
    ids = range(firstRecordId, pageSize + firstRecordId - 1);
  }

  const query = gql`
    query fetchRecords {
      charactersByIds(ids:[${ids}]) {
        id
        image
        name
        gender
        species
        episode {
          id
          episode
        }
      }
    }
  `;

  watchEffect(() => {
    if (!numberOfRecords.loading) {
      apolloClient
        .query({ query })
        .then(({ data }) => data)
        .then(({ charactersByIds }) => {
          response.data = {
            numberOfRecords: numberOfRecords.data,
            records: charactersByIds,
          };
          response.loading = false;
        });
    }
  });

  return response;
};

// export const fetchFilteredRecords = (
//                                       apolloClient: ApolloClient<NormalizedCacheObject>,
//                                       page: number,
//                                       pageSize: number,
//                                       ids: string[]
// ): FetchResponse => {
//   const numberOfRecords = fetchNumberOfRecords(apolloClient);
//   const response = reactive<FetchResponse>({
//     loading: true,
//     data: {
//       numberOfRecords: 0,
//       records: [],
//     },
//   });

// };
