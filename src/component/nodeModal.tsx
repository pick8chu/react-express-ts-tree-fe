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

type EditProps = {
  parentId: string | null;
  height: number;
  cb?: () => void;
};

type RoleType = 'manager' | 'employee';

const isRoleType = (role: string): role is RoleType => {
  return role === 'manager' || role === 'employee';
};

export const NodeModal = ({ parentId, height, cb }: EditProps) => {
  const [role, setRole] = useState<RoleType>('manager');
  const [name, setName] = useState<string | undefined>(undefined);
  const [option, setOption] = useState<string | undefined>(undefined);
  const [show, setShow] = useState(false);
  const isRootNode = !parentId && height === 0;

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
    const id = isRootNode ? 'root' : uuidv4().toString();

    switch (role) {
      case 'manager':
        node = {
          id,
          name,
          parentId,
          height,
          departmentName: option,
          role,
        };
        break;
      case 'employee':
        node = {
          id,
          name,
          parentId,
          height,
          programmingLanguage: option,
          role,
        };
        break;
      default:
        alert('Invalid role');
        throw new Error('Invalid role');
    }

    isRootNode ? await updateRootNode(node) : await addNode(node);

    handleClose();
  };

  const onChangeName = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onChangeOption = (e: FormEvent<HTMLInputElement>) => {
    setOption(e.currentTarget.value);
  };

  const onChangeRole = (e: FormEvent<HTMLSelectElement>) => {
    const tempRole = e.currentTarget.value;
    if (!isRoleType(tempRole)) {
      alert('Please select a valid role');
      return;
    }

    setRole(tempRole);
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>{isRootNode ? `✏️ update root node` : `⇒ add child node`}</Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader>
          <Modal.Title>Add Node</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <StyledDiv>
            <label>Role</label>
            <select onChange={onChangeRole}>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </StyledDiv>
          <StyledDiv>
            <label>Name</label>
            <input type="text" onChange={onChangeName} />
          </StyledDiv>
          {role && (
            <StyledDiv>
              <label>{role === 'manager' ? 'Department Name' : 'Programming Language'}</label>
              <input type="text" onChange={onChangeOption} />
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
