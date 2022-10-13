import axios from "axios";
import { useEffect, useState } from "react"

export interface PaginatedResource<T> {
  count: number,
  next: string,
  previous: string,
  results: Array<T> | []
}

export interface PaginatedAPIResponse<T> {
  data: PaginatedResource<T>,
  loading: boolean,
  status: number,
  statusText: string,
  error: any,
  refetch: () => void,
  fetchMore: (url: string, offset: number, limit: number) => void
}

const useGetPaginatedData = <T>(url: string, offset?: number, limit?: number): PaginatedAPIResponse<T> => {
  const [ data, setData ] = useState({ count: 0, next: '', previous: '', results: [] });
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ status, setStatus ] = useState(0);
  const [ statusText, setStatusText ] = useState('');
  const [ lastUrl, setLasturl ] = useState('') // for refetch purpose, in case of error

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    setLasturl(`${url}?offset=${offset}&limit=${limit}`);
    axios.get(`${url}?offset=${offset}&limit=${limit}`, {
      signal: controller.signal
    })
      .then((response) => {
        setError(null);
        setData(response.data);
        setLoading(false);
        setStatus(response.status);
        setStatusText(response.statusText);
      }).catch((error) => {
        setError(error.toJSON());
        setLoading(false);
      });

      return () => {
        controller.abort();
      }
  }, [url, offset, limit]);

  const refetch = () => {
    setLoading(true);
    axios.get(lastUrl)
      .then((response) => {
        setError(null);
        setData(response.data);
        setLoading(false);
        setStatus(response.status);
        setStatusText(response.statusText);
      }).catch((error) => {
        setError(error.toJSON());
        setLoading(false);
      });
  }

  const fetchMore = (url: string, offset: number, limit: number) => {
    setLoading(true);
    setLasturl(`${url}?offset=${offset}&limit=${limit}`);
    axios.get(`${url}?offset=${offset}&limit=${limit}`)
      .then((response) => {
        setError(null);
        setData(response.data);
        setLoading(false);
        setStatus(response.status);
        setStatusText(response.statusText);
      }).catch((error) => {
        setError(error.toJSON());
        setLoading(false);
      });
  }

  return { data, loading, status, statusText, error, refetch, fetchMore }
}

interface APIResponse<T> {
  data: T,
  loading: boolean,
  status: number,
  statusText: string,
  error: any,
  refetch: () => void
}

const useGetData = <T>(url: string, params: object ): APIResponse<T> => {
  const [ data, setData ] = useState<T>({} as T);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ status, setStatus ] = useState(0);
  const [ statusText, setStatusText ] = useState('');
  const [ lastUrl, setLasturl ] = useState('') // for refetch purpose, in case of error
  const [ lastParams, setLastParams ] = useState<object>({});

  useEffect(() => {
    setLoading(true);
    setLasturl(url);
    setLastParams(params);
    const controller = new AbortController();
    axios.get(url, {
      params,
      signal: controller.signal
    })
      .then((response) => {
        setError(null);
        setData(response.data);
        setLoading(false);
        setStatus(response.status);
        setStatusText(response.statusText);
      }).catch((error) => {
        setError(error.toJSON());
        setLoading(false);
      });

      return () => {
        controller.abort();
      }
  }, [url]);

  const refetch = () => {
    setLoading(true);
    axios.get(lastUrl)
      .then((response) => {
        setError(null);
        setData(response.data);
        setLoading(false);
        setStatus(response.status);
        setStatusText(response.statusText);
      }).catch((error) => {
        setError(error.toJSON());
        setLoading(false);
      });
  }

  return { data, loading, status, statusText, error, refetch }
}

export {
  useGetPaginatedData,
  useGetData
}