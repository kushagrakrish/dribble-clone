import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const route = async () => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");
  return (
    <>
      <Modal>
        <h1 className='modal-head-text'>Create Project</h1>
        <ProjectForm project={} type='create' session={session} />
      </Modal>
    </>
  );
};

export default route;
