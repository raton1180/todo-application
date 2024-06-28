import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./DragDrop.css";
import Stage from "../Stage/Stage";

const DragDrop = () => {
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState([
    {
      task: "Shopping",
      stage: "Todo",
      id: 1,
    },
    {
      task: "New Task",
      stage: "Todo",
      id: 2,
    },
    {
      task: "Make Website",
      stage: "Todo",
      id: 3,
    },
  ]);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetStage) => {
    const taskId = event.dataTransfer.getData("taskId");
    const updatedTodos = todos.map((todo, id) => {
      if (todo.id.toString() === taskId) {
        return { ...todo, stage: targetStage };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const clearFromTrash = (stage) => {
    const clearTodos = todos.filter((todo) => todo.stage !== stage);
    setTodos(clearTodos);
  };

  return (
    <Container>
      <Row>
        <Col md={12} className="mt-5 mb-5">
          <h2 className="text-center fw-bold">Todo List Application</h2>
        </Col>

        {/* search section */}

        <form>
          <Col md={12} className="d-flex justify-content-center gap-3">
            <Form.Control
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-50"
              type="text"
              placeholder="New Task"
            />
            <Button
              variant="dark"
              onClick={() => {
                setNewTask("");
                setTodos([
                  ...todos,
                  {
                    task: newTask,
                    stage: "Todo",
                    id: Math.floor(Math.random() * (1000 - 10 + 1)) + 10,
                  },
                ]);
              }}
            >
              Create
            </Button>
          </Col>
        </form>
      </Row>

      {/* Task section */}

      <Row className="mt-3 gap-5">
        <Col
          md={3}
          className="border px-0 border-dark rounded"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "Todo")}
        >
          <Col className="todo p-2 text-center rounded">
            <h3>New</h3>
          </Col>
          <Stage
            todos={todos}
            handleDragStart={handleDragStart}
            title="Todo"
            stage="Todo"
          />
        </Col>

        <Col
          md={3}
          className="border px-0 border-dark rounded"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "Doing")}
        >
          <Col className="doing p-2 text-center rounded">
            <h3>Ongoing</h3>
          </Col>
          <Stage
            todos={todos}
            handleDragStart={handleDragStart}
            title="Doing"
            stage="Doing"
          />
        </Col>
        <Col
          md={3}
          className="border px-0 border-dark rounded"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "Done")}
        >
          <Col className="done p-2 text-center rounded">
            <h3>Done</h3>
          </Col>
          <Stage
            todos={todos}
            handleDragStart={handleDragStart}
            title="Done"
            stage="Done"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DragDrop;
