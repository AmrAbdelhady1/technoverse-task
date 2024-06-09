// import { getCookie } from "@/app/actions";

interface Props {
  url: string;
  method: string;
  isFormData: boolean;
  body?: any;
}

export const getData = async (url: string) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      fetchOptions
    );

    if (!response.ok) {
      console.error("Error fetching data:", response.statusText);
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};

export const fetchData = async ({
  body = {},
  url,
  method,
  isFormData,
}: Props) => {
  // const token = await getCookie("access_token") || "7|glf0wCE7p2zt382aiEjLUtkf9nf3UHKb0rGDXWBY8017088f";

  const headers = {
    // Authorization: `Bearer ${token}`,
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  };

  const fetchOptions = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      fetchOptions
    );

    if (!response.ok) {
      console.error("Error fetching data:", response.statusText);
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
