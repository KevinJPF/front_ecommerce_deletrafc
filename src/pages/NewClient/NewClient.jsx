import styles from "./NewClient.module.css";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import { useState } from "react";

const NewClient = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [headersEnderecos] = useState([
    { title: "Nome", type: "text", key: "name", showSearch: true },
    { title: "Logradouro", type: "text", key: "logradouro", showSearch: true },
    { title: "Número", type: "text", key: "numero", showSearch: true },
  ]);

  const [contentEnderecos] = useState([
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

  const [headersPagamentos] = useState([
    { title: "Nome", type: "text", key: "name", showSearch: true },
    { title: "Número", type: "text", key: "numero", showSearch: true },
    { title: "Codigo", type: "text", key: "codigo", showSearch: true },
  ]);

  const [contentPagamentos] = useState([
    {
      name: "Kevin Juliano",
      codigo: "123",
      numero: "1234-1234-1234-1234",
    },
    {
      name: "Kevin Juliano",
      codigo: "321",
      numero: "4321-4321-4321-4321",
    },
  ]);

  const tableSelectedClient = (selectedItems) => {
    // setSelectedAddress(selectedItems[0]);
  };

  return (
    <div className={styles.main_container}>
      {step == 1 && (
        <>
          <div className={styles.data_container}>
            <div className={styles.data_row}>
              <h1>Dados Pessoais</h1>
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
            <div className={styles.buttons_row}>
              <Button
                text={"Cancelar"}
                redBtn={true}
                onClick={() => {
                  navigate("/clients");
                }}
              />
              <Button text={"Continuar"} onClick={() => setStep(step + 1)} />
            </div>
          </div>
        </>
      )}
      {step == 2 && (
        <>
          <div className={styles.data_container}>
            <div className={styles.data_row}>
              <h1>Endereços de Entrega</h1>
            </div>
            <div className={styles.data_row}>
              <InputText
                label={"Tipo Residência"}
                placeholder={"Tipo Residência"}
              />
              <InputText
                label={"Tipo Logradouro"}
                placeholder={"Tipo Logradouro"}
              />
            </div>
            <div className={styles.data_row}>
              <InputText label={"País"} placeholder={"País"} />
              <InputText label={"Estado"} placeholder={"Estado"} />
            </div>
            <div className={styles.data_row}>
              <InputText label={"Cidade"} placeholder={"Cidade"} />
              <InputText label={"Bairro"} placeholder={"Bairro"} />
            </div>
            <div className={styles.data_row}>
              <InputText label={"Número"} placeholder={"Número"} />
              <InputText label={"Logradouro"} placeholder={"Logradouro"} />
            </div>
            <div className={styles.end_row}>
              <div className={styles.end_title_row}>
                <p>Endereços de Entrega</p>
                <Button text={"Novo Endereço"} />
              </div>
              <Table
                headers={headersEnderecos}
                data={contentEnderecos}
                selectedItemLift={tableSelectedClient}
                showQuantity={false}
              />
            </div>
            <div className={styles.buttons_row}>
              <Button
                text={"Voltar"}
                darkBtn={true}
                onClick={() => setStep(step - 1)}
              />
              <Button text={"Continuar"} onClick={() => setStep(step + 1)} />
            </div>
          </div>
        </>
      )}
      {step == 3 && (
        <>
          <div className={styles.data_container}>
            <div className={styles.data_row}>
              <h1>Endereço de Cobrança</h1>
            </div>
            <div className={styles.data_row}>
              <InputText
                label={"Tipo Residência"}
                placeholder={"Tipo Residência"}
              />
              <InputText
                label={"Tipo Logradouro"}
                placeholder={"Tipo Logradouro"}
              />
            </div>
            <div className={styles.data_row}>
              <InputText label={"País"} placeholder={"País"} />
              <InputText label={"Estado"} placeholder={"Estado"} />
            </div>
            <div className={styles.data_row}>
              <InputText label={"Cidade"} placeholder={"Cidade"} />
              <InputText label={"Bairro"} placeholder={"Bairro"} />
            </div>
            <div className={styles.data_row}>
              <InputText label={"Número"} placeholder={"Número"} />
              <InputText label={"Logradouro"} placeholder={"Logradouro"} />
            </div>
            <div className={styles.data_row}>
              <h1>Pagamento</h1>
            </div>
            <div className={styles.data_row}>
              <InputText label={"Nº do Cartão"} placeholder={"Nº do Cartão"} />
              <InputText
                label={"Nome no Cartão"}
                placeholder={"Nome no Cartão"}
              />
            </div>
            <div className={styles.data_row}>
              <InputText label={"Bandeira"} placeholder={"Bandeira"} />
              <InputText
                label={"Cód. de Segurança"}
                placeholder={"Cód. de Segurança"}
              />
            </div>
            <div className={styles.end_row}>
              <div className={styles.end_title_row}>
                <p>Formas de Pagamento</p>
                <Button text={"Add Cartão"} />
              </div>
              <Table
                headers={headersPagamentos}
                data={contentPagamentos}
                selectedItemLift={tableSelectedClient}
                showQuantity={false}
              />
            </div>
            <div className={styles.buttons_row}>
              <Button
                text={"Voltar"}
                darkBtn={true}
                onClick={() => setStep(step - 1)}
              />
              <Button text={"Confirmar"} onClick={() => navigate("/clients")} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewClient;
