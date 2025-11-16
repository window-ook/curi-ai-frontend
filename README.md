# 큐리 AI 프론트엔드 포지션 과제

<img width="300" height="120" src="https://github.com/user-attachments/assets/2efce3e5-a2f3-46df-898a-c439a42f6afc" />

## 👨‍💻 소개

안녕하세요 확장성과 유지보수성을 중요하게 생각하는 프론트엔드 개발자 이창욱입니다.

## 📋 목차

- [🏃‍♂️ 로컬 실행](#-로컬-실행)
- [⚙️ 기술 스택](#-기술-스택)
- [🔧 주요 기능 구현](#-주요-기능-구현)
- [📁 디렉토리 구조](#-디렉토리-구조)
- [💡 기술적 의사결정](#-기술적-의사결정)

## 🏃‍♂️ 로컬 실행

배포 주소는 제출 메일에 별도 기재

```bash
git clone https://github.com/window-ook/curi-ai-frontend.git
pnpm install
pnpm dev
```

## ⚙️ 기술 스택

### 코어

<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"> 
    <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=React&logoColor=black">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white">
</div>

### 상태 관리 & 최적화

<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/Zustand-4a2c2a?style=flat-square&logo=zustand&logoColor=white">
    <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=react-hook-form&logoColor=white">
    <img src="https://img.shields.io/badge/zod-3E67B1?style=flat-square&logo=zod&logoColor=white">
</div>

### 스타일링

<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
</div>

### 배포

<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/Docker Compose-1D63ED?style=flat-square&logo=docker&logoColor=white">  
    <img src="https://img.shields.io/badge/AWS EC2-FF9900?style=flat-square&logo=ec2&logoColor=white"> 
</div>

## 🔧 주요 기능 구현

- 대표 & 추가 이미지 업로드: 대표/추가 이미지 최대 5장, 15MB 제한, 1:1 비율 유지 ✅
- 카테고리 등록: 최대 2개 토글 방식, 상태 유지 ✅
- 콘텐츠 제목: 최소 글자/최대 글자 수 제한 ✅
- 활동 방식 선택: 2개 옵션 중 선택 토글 ✅
- 회차 추가 및 회차 정보 설정: 날짜, 시간, 활동 내용 글자 수 제한 ✅
- 반응형 디자인 요구사항 충족 완료, 웹 접근성을 위한 시멘틱 태그 및 aria-label 적용 ✅

## 📁 디렉토리 구조

```
├── components/
│   ├── layout # 레이아웃(네비게이션바)
│   ├── task # 비즈니스 로직 컴포넌트
│   └── ui # 공통 UI 컴포넌트
│
├── hooks # 커스텀 훅
├── schema # zod 스키마
├── store   # zustand 스토어
├── types # interface
├── utils # 유틸리티 함수
└── ...
```

## 💡 기술적 의사결정

### Zustand를 활용한 전역 상태 관리

- **문제**: 카테고리 상태를 여러 컴포넌트에서 공유해야 했습니다.
- **선택**: 리렌더링을 최소화하고 학습곡선이 낮은 Zustand를 도입했습니다.
- **결과**: 보일러플레이트 코드 없이 간결한 상태 관리를 구현했습니다.

### React Hook Form과 Zod를 활용한 텍스트 영역 및 회차 정보 인풋 렌더링 최적화

- **문제**: SessionInformation 컴포넌트에서 useState 11개로 인한 과도한 리렌더링
- **선택**: React Hook Form의 내부 최적화와 Zod의 타입 안전성을 결합하여 과제 전체의 제어 컴포넌트 입력 상태 관리
- **결과**: 리렌더링 최소화 + 강력한 유효성 검증 + 타입 추론 자동화
