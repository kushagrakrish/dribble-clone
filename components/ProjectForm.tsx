"use client";

import { FormState, ProjectInterface, SessionInterface } from "@/common.type";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
  project: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const image = null;
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleStateChange = (fieldName: string, value: string) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleFormSubmit = (e: React.FormEvent) => {};

  return (
    <form className='flexStart form' onSubmit={handleFormSubmit}>
      <div className='flexStart form_image_container'>
        <label htmlFor='poster' className='flexCenter form_image-label'>
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id='image'
          type='file'
          accept='image/*'
          required={type === "create" ? true : false}
          className='form_image-input'
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className='sm:p-10 object-contain z-20 '
            alt='Project Poster'
          />
        )}
      </div>
      <FormField
        title='Title'
        state={form.title}
        placeholder='Flexibble'
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title='Description'
        state={form.description}
        placeholder='Showcase and discover remarkable developer projects.'
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type='url'
        title='Website URL'
        state={form.liveSiteUrl}
        placeholder='https://kushagrakrishna.me/'
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type='url'
        title='GitHub URL'
        state={form.githubUrl}
        placeholder='https://github.com/kushagrakrish'
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      {/* Custom Category */}
      <div className='w-full flexStart'>
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
