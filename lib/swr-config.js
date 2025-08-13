"use client";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher";

export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        dedupingInterval: 2000,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
