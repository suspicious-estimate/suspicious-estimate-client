'use client';
import { useState } from 'react';
import { ProjectCreate } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProjectFormProps {
  onSubmit: (data: ProjectCreate) => void;
  isLoading?: boolean;
}

export function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [contractAmount, setContractAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      address: address.trim() || undefined,
      contractor_name: contractorName.trim() || undefined,
      contract_amount: contractAmount ? Number(contractAmount) : undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-1.5">
        <Label htmlFor="project-title">
          프로젝트 이름 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="project-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 우리집 25평 인테리어"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="project-address">주소</Label>
        <Input
          id="project-address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="공사 현장 주소"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="project-contractor">시공업체</Label>
        <Input
          id="project-contractor"
          type="text"
          value={contractorName}
          onChange={(e) => setContractorName(e.target.value)}
          placeholder="업체명"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="project-amount">계약금액 (만원)</Label>
        <Input
          id="project-amount"
          type="number"
          value={contractAmount}
          onChange={(e) => setContractAmount(e.target.value)}
          placeholder="예: 2800"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="project-start">시작일</Label>
          <Input
            id="project-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="project-end">종료일</Label>
          <Input
            id="project-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={!title.trim() || isLoading}>
        {isLoading ? '생성 중...' : '프로젝트 생성'}
      </Button>
    </form>
  );
}
