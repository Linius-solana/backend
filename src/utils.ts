import axios from "axios";

export const fetchGraphQL = async (query: string, variables: any) => {
    const res = await axios.post("https://streaming.bitquery.io/eap", {
        query,
        variables,
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ory_at_odhD5DFvwKXTHtLMTObSIw6trQx9LUNqzbhRHX3izQ0.Hd9NZ8kHwe-mOo4lxM8gG8DPDx-os_n5z8qh-NNDBU4",
        }
    });
    if (res.status !== 200) {
        throw new Error("Failed to fetch from GraphQL");
    }
    return res.data;
};
