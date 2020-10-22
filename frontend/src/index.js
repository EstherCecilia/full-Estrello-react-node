import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";

import api from "./service";

import "./styles.css";

function AdicionaCard({ draftCard }) {
  console.log(draftCard);

  api
    .post("tasks", {
      titulo: draftCard.title,
      descricao: draftCard.description,
      statu: "backlog",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
}

function UncontrolledBoard({ data }) {
  return (
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      onLaneRemove={(card) => console.log(card)}
      onCardRemove={(card) => console.log(card)}
      onLaneRename={console.log}
      initialBoard={data}
      allowAddCard={{ on: "top" }}
      onNewCardConfirm={(draftCard) => {
        AdicionaCard({ draftCard });
        return {
          id: new Date().getTime(),
          ...draftCard,
        };
      }}
      onCardNew={console.log}
    />
  );
}

function App() {
  const [broad, setBroad] = useState({});

  useEffect(() => {
    api
      .get("tasks")
      .then((response) => {
        let aux = {
          columns: [
            {
              id: 1,
              title: "Backlog",
              cards: response.data
                .filter((data) => data.statu === "backlog")
                .map((dado) => {
                  return {
                    id: dado.id,
                    title: dado.titulo,
                    description: dado.descricao,
                  };
                }),
            },
            {
              id: 2,
              title: "To do",
              cards: response.data
                .filter((data) => data.statu === "to-do")
                .map((dado) => {
                  return {
                    id: dado.id,
                    title: dado.titulo,
                    description: dado.descricao,
                  };
                }),
            },
            {
              id: 3,
              title: "Doing",
              cards: response.data
                .filter((data) => data.statu === "doing")
                .map((dado) => {
                  return {
                    id: dado.id,
                    title: dado.titulo,
                    description: dado.descricao,
                  };
                }),
            },
            {
              id: 4,
              title: "Done",
              cards: response.data
                .filter((data) => data.statu === "done")
                .map((dado) => {
                  return {
                    id: dado.id,
                    title: dado.titulo,
                    description: dado.descricao,
                  };
                }),
            },
          ],
        };
        setBroad(aux);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  return (
    <>
      <p
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          fontFamily: "Roboto",
          color: "hsl(0, 0%, 100%)",
          textAlign: "center",
        }}
      >
        ESTRELLO
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {broad.columns !== undefined ? (
          <UncontrolledBoard data={broad} />
        ) : null}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
