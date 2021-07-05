import { reactive } from "vue";
import { gql, ApolloClient, NormalizedCacheObject } from "@apollo/client/core";
import { FetchResponse, ApiResponse, Result } from "./useFetch.types";
import { range } from "@/helpers";

export const fetchRecords = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  page: number,
  pageSize: number,
  filter = ""
): FetchResponse => {
  const response = reactive<FetchResponse>({
    loading: true,
    data: {
      numberOfRecords: 0,
      records: [],
    },
  });

  const from = (page - 1) * pageSize + 1;
  const to = from + pageSize - 1;

  const firstPage = Math.floor(from / 20) + 1;
  const lastPage = Math.floor(to / 20) + 1;

  const pages = range(firstPage, lastPage);

  for (const page of pages) {
    const query = gql`
      query fetchRecords {
        characters(
          page: ${page}
          filter: {
            name: "${filter}"
        }) {
        info{
          count
        }
        results {
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
    }
    `;

    apolloClient
      .query({ query })
      .then(({ data }) => data)
      .then(({ characters }) => characters)
      .then((res: ApiResponse) => {
        if (response.data) {
          response.data.numberOfRecords = +res.info.count;

          const firstRecord = (from - 1) % 20;
          const lastRecord = Math.min(to % 20, res.results.length);
          let records: Result[] = [];
          if (page === firstPage && page === lastPage) {
            for (let i = firstRecord; i < lastRecord; i++) {
              records.push(res.results[i]);
            }
            response.loading = false;
          } else if (page === firstPage) {
            for (let i = firstRecord; i < res.results.length; i++) {
              records.push(res.results[i]);
            }
          } else if (page === lastPage) {
            for (let i = 0; i < lastRecord; i++) {
              records.push(res.results[i]);
            }
            response.loading = false;
          } else {
            records = res.results;
          }

          response.data.records = response.data.records.concat(records);
        }
      });
  }

  return response;
};
