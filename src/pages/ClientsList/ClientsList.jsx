import styles from "./ClientsList.module.css";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { usePutData } from "../../hooks/usePutData";

const ClientsList = () => {
  const navigate = useNavigate();
  const { fetchApiData, data, loading, error } = useFetchData("clientes");
  const { putApiData, response } = usePutData();

  const [selectedClient, setSelectedClient] = useState(null);
  const [headers, setHeaders] = useState([
    { title: "Nome", type: "text", key: "nomeCliente", showSearch: true },
    { title: "Email", type: "text", key: "email", showSearch: true },
    { title: "CPF", type: "text", key: "cpf", showSearch: true },
    {
      title: "Ativo",
      type: "checkbox",
      key: "clienteAtivo",
      showSearch: false,
    },
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

  useEffect(() => {
    try {
      // console.log(data);
      setContent(data);
    } catch (e) {
      throw new Error("Failed to parse JSON");
    }
  }, [data]);

  const tableSelectedClient = (selectedItems) => {
    setSelectedClient(selectedItems[0]);
  };

  const removeItemByIndex = (selectedClient) => {
    setContent((prevContent) =>
      prevContent.filter((client) => client.name !== selectedClient.name)
    );
  };

  function handleDeactivateActivate() {
    const userConfirmed = window.confirm(
      `Tem certeza que deseja ${
        selectedClient.clienteAtivo ? "inativar" : "ativar"
      } o cliente ${selectedClient.nomeCliente}?`
    );

    if (userConfirmed) {
      const body = {
        id: selectedClient.id,
      };

      putApiData(
        `cliente/${selectedClient.clienteAtivo ? "inativar" : "ativar"}`,
        body
      );

      alert(
        `O cliente foi ${
          selectedClient.clienteAtivo ? "inativado" : "ativado"
        } com sucesso!`
      );
      fetchApiData();
    } else {
      // O usuário cancelou a ação
      console.log("Ação cancelada.");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.main_container}>
      {content && (
        <Table
          headers={headers}
          data={content}
          selectedItemLift={tableSelectedClient}
        />
      )}
      <div className={styles.buttons_row}>
        <Button
          text={"Cadastrar"}
          onClick={() => {
            navigate("/new-client");
          }}
        />
        <Button
          text={"Editar"}
          darkBtn={!selectedClient}
          onClick={() => {
            navigate(`/new-client/${selectedClient.id}`);
          }}
        />
        {selectedClient && (
          <Button
            text={selectedClient.clienteAtivo ? "Desativar" : "Ativar"}
            redBtn={selectedClient.clienteAtivo}
            onClick={() => {
              if (selectedClient) {
                handleDeactivateActivate();
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ClientsList;
