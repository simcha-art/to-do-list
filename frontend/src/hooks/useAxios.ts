import { useState } from "react";
import { api } from "../api/api";
import type { User } from "../types";
import axios from "axios";

export type Method = "POST" | "PUT" | "DELETE" | "GET"



export function useAxios<T>() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [data, setData] = useState<T>()
    async function exec(url: string, method: Method, body: User): Promise<T | undefined> {
        try {
            setLoading(true);
            setError("");
            const response = await api({ url, method, data: body })
            setData(response.data.data)
            return response.data.data
        } catch (error) {
            console.log(error);
            let message: string = "";
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    message = error.response.data.error
                } else if (error.request) {
                    message = "network error, check your network";
                }
            } else {
                message = "Intenal server error";
            }
            setError(message);

        } finally {
            setLoading(false);
        }
    }
    return { loading, error, data, exec }
}


