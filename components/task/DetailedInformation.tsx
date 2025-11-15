'use client';

import Button from '@/components/shared/Button';
import SessionInformation from '@/components/task/SessionInformation';
import DeleteSessionDialog from '@/components/task/DeleteSessionDialog';
import { useState } from 'react';

export const DetailedInformation = () => {
  const [sessions, setSessions] = useState<number[]>([1]);
  const [sessionDates, setSessionDates] = useState<Map<number, Date | null>>(new Map());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);

  const handleAddSession = () => setSessions([...sessions, sessions.length + 1]);

  const handleDeleteClick = (index: number) => {
    setSessionToDelete(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (sessionToDelete !== null) {
      const newSessions = sessions.filter((_, index) => index !== sessionToDelete);
      const newDates = new Map(sessionDates);
      newDates.delete(sessionToDelete);
      setSessions(newSessions);
      setSessionDates(newDates);
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  const handleDateChange = (index: number, date: Date | null) => setSessionDates(new Map(sessionDates.set(index, date)));

  const getMinDate = (index: number): Date | undefined => {
    if (index === 0) return undefined;
    const prevDate = sessionDates.get(index - 1);
    if (!prevDate) return undefined;
    const minDate = new Date(prevDate);
    minDate.setDate(minDate.getDate() + 1);
    return minDate;
  };

  const getMaxDate = (index: number): Date | undefined => {
    if (index === sessions.length - 1) return undefined;
    const nextDate = sessionDates.get(index + 1);
    if (!nextDate) return undefined;
    const maxDate = new Date(nextDate);
    maxDate.setDate(maxDate.getDate() - 1);
    return maxDate;
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
          selectedDate={sessionDates.get(index) ?? null}
          onDateChange={(date) => handleDateChange(index, date)}
          minDate={getMinDate(index)}
          maxDate={getMaxDate(index)}
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
