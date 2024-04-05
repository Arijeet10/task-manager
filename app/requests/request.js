//API Requests

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/api/";

//POST API Request
export const addNewTask = async (req) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .catch((error) => console.log("Error in FETCH API POST request:", error));
    if (res.ok) {
      console.log("POST request successful", res);
    }
    return res;
  } catch (error) {
    console.log("Error in POST request:", error);
  }
};

//PATCH API Request
export const updateTask = async (req) => {
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .catch((error) =>
        console.log("Error in FETCH API PATCH request:", error)
      );
    if (res.ok) {
      console.log("PATCH request successfull", res);
    }
    return res;
  } catch (error) {
    console.log("Error in PATCH request:", error);
  }
};

//DELETE API Request
export const deleteTask = async (req) => {
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .catch((error) =>
        console.log("Error in FETCH API DELETE request:", error)
      );
    if (res.ok) {
      console.log("DELETE request successfull", res);
    }
  } catch (error) {
    console.log("Error in DELETE request:", error);
  }
};
