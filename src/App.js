import { useState, useRef, useEffect } from "react";
import Title from "./Components/Title";
import Player from "./Components/Player";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { uuid } from "uuidv4";

const LOCAL_STORAGE_Key = "scoreApp.players";
function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Violeta", score: 11 },
    { id: 2, name: "Eszter", score: 14 },
    { id: 3, name: "Jeroen v2", score: 4 },
    { id: 4, name: "Lisa", score: 42 },
  ]);
  const refPlayer = useRef();

  //sorting players
  const compareName = (playerA, playerB) => {
    return playerA.name.localeCompare(playerB.name);
  };

  const compareScore = (palyer1, player2) => {
    return player2.score - palyer1.score;
  };

  const sorting = (e) => {
    const res = e.target.value;
    console.log("sorting by", res);
    if (res === "score") {
      return setPlayers([...players].sort(compareScore));
    }
    return setPlayers([...players].sort(compareName));
  };
  //storeage for our players to dont lose them every time we refresch our browser
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_Key));
    if (storedPlayers) setPlayers(storedPlayers);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_Key, JSON.stringify(players));
  }, [setPlayers]);

  function handelForm(e) {
    console.log(refPlayer.current.value);
    const newPlayer = [
      ...players,
      { id: uuid(), name: refPlayer.current.value, score: 0 },
    ];
    refPlayer.current.value = "";
    setPlayers(newPlayer);
  }

  function handleReset() {
    const resetPlayersScore = players.map((p) => {
      return {
        ...p,
        score: 0,
      };
    });
    setPlayers(resetPlayersScore);
  }
  function handleRandom() {
    const randomPlayersScore = players.map((p) => {
      return {
        ...p,
        score: Math.floor(Math.random(0, 1) * 100),
      };
    });
    setPlayers(randomPlayersScore);
  }

  return (
    <div>
      <Title />
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Sort by:</Form.Label>
                <Form.Control as="select" onChange={sorting}>
                  <option value="score">Score</option>
                  <option value="name">Name</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <ButtonGroup>
              <Button onClick={handleReset}>Reset</Button>
              <Button onClick={handleRandom}>Random score</Button>
            </ButtonGroup>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {players.map((player) => {
            return (
              <Player
                key={player.id}
                name={player.name}
                score={player.score}
                handleIncrementscore={() => {
                  const increment = players.map((p) => {
                    if (p.id === player.id)
                      return {
                        ...p,
                        score: p.score + 1,
                      };
                    return p;
                  });
                  setPlayers(increment);
                }}
              />
            );
          })}
        </Modal.Body>

        <Modal.Footer>
          <InputGroup className="mb-3">
            <FormControl
              ref={refPlayer}
              placeholder="Add player name"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={handelForm} variant="outline-secondary">
                Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default App;
