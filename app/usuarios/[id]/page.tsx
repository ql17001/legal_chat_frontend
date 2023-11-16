'use client';
import UserForm from '@/components/UserForm';
import React from 'react'

interface IProperties {
  params: {
    id: string;
  }
}

const UpdateUsuarioPage = ({ params: { id } }:IProperties) => {
  return (
    <UserForm id={Number(id)}/>
  )
}

export default UpdateUsuarioPage