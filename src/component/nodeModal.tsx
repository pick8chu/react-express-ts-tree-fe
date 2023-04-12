import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Node } from '../model/node';
import { addNode } from '../api/treeHandler';
import { FormEvent } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  padding: 10px;
`;

interface EditProps {
    parentStack: string[];
    height: number;
  cb?: () => void;
}

export const NodeModal = (props: EditProps) => {
    const [role, setRole] = useState<string>('manager');
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
    const id = uuidv4().toString();
    const parentId = props.parentStack[props.parentStack.length - 1];
    
    if(role === "manager") {
        node = {
            id,
            name,
            parentId,
            height: props.height,
            departmentName: option,
            role
        }
    } else if(role === "employee") {
        node = {
            id,
            name,
            parentId,
            height: props.height,
            programmingLanguage: option,
            role,
        }
    } else {
        return;
    }

    console.log(node)
    // await addNode(node);
    handleClose();
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>ADD NODE</Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader>
            <Modal.Title>Add Node</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <StyledDiv>
            <label>Role</label>
            <select onChange={
                (e: FormEvent<HTMLSelectElement>) => {
                    console.log(e.currentTarget.value)
                    const tempRole = e.currentTarget.value;
                    setRole(tempRole);
                }
            }>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
            </select>
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>
            close
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
