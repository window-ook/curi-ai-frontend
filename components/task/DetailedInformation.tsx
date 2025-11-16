'use client';

import Button from '@/components/ui/Button';
import SessionInformation from '@/components/task/SessionInformation';
import DeleteSessionDialog from '@/components/ui/DeleteSessionDialog';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { detailedInformationSchema, IDetailedInfoForm } from '@/schema/detailedInformation';

export const DetailedInformation = () => {
  const form = useForm<IDetailedInfoForm>({
    resolver: zodResolver(detailedInformationSchema),
    defaultValues: {
      sessions: [{
        date: null,
        startPeriod: 'AM',
        startHour: '10',
        startMinute: '00',
        endPeriod: 'AM',
        endHour: '11',
        endMinute: '00',
        activityContent: ''
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sessions'
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);

  const handleAddSession = () => append({
    date: null,
    startPeriod: 'AM',
    startHour: '10',
    startMinute: '00',
    endPeriod: 'AM',
    endHour: '11',
    endMinute: '00',
    activityContent: ''
  });

  const handleDeleteClick = (index: number) => {
    setSessionToDelete(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (sessionToDelete !== null) {
      remove(sessionToDelete);
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-subtitle font-bold text-custom-black-900">상세 정보</h2>
      {fields.map((field, index) => {
        // SessionInformation 렌더링 시점에 min/max 날짜 계산: 회차 날짜 순서 검증
        let minDate: Date | undefined = undefined;
        let maxDate: Date | undefined = undefined;

        if (index > 0) {
          const prevDate = form.getValues(`sessions.${index - 1}.date`);
          if (prevDate) {
            minDate = new Date(prevDate);
            minDate.setDate(minDate.getDate() + 1);
          }
        }

        if (index < fields.length - 1) {
          const nextDate = form.getValues(`sessions.${index + 1}.date`);
          if (nextDate) {
            maxDate = new Date(nextDate);
            maxDate.setDate(maxDate.getDate() - 1);
          }
        }

        return (
          <SessionInformation
            key={field.id}
            sessionNumber={fields.length > 1 ? index + 1 : undefined}
            showDelete={fields.length > 1}
            onDelete={() => handleDeleteClick(index)}
            form={form}
            index={index}
            minDate={minDate}
            maxDate={maxDate}
          />
        );
      })}

      <Button
        type="button"
        variant="black"
        size="lg"
        fullWidth
        className='rounded-lg'
        onClick={handleAddSession}
        ariaLabel="회차 추가하기 버튼"
      >
        회차 추가하기
      </Button>

      <DeleteSessionDialog
        isOpen={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </section>
  );
};
