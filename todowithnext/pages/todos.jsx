import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../compo/Navbar";
import { Box, Button, Center, Heading, Text, grid } from "@chakra-ui/react";
const Home = () => {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getdata = () => {
    axios(`https://dull-worm-top-coat.cyclic.app/todo/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const UpdateTodo = (id) => {
    axios(`https://dull-worm-top-coat.cyclic.app/todo/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        alert(res.data);
        setRefresh(!refresh);
      })
      .catch((err) => console.error(err));
  };
  const DeleteTodo = (id) => {
    axios(`https://dull-worm-top-coat.cyclic.app/todo/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        alert(res.data);
        setRefresh(!refresh);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getdata();
  }, [refresh]);

  return (
    <>
      <Navbar refresh={refresh} setRefresh={setRefresh} />
      <Center>
        <Heading>Your Todo List</Heading>
      </Center>
      <Box display={"flex"} gap={10} flexDir={"column"} alignItems={"center"}>
        {data?.map((el, index) => {
          return (
            <Box
              bg={el.iscompleted ? "green.300" : "red.300"}
              key={index}
              p="20px"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            >
              <Center>
                {" "}
                <Text fontSize={"30px"}>{el.todo}</Text>
              </Center>
              <Text fontSize={"20px"}>
                Status: {el.iscompleted ? "Completed" : "Not-Completed"}
              </Text>
              <Button m="5px" onClick={() => UpdateTodo(el._id)}>
                Toggle Status
              </Button>
              <Button m="5px" onClick={() => DeleteTodo(el._id)}>
                Delete Todo
              </Button>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Home;
