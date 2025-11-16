'use client';

import { ButtonHTMLAttributes } from 'react';

/**
 * 공용 버튼 컴포넌트
 * @property variant - black: 검정 계열, success: 초록 계열, outline: 테두리 버튼, success-active: 활성화 상태 (초록 테두리 + 연한 초록 배경)
 * @property size 버튼 크기 - navbar: Navbar용 작은 버튼, md: 중간, lg: 일반 큰 버튼
 * @property fullWidth - 전체 너비 사용 여부
 * @property disabledTextWhite - disabled 상태에서도 텍스트를 흰색으로 유지
 * @property ariaLabel - 버튼의 역할 설명을 위한 aria-label 속성 값
 */
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'black' | 'success' | 'outline' | 'success-active';
    size?: 'navbar' | 'md' | 'lg' | 'nopadding';
    fullWidth?: boolean;
    disabledTextWhite?: boolean;
    ariaLabel: string;
}

export default function Button({
    variant = 'black',
    size = 'lg',
    fullWidth = false,
    disabledTextWhite = false,
    disabled = false,
    className = '',
    children,
    ariaLabel,
    ...props
}: IButton) {
    const baseStyles = 'disabled:border-custom-gray-300 disabled:bg-custom-gray-300 font-medium transition-colors cursor-pointer disabled:cursor-not-allowed';

    // '다음으로' 버튼은 disabled 상태에서도 텍스트가 흰색
    const disabledTextStyles = disabledTextWhite
        ? 'disabled:text-white'
        : 'disabled:text-custom-gray-700';

    // 버튼 종류
    const variantStyles = {
        black: disabled
            ? ''
            : 'bg-custom-black-600 hover:bg-custom-black-400 active:bg-custom-black-900 text-white',
        success: disabled
            ? ''
            : 'bg-success-400 hover:bg-success-700 active:bg-success-500 text-white',
        outline: disabled
            ? 'border'
            : 'border border-custom-gray-200 active:border-success-400 hover:border-custom-gray-600 bg-custom-gray-100 hover:bg-custom-gray-200 active:bg-success-100 text-custom-black-900',
        'success-active': disabled
            ? 'border'
            : 'border border-success-400 bg-success-100 hover:bg-success-200 text-success-700',
    };

    // 버튼 사이즈
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
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}