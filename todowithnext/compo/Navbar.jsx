import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  ModalOverlay,
  Spacer,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Navbar = ({ refresh, setRefresh }) => {
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [userData, setUserData] = useState();

  let [colorScheme, setColorScheme] = useState("light");
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todo) {
      let data = {
        todo: todo,
        iscompleted: false,
      };
      axios("http://localhost:8080/todo/create", {
        method: "POST",
        data: data,
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          alert(res.data);
          setRefresh(!refresh);
          onClose();
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } else {
      alert("Please fill all the fields");
    }
  };
  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  const HandelColorScheme = () => {
    if (colorScheme == "light") {
      localStorage.setItem("chakra-ui-color-mode", "dark");
      setColorScheme("dark");
      window.location.reload(true);
    } else {
      localStorage.setItem("chakra-ui-color-mode", "light");
      setColorScheme("light");
      window.location.reload(true);
    }
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"));
    let color = localStorage.getItem("chakra-ui-color-mode");
    setUserData(data);
    setColorScheme(color);
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={4}
      backgroundColor={"#319795"}
      color="white"
    >
      <Heading>Todo App</Heading>
      <Spacer />
      <Button mr="5px" onClick={onOpen} colorScheme="teal" variant="solid">
        Add Task
      </Button>
      <Button
        onClick={HandelColorScheme}
        mr="5px"
        colorScheme="teal"
        variant="solid"
      >
        {colorScheme === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Menu>
        <MenuButton as={Button}>{userData && userData["name"]}</MenuButton>
        <MenuList bg="black">
          <MenuItem bg={"teal"}>{userData && userData["email"]}</MenuItem>
          <MenuItem onClick={handelLogout} bg={"teal"}>
            LOGOUT
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <FormControl>
              <FormLabel>Todo Info</FormLabel>
              <Input
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
                type="text"
                placeholder="Add Todo"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddTodo} colorScheme="green">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
