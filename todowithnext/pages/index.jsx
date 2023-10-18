import Navbar from "../compo/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  let [userData, setUserData] = useState();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    let data = JSON.parse(localStorage.getItem("user"));
    setUserData(data);
  }, []);

  return (
    <>
      {" "}
      <Navbar />
    </>
  );
}
