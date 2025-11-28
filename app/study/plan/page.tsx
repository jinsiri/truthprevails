'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

const INITIAL_PLAN = [
  {
    fullDate: '2025-11-28',
    dateStr: '11/28 (금)',
    phase: '1차 집중',
    isExam: false,
    tasks: [
      { id: 1, subject: '컴파일러', content: '1~7강 워크북 풀기 (어휘/구문분석)', done: false },
      { id: 2, subject: '컴파일러', content: '★ 오토마타/파스트리 직접 그리기', done: false },
    ],
  },
  {
    fullDate: '2025-11-29',
    dateStr: '11/29 (토)',
    phase: '1차 집중 + 2차 선행',
    isExam: false,
    tasks: [
      { id: 3, subject: '컴파일러', content: '8~15강 워크북 (의미분석/코드생성)', done: false },
      { id: 4, subject: '컴파일러', content: '중간코드 변환 연습문제 풀기', done: false },
      { id: 5, subject: '머신러닝', content: '지도/비지도 학습 및 주요 용어 훑어보기', done: false }, // 👈 추가
    ],
  },
  {
    fullDate: '2025-11-30',
    dateStr: '11/30 (일)',
    phase: '1차 집중',
    isExam: false,
    tasks: [
      { id: 6, subject: '클라우드', content: '워크북 전체 1회독 (용어/정의)', done: false },
      { id: 7, subject: '클라우드', content: 'IaaS, PaaS, SaaS 구분표 암기', done: false },
    ],
  },
  {
    fullDate: '2025-12-01',
    dateStr: '12/01 (월)',
    phase: '1차 집중',
    isExam: false,
    tasks: [
      { id: 8, subject: '컴파일러', content: '기출 3개년 풀기 + 오답노트', done: false },
      { id: 9, subject: '컴파일러', content: '취약 파트(LR파싱 등) 집중 공략', done: false },
    ],
  },
  {
    fullDate: '2025-12-02',
    dateStr: '12/02 (화)',
    phase: '1차 집중',
    isExam: false,
    tasks: [
      { id: 10, subject: '클라우드', content: '기출 3~4개년 풀기 (문제은행식)', done: false },
      { id: 11, subject: '공통', content: '두 과목 헷갈리는 개념 교차 점검', done: false },
    ],
  },
  {
    fullDate: '2025-12-03',
    dateStr: '12/03 (수)',
    phase: '1차 집중 + 2차 선행', // 👈 변경
    isExam: false,
    tasks: [
      { id: 12, subject: '컴파일러', content: '기출 변형/심화 문제 풀이', done: false },
      { id: 13, subject: '클라우드', content: '오픈소스/기술 용어 암기 확인', done: false },
      { id: 14, subject: '머신러닝', content: '주요 알고리즘 (DT, SVM 등) 특징 요약 및 파악', done: false }, // 👈 추가
    ],
  },
  {
    fullDate: '2025-12-04',
    dateStr: '12/04 (목)',
    phase: '1차 집중',
    isExam: false,
    tasks: [
      { id: 15, subject: '컴파일러', content: 'FIRST/FOLLOW 집합 구하기 최종 연습', done: false },
      { id: 16, subject: '클라우드', content: '워크북 객관식 틀린 것 다시 보기', done: false },
    ],
  },
  {
    fullDate: '2025-12-05',
    dateStr: '12/05 (금)',
    phase: '1차 최종',
    isExam: false,
    tasks: [{ id: 17, subject: '총정리', content: '1차 과목 최종 리허설 (시간 재고 풀기)', done: false }],
  },
  {
    fullDate: '2025-12-06',
    dateStr: '12/06 (토)',
    phase: '컨디션 조절',
    isExam: false,
    tasks: [{ id: 18, subject: '마무리', content: '오답노트 가볍게 훑기 & 일찍 자기', done: false }],
  },
  {
    fullDate: '2025-12-07',
    dateStr: '12/07 (일)',
    phase: 'D-Day',
    isExam: true,
    tasks: [
      { id: 19, subject: '시험', content: '1차 시험: 컴파일러 / 클라우드', done: false },
      { id: 20, subject: '휴식', content: '시험 후 뇌 식히기 (저녁엔 2차 과목 목차만)', done: false },
    ],
  },
  {
    fullDate: '2025-12-08',
    dateStr: '12/08 (월)',
    phase: '2차 계획',
    isExam: false,
    tasks: [
      { id: 21, subject: '빅데이터/오픈', content: '워크북 핵심 요약 정독 (데이터 개념)', done: false },
      { id: 22, subject: '오픈소스', content: 'R/Python 기본 문법 및 시각화 코드 확인', done: false },
    ],
  },
  {
    fullDate: '2025-12-09',
    dateStr: '12/09 (화)',
    phase: '2차 계획',
    isExam: false,
    tasks: [
      { id: 23, subject: '머신러닝', content: '주요 알고리즘별 특징 및 수식 의미 **심화** 파악', done: false }, // 👈 변경
      { id: 24, subject: '머신러닝', content: '강화학습 개념 및 헷갈리는 부분 최종 점검', done: false }, // 👈 변경
    ],
  },
  {
    fullDate: '2025-12-10',
    dateStr: '12/10 (수)',
    phase: '2차 계획',
    isExam: false,
    tasks: [{ id: 25, subject: '3과목 공통', content: '각 과목 기출 3개년 풀이 (시간 부족 시 답 암기)', done: false }],
  },
  {
    fullDate: '2025-12-11',
    dateStr: '12/11 (목)',
    phase: '2차 계획',
    isExam: false,
    tasks: [{ id: 26, subject: '최종점검', content: '기출 오답 + 워크북 OX 퀴즈 무한반복', done: false }],
  },
  {
    fullDate: '2025-12-12',
    dateStr: '12/12 (금)',
    phase: 'D-Day',
    isExam: true,
    tasks: [{ id: 27, subject: '시험', content: '2차 시험: 빅데이터 / 오픈소스 / 머신러닝', done: false }],
  },
];

export default function ExamScheduler() {
  const [schedule, setSchedule] = useState(INITIAL_PLAN);
  const [today, setToday] = useState<Date | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('knou-exam-plan-2025');
    if (savedData) {
      try {
        setSchedule(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load plan', e);
      }
    }
    setToday(new Date());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('knou-exam-plan-2025', JSON.stringify(schedule));
    }
  }, [schedule, isLoaded]);

  const toggleTask = (dayIndex: number, taskId: number) => {
    const newSchedule = [...schedule];
    const day = newSchedule[dayIndex];
    const task = day.tasks.find((t) => t.id === taskId);
    if (task) task.done = !task.done;
    setSchedule(newSchedule);
  };

  const resetData = () => {
    if (confirm('모든 기록을 초기화 하시겠습니까?')) {
      setSchedule(INITIAL_PLAN);
      localStorage.removeItem('knou-exam-plan-2025');
    }
  };

  const totalTasks = schedule.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedTasks = schedule.reduce((acc, day) => acc + day.tasks.filter((t) => t.done).length, 0);
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const getDDay = (targetDateStr: string) => {
    if (!today) return '...';
    const target = new Date(targetDateStr);
    const current = new Date(today);
    target.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    const diff = target.getTime() - current.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `D-${days}`;
    if (days === 0) return 'D-Day';
    return 'End';
  };

  const checkIsToday = (targetDateStr: string) => {
    if (!today) return false;
    const target = new Date(targetDateStr);
    const current = new Date(today);
    return target.getFullYear() === current.getFullYear() && target.getMonth() === current.getMonth() && target.getDate() === current.getDate();
  };

  const checkIsPast = (targetDateStr: string) => {
    if (!today) return false;
    const target = new Date(targetDateStr);
    const current = new Date(today);
    target.setHours(0, 0, 0, 0);
    current.setHours(0, 0, 0, 0);
    return target.getTime() < current.getTime();
  };

  if (!isLoaded) return <div className='flex min-h-screen items-center justify-center bg-slate-50 p-6'>로딩중...</div>;

  return (
    <div className='min-h-screen bg-blue-50 px-6 pt-24 pb-20 font-sans text-gray-800'>
      <div className='mx-auto max-w-2xl space-y-6'>
        <header className='fixed top-0 right-0 left-0 z-50 mb-8 flex items-center justify-between bg-sky-950 px-4 py-2'>
          <div>
            <h1 className='text-2xl font-bold text-gray-50'>KNOU 기말고사 공부 계획</h1>
            <p className='text-sm text-gray-300'>{today ? `${today.getMonth() + 1}월 ${today.getDate()}일` : ''}</p>
          </div>
          <div className='text-right'>
            <div className='text-lg font-bold text-gray-200'>1차 시험 {getDDay('2025-12-07')}</div>
            <div className='mt-1 text-xs text-gray-300'>2차 시험 {getDDay('2025-12-12')}</div>
          </div>
        </header>

        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-2 flex items-end justify-between'>
            <span className='font-semibold text-slate-700'>전체 진행률</span>
            <div className='flex items-end gap-2'>
              <span className='text-2xl font-bold text-indigo-600'>{progress}%</span>
              <button onClick={resetData} className='mb-1 text-xs text-slate-300 underline hover:text-red-400'>
                초기화
              </button>
            </div>
          </div>
          <div className='h-3 w-full overflow-hidden rounded-full bg-slate-100'>
            <div className='h-full bg-indigo-500 transition-all duration-500 ease-out' style={{ width: `${progress}%` }} />
          </div>
          <p className='mt-2 text-right text-xs text-slate-400'>
            {completedTasks} / {totalTasks} 완료
          </p>
        </div>

        <div className='space-y-4'>
          {schedule.map((day, dIndex) => {
            const isToday = checkIsToday(day.fullDate);
            const isPast = checkIsPast(day.fullDate);

            return (
              <div
                key={dIndex}
                className={`relative rounded-xl border p-5 transition-all ${
                  day.isExam
                    ? 'border-rose-200 bg-rose-50'
                    : isToday
                      ? 'z-10 scale-[1.02] border-indigo-500 bg-white shadow-lg ring-1 ring-indigo-500'
                      : isPast
                        ? 'border-slate-100 bg-slate-50 opacity-60'
                        : 'border-slate-200 bg-white'
                } `}
              >
                <div className='mb-3 flex items-start justify-between'>
                  <div className='flex items-center gap-2'>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-bold ${
                        day.isExam ? 'bg-rose-500 text-white' : isToday ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      } `}
                    >
                      {day.dateStr}
                    </span>
                    <span className='text-xs font-medium text-slate-400'>{day.phase}</span>
                    {isToday && <span className='animate-pulse text-xs font-bold text-indigo-600'>오늘 할 일!</span>}
                  </div>
                  {day.isExam && <Trophy className='h-5 w-5 text-rose-500' />}
                </div>

                <div className='space-y-2'>
                  {day.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(dIndex, task.id)}
                      className='group -mx-2 flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors select-none hover:bg-slate-50'
                    >
                      <div className={`mt-0.5 transition-colors ${task.done ? 'text-indigo-500' : 'text-slate-300 group-hover:text-indigo-300'}`}>
                        {task.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                      </div>
                      <div className={`flex-1 ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        <span className='mr-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-500'>{task.subject}</span>
                        <span className='text-sm font-medium'>{task.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
