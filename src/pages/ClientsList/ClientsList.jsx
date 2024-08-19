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
      name: "Raphael Cavalcante Veiga",
      email: "veiguinha@gmail.com",
      cpf: "232.323.232-23",
    },
    {
      name: "Eduardo Pereira Rodrigues",
      email: "dudu_guerreiro@outlook.com",
      cpf: "777.777.777-77",
    },
    {
      name: "Joaquin Piquerez",
      email: "joaco_pique@gmail.com",
      cpf: "222.222.222-22",
    },
    {
      name: "Ronielson da Silva Barbosa",
      email: "rustico_rony@yahoo.com.br",
      cpf: "101.010.101-01",
    },
    {
      name: "Estêvão Willian Almeida",
      email: "estevao_w@hotmail.com",
      cpf: "411.411.411-41",
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
