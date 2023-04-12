import React, { useState } from 'react';
import styled from 'styled-components';
import { Node } from '../model/node';
import { addNode, updateRootNode } from '../api/treeHandler';
import { FormEvent } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  padding: 10px;
`;

interface EditProps {
  parentId: string | null;
  height: number;
  cb?: () => void;
}

export const NodeModal = ({ parentId, height, cb }: EditProps) => {
  const [role, setRole] = useState<string>('manager');
  const [name, setName] = useState<string | undefined>(undefined);
  const [option, setOption] = useState<string | undefined>(undefined);
  const [show, setShow] = useState(false);
  const isChangeRoot = !parentId && height === 0;

  const handleClose = () => {
    setShow(false);
    cb && cb();
  };

  const handleSave = async () => {
    if (!role || !name || !option) {
      alert('Please fill all the fields');
      return;
    }

    let node: Node;
    const id = isChangeRoot ? 'root' : uuidv4().toString();

    if (role === 'manager') {
      node = {
        id,
        name,
        parentId,
        height,
        departmentName: option,
        role,
      };
    } else if (role === 'employee') {
      node = {
        id,
        name,
        parentId,
        height,
        programmingLanguage: option,
        role,
      };
    } else {
      return;
    }

    if (isChangeRoot) {
      await updateRootNode(node);
    } else {
      await addNode(node);
    }
    handleClose();
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>{isChangeRoot ? `✏️ update root node` : `⇒ add child node`}</Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader>
          <Modal.Title>Add Node</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <StyledDiv>
            <label>Role</label>
            <select
              onChange={(e: FormEvent<HTMLSelectElement>) => {
                console.log(e.currentTarget.value);
                const tempRole = e.currentTarget.value;
                setRole(tempRole);
              }}
            >
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </StyledDiv>
          <StyledDiv>
            <label>Name</label>
            <input
              type="text"
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </StyledDiv>
          {role && (
            <StyledDiv>
              <label>{role === 'manager' ? 'Department Name' : 'Programming Language'}</label>
              <input
                type="text"
                onChange={e => {
                  setOption(e.target.value);
                }}
              />
            </StyledDiv>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
