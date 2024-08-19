import styles from "./NewClient.module.css";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import { useState } from "react";

const NewClient = () => {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [headers, setHeaders] = useState([
    { title: "Nome", type: "text", key: "name", showSearch: true },
    { title: "Logradouro", type: "text", key: "logradouro", showSearch: true },
    { title: "Número", type: "text", key: "numero", showSearch: true },
  ]);

  const [content, setContent] = useState([
    {
      name: "Casa",
      logradouro: "Lilia",
      numero: "999",
    },
    {
      name: "Trabalho",
      logradouro: "Sgt. Dias",
      numero: "22",
    },
    {
      name: "Mãe",
      logradouro: "Gen. Francisco",
      numero: "7",
    },
  ]);

  const tableSelectedClient = (selectedItems) => {
    setSelectedAddress(selectedItems[0]);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.data_container}>
        <div className={styles.data_row}>
          <h1>Cadastrar Cliente</h1>
        </div>
        <div className={styles.data_row}>
          <InputText label={"Nome"} placeholder={"Nome do cliente"} />
          <InputText label={"Gênero"} placeholder={"Gênero do cliente"} />
        </div>
        <div className={styles.data_row}>
          <InputText label={"CPF"} placeholder={"CPF do cliente"} />
          <InputText label={"Tel."} placeholder={"(99) 99999-9999"} />
        </div>
        <div className={styles.data_row}>
          <InputText label={"Email"} placeholder={"Email do cliente"} />
          <InputText
            label={"Data Nasc."}
            placeholder={"Data Nasc. do cliente"}
          />
        </div>
        <div className={styles.data_row}>
          <InputText
            label={"Senha"}
            placeholder={"Senha do cliente"}
            isPassword={true}
          />
          <InputText
            label={"Confirmar Senha"}
            placeholder={"Confirmar Senha do cliente"}
            isPassword={true}
          />
        </div>
        <div className={styles.end_row}>
          <div className={styles.end_title_row}>
            <p>Endereços de Entrega</p>
            <Button text={"Novo Endereço"} />
          </div>
          <Table
            headers={headers}
            data={content}
            selectedItemLift={tableSelectedClient}
            showQuantity={false}
          />
        </div>
        <div className={styles.buttons_row}>
          <Button
            text={"Cancelar"}
            darkBtn={true}
            onClick={() => {
              navigate("/clients");
            }}
          />
          <Button text={"Confirmar"} />
        </div>
      </div>
      {/* <InputText
        label={"Endereço Cobrança"}
        placeholder={"Endereço Cobrança"}
      />
      <InputText label={"Endereço Entrega"} placeholder={"Endereço Entrega"} /> */}
    </div>
  );
};

export default NewClient;
