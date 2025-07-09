import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/useAuthStore';
import {
  AuthContainer,
  AuthHeader,
  AuthTitle,
  AuthSubtitle,
  AuthForm,
  FormGroup,
  FormLabel,
  FormInput,
  SubmitButton,
  Divider,
  SocialLoginButton,
  AuthFooter,
  AuthLink,
  ErrorMessage,
} from './AuthModal.styled';

interface LoginFormData {
  email: string;
  password: string;
}

const AuthModal: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const { login, setLoading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      setLoading(true);
      
      // TODO: 실제 API 호출로 대체
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 로그인 처리
      login({
        id: '1',
        email: data.email,
        name: '사용자',
      });
      
      reset();
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      setError('');
      setLoading(true);
      
      // TODO: 실제 소셜 로그인 구현
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`${provider} 로그인 시도`);
    } catch (err) {
      setError(`${provider} 로그인에 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthHeader>
        <AuthTitle>
          {isLogin ? '로그인' : '회원가입'}
        </AuthTitle>
        <AuthSubtitle>
          {isLogin 
            ? '마이리얼트립에 오신 것을 환영합니다' 
            : '새로운 계정을 만들어보세요'
          }
        </AuthSubtitle>
      </AuthHeader>

      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <FormInput
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식을 입력해주세요',
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <FormInput
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
        </SubmitButton>
      </AuthForm>

      <Divider>
        <span>또는</span>
      </Divider>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <SocialLoginButton
          type="button"
          provider="google"
          onClick={() => handleSocialLogin('google')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img 
            src="/src/assets/img/Google__G__logo.svg.webp" 
            alt="Google"
          />
          Google로 계속하기
        </SocialLoginButton>

        <SocialLoginButton
          type="button"
          provider="apple"
          onClick={() => handleSocialLogin('apple')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img 
            src="/src/assets/img/Apple_logo_black.svg.webp" 
            alt="Apple"
          />
          Apple로 계속하기
        </SocialLoginButton>
      </div>

      <AuthFooter>
        <AuthLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLogin(!isLogin);
            setError('');
            reset();
          }}
        >
          {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
        </AuthLink>
      </AuthFooter>
    </AuthContainer>
  );
};

export default AuthModal; 