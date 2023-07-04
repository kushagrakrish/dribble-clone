import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import React from "react";

const route = () => {
  return (
    <>
      <Modal>
        <h1 className='modal-head-text'>Create Project</h1>
        <ProjectForm />
      </Modal>
    </>
  );
};

export default route;
