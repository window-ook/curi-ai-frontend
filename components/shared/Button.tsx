'use client';

import { ButtonHTMLAttributes } from 'react';

/**
 * 공용 버튼 컴포넌트
 * @property variant 버튼 스타일 - black: 검정 계열, success: 초록 계열, outline: 테두리 버튼, success-active: 활성화 상태 (초록 테두리 + 연한 초록 배경)
 * @property size 버튼 크기 - navbar: Navbar용 작은 버튼, md: 중간, lg: 일반 큰 버튼
 * @property fullWidth 전체 너비 사용 여부
 * @property disabledTextWhite disabled 상태에서도 텍스트를 흰색으로 유지
 */
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'black' | 'success' | 'outline' | 'success-active';
    size?: 'navbar' | 'md' | 'lg' | 'nopadding';
    fullWidth?: boolean;
    disabledTextWhite?: boolean;
}

export default function Button({
    variant = 'black',
    size = 'lg',
    fullWidth = false,
    disabledTextWhite = false,
    disabled = false,
    className = '',
    children,
    ...props
}: IButton) {
    const baseStyles = 'font-medium transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-custom-gray-300 disabled:border-custom-gray-300';

    // '다음으로'는 disabled 상태에서도 텍스트를 흰색으로 유지
    const disabledTextStyles = disabledTextWhite
        ? 'disabled:text-white'
        : 'disabled:text-custom-gray-700';

    // 베리에이션별 스타일
    const variantStyles = {
        black: disabled
            ? ''
            : 'bg-custom-black-600 text-white hover:bg-custom-black-400 active:bg-custom-black-900',
        success: disabled
            ? ''
            : 'bg-success-400 text-white hover:bg-success-700 active:bg-success-500',
        outline: disabled
            ? 'border'
            : 'bg-custom-gray-100 text-custom-black-900 border border-custom-gray-200 hover:bg-custom-gray-200 hover:border-custom-gray-600 active:bg-success-100 active:border-success-400',
        'success-active': disabled
            ? 'border'
            : 'bg-success-100 text-success-700 border border-success-400 hover:bg-success-200',
    };

    const sizeStyles = {
        navbar: 'px-3 py-2 rounded text-base',
        md: 'px-4 py-3 rounded text-lg font-semibold',
        lg: 'px-5 py-4 rounded text-xl font-semibold',
        nopadding: 'p-0 rounded text-base',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
        <button
            disabled={disabled}
            className={`${baseStyles} ${disabledTextStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}