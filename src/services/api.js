export const fetchData = async (url, method = "GET", body = null) => {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Erreur serveur");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
