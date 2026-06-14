'use client';
import { useState } from 'react';
import { ProjectCreate } from '@/entities/project/model/types';
import { Button } from '@/shared/ui/button';

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
      {/* TODO: 목업 화면 4번(새 프로젝트) 참고하여 구현
          - 프로젝트 이름* (필수)
          - 주소 (선택)
          - 시공업체명 (선택)
          - 계약금액 (만원 단위 입력)
          - 공사 시작일 (date picker)
          - 공사 종료일 (date picker)
          - 생성 버튼 (파랑, 하단 고정)
      */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          프로젝트 이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 우리집 25평 인테리어"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="공사 현장 주소"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">시공업체</label>
        <input
          type="text"
          value={contractorName}
          onChange={(e) => setContractorName(e.target.value)}
          placeholder="업체명"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">계약금액 (만원)</label>
        <input
          type="number"
          value={contractAmount}
          onChange={(e) => setContractAmount(e.target.value)}
          placeholder="예: 2800"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <Button type="submit" size="lg" fullWidth disabled={!title.trim() || isLoading}>
        {isLoading ? '생성 중...' : '프로젝트 생성'}
      </Button>
    </form>
  );
}
