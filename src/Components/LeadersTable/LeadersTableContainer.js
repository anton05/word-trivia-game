import { useEffect, useState } from "react";
import LeadersTable from "./LeadersTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader/Loader";


const LeadersTableContainer = () => {
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      const response = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const uniqueNames = [];

      setUsers(
        response
          .sort((a, b) => b.score - a.score)
          .filter((element) => {
            const isDuplicate = uniqueNames.includes(element.name);

            if (!isDuplicate) {
              uniqueNames.push(element.name);
              return true;
            }

            return false;
          })
          .slice(0, 3)
      );
    };

    getUsers();
  }, []);

  return users.length ? <LeadersTable stats={users} /> : <Loader />;
};

export default LeadersTableContainer;