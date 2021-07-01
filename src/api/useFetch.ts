import { reactive, watchEffect } from "vue";
import { gql, ApolloClient, NormalizedCacheObject } from "@apollo/client/core";
import { FetchResponse, FetchNumberOfRecords } from "./useFetch.types";

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
    console.log(data.characters.info.count);
    response.data = data.characters.info.count;
    response.loading = false;
  });

  return response;
};

export const fetchRecords = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  page: number,
  pageSize: number
): FetchResponse => {
  const numberOfRecords = fetchNumberOfRecords(apolloClient);
  const response = reactive<FetchResponse>({
    loading: true,
    data: {
      numberOfRecords: 0,
      records: [],
    },
  });

  const firstRecordId = (page - 1) * pageSize + 1;

  const query = gql`
    query fetchRecords {
      charactersByIds(ids:[${Array.from(
        Array(pageSize),
        (_, k) => k + firstRecordId
      )}]) {
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
  console.log(query);

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
