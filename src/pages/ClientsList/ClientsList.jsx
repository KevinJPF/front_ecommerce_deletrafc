import styles from "./ClientsList.module.css";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientsList = () => {
  const navigate = useNavigate();

  const [selectedClient, setSelectedClient] = useState(null);
  const [headers, setHeaders] = useState([
    { title: "Nome", type: "text", key: "name", showSearch: true },
    { title: "Email", type: "text", key: "email", showSearch: true },
    { title: "CPF", type: "text", key: "cpf", showSearch: true },
  ]);

  const [content, setContent] = useState([
    {
      name: "Jorgin",
      email: "Jorgin@gmail.com",
      cpf: "999.999.999-99",
    },
    {
      name: "Junin",
      email: "Junin@outlook.com",
      cpf: "222.222.222-22",
    },
    {
      name: "Joaquin",
      email: "Joaquin@gmail.com",
      cpf: "777.777.777-77",
    },
  ]);

  const tableSelectedClient = (selectedItems) => {
    setSelectedClient(selectedItems[0]);
  };

  const removeItemByIndex = (selectedClient) => {
    setContent((prevContent) =>
      prevContent.filter((client) => client.name !== selectedClient.name)
    );
  };

  return (
    <div className={styles.main_container}>
      <Table
        headers={headers}
        data={content}
        selectedItemLift={tableSelectedClient}
      />
      <div className={styles.buttons_row}>
        <Button
          text={"Cadastrar"}
          onClick={() => {
            navigate("/new-client");
          }}
        />
        <Button
          text={"Editar"}
          onClick={() => {
            navigate("/new-client");
          }}
        />
        <Button
          text={"Excluir"}
          redBtn={true}
          onClick={() => {
            if (selectedClient) {
              removeItemByIndex(selectedClient);
              setSelectedClient(null);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ClientsList;
