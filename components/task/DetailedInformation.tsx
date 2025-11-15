'use client';

import { useState } from 'react';
import Button from '@/components/shared/Button';
import SessionInformation from '@/components/task/SessionInformation';
import DeleteSessionDialog from '@/components/task/DeleteSessionDialog';

export const DetailedInformation = () => {
  const [sessions, setSessions] = useState<number[]>([1]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);

  const handleAddSession = () => setSessions([...sessions, sessions.length + 1]);

  const handleDeleteClick = (index: number) => {
    setSessionToDelete(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (sessionToDelete !== null) {
      setSessions(sessions.filter((_, index) => index !== sessionToDelete));
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-subtitle font-bold">상세 정보</h2>
      {sessions.map((_, index) => (
        <SessionInformation
          key={index}
          sessionNumber={sessions.length > 1 ? index + 1 : undefined}
          showDelete={sessions.length > 1}
          onDelete={() => handleDeleteClick(index)}
        />
      ))}
      <Button
        type="button"
        variant="black"
        size="lg"
        fullWidth
        className='rounded-lg'
        onClick={handleAddSession}
      >
        회차 추가하기
      </Button>
      <DeleteSessionDialog
        isOpen={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};
