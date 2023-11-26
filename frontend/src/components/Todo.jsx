import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Todo = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [todo, setTodo] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState()

  const getAllTodo = () => {
    const email = jwtDecode(localStorage.getItem("token"))?.email;
    if (email) {
      axios
        .post("http://localhost:5200/todo/get", {
          email,
        })
        .then((res) => {
          setTodo(res?.data?.todo);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    else
    {
      navigate("/");
    }
  };
  useEffect(() => {
    getAllTodo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token || typeof token !== "string") {
        localStorage.removeItem("token");
        navigate("/");
      }
      else if (
        localStorage.getItem("token") &&
        jwtDecode(localStorage.getItem("token")).exp * 1000 < Date.now()
      ) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }, [navigate]);

  const handleUpdate = (todo) => {
    setUpdate(true);
    setItemName(todo?.name);
    setUpdateId(todo?._id);
  };

  const handleUpdateTodo = () => {
    axios
      .put("http://localhost:5200/todo/update", {
        _id: updateId,
        name: itemName,
      })
      .then(() => {
        getAllTodo();
        setUpdate(false);
        setItemName("");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleTodo = () => {
    const email = jwtDecode(localStorage.getItem("token")).email;
    if (email) {
      axios
        .post("http://localhost:5200/todo/add", {
          email,
          name: itemName,
        })
        .then((res) => {
          if (res) {
            getAllTodo();
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    getAllTodo();
    setItemName("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a task"
        value={itemName}
        onChange={(e) => {
          setItemName(e.target.value);
        }}
      />
      <button
        onClick={update ? handleUpdateTodo : handleTodo}
        style={{ marginLeft: "10px" }}
      >
        {update ? "Update" : "Add a todo"}
      </button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>

      {todo.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
          {todo.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                border: "2px solid black",
                padding: "30px",
              }}
            >
              <div>
                <h3
                  style={{ textDecoration: item?.done ? "line-through" : "" }}
                >
                  {item?.name}
                </h3>
              </div>
              <div>
                <button
                  style={{ height: "fit-content", marginLeft: "10px" }}
                  onClick={() => {
                    axios
                      .put("http://localhost:5200/todo/undo", {
                        _id: item?._id,
                      })
                      .then(() => {
                        getAllTodo();
                      })
                      .catch((err) => {
                        console.log("err", err);
                      });
                  }}
                >
                  {item?.done === false ? "Done" : "Undone"}
                </button>
                <button
                  style={{ height: "fit-content", marginLeft: "10px" }}
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  style={{ height: "fit-content", marginLeft: "10px" }}
                  onClick={() => {
                    axios
                      .delete(`http://localhost:5200/todo/del/${item?._id}`)
                      .then(() => {
                        getAllTodo();
                      })
                      .catch((err) => {
                        console.log("err", err);
                      });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Please add a list</div>
      )}
    </div>
  );
};

export default Todo;
