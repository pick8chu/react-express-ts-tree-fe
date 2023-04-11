import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Node } from '../model/node';
import { addNode } from '../api/treeHandler';
import { FormEvent } from 'react';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  padding: 10px;
`;

interface EditProps {
    parentId: number;
    height: number;
  cb?: () => void;
}

export const NodeModal = (props: EditProps) => {
    const [role, setRole] = useState<string|undefined>(undefined);
    const [name, setName] = useState<string|undefined>(undefined);
    const [option, setOption] = useState<string|undefined>(undefined);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.cb && props.cb();
  };

  const handleSave = async () => {
    if(!role || !name || !option) {
        alert("Please fill all the fields");   
        return;
    }

    let node:Node;
    if(role === "manager") {
        node = {
            id: 0,
            name,
            parentId: props.parentId,
            height: props.height,
            departmentName: option,
            role
        }
    } else if(role === "employee") {
        node = {
            id: 0,
            name,
            parentId: props.parentId,
            height: props.height,
            programmingLanguage: option,
            role,
        }
    } else {
        return;
    }

    // await addNode(node);
    handleClose();
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>ADD NODE</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledDiv>
            <label>Role</label>
            <Form.Select onChange={
                (e: FormEvent<HTMLSelectElement>) => {
                    console.log(e.currentTarget.value)
                    const tempRole = e.currentTarget.value;
                    setRole(tempRole);
                }
            }>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
            </Form.Select>
        </StyledDiv>
          <StyledDiv>
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </StyledDiv>
          {role && <StyledDiv>
            <label>{role === 'manager'? 'Department Name' : 'Programming Language'}</label>
            <input
              type="text"
              onChange={(e) => {
                setOption(e.target.value);
              }}
            />
          </StyledDiv>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
