import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import googleLogo from '../../assets/img/Google__G__logo.svg.webp';
import appleLogo from '../../assets/img/Apple_logo_black.svg.webp';
import Modal from './Modal';
import ArrowLeftIcon from '../../assets/img/arrow-left-sm-svgrepo-com.svg';
import CloseIcon from '../../assets/img/close-sm-svgrepo-com.svg';

const EMAIL_DOMAINS = [
  'naver.com',
  'gmail.com',
  'hanmail.net',
  'nate.com',
  'daum.net',
];

// 이메일 정규표현식 (영문, 숫자, 특수문자 @ . _ - 만 허용)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ENGLISH_ONLY_REGEX = /^[a-zA-Z0-9._%+-@]*$/;

// 더미 회원 데이터
const DUMMY_USERS = [
  { email: 'admin@myrealtrip.io', nickname: '관리자' },
  { email: 'test@gmail.com', nickname: '홍길동' },
];

// 더미 회원 여부 확인 함수
function isMember(email: string): Promise<{ isMember: boolean; nickname?: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const user = DUMMY_USERS.find(u => u.email === email);
      if (user) {
        resolve({ isMember: true, nickname: user.nickname });
      } else if (email.endsWith('@gmail.com')) {
        resolve({ isMember: true, nickname: '홍길동' });
      } else {
        resolve({ isMember: false });
      }
    }, 700);
  });
}

// 더미 인증번호 발송 함수
function sendVerificationCode(email: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('123456'); // 항상 123456 반환
    }, 700);
  });
}

// 이메일 마스킹 함수
function maskEmail(email: string) {
  const [id, domain] = email.split('@');
  if (!id || !domain) return email;
  const idMasked = id.length <= 2 ? id[0] + '*' : id.slice(0, 2) + '*'.repeat(id.length - 2);
  const [domainName, ...domainRest] = domain.split('.');
  const domainMasked = domainName[0] + '*'.repeat(domainName.length - 1);
  return `${idMasked}@${domainMasked}.${domainRest.join('.')}`;
}

// 인증번호 입력 팝업 컴포넌트
const VerificationModal: React.FC<{
  open: boolean;
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ open, email, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300); // 5분
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    setCode('');
    setError('');
    setTimer(300);
    setSuccess(false);
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(value);
    setError('');
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      setError('6자리 인증번호를 입력해 주세요.');
      return;
    }
    if (code === '123456') {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 800);
    } else {
      setError('인증번호가 올바르지 않습니다.');
    }
  };

  const handleResend = async () => {
    setSending(true);
    await sendVerificationCode(email);
    setTimer(300);
    setSending(false);
    setError('인증번호가 재전송되었습니다.');
  };

  const min = String(Math.floor(timer / 60)).padStart(1, '0');
  const sec = String(timer % 60).padStart(2, '0');

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.verifyTitle}>인증번호를 입력해 로그인하세요</div>
      <div className={styles.verifyDesc}>
        <b>{email}</b>으로 인증번호를 보냈습니다. 이메일을 확인하여 아래에 인증번호를 입력해 주세요.
      </div>
      <div className={styles.verifyInputWrap}>
        <input
          className={styles.verifyInput}
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={handleChange}
          placeholder="●●●●●●"
          autoFocus
        />
      </div>
      {error && <div className={styles.errorMsg}>{error}</div>}
      <button className={styles.continueBtn} onClick={handleVerify} disabled={code.length !== 6 || success}>
        {success ? '인증 성공!' : '확인'}
      </button>
      <div className={styles.verifyHelp}>
        이메일을 받지 못하셨나요? 스팸 폴더를 확인하거나 인증 코드를 다시 보내세요({min}:{sec})
        <button className={styles.resendBtn} onClick={handleResend} disabled={sending || timer === 0}>
          {sending ? '전송 중...' : '재전송'}
        </button>
      </div>
    </Modal>
  );
};

// 비밀번호 입력 모달 컴포넌트
const PasswordModal: React.FC<{
  open: boolean;
  email: string;
  onClose: () => void;
  onSuccess: (nickname: string) => void;
}> = ({ open, email, onClose, onSuccess }) => {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    setError('');
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (pw === 'admin1234') {
        onSuccess('관리자');
        onClose();
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.verifyTitle}>비밀번호를 입력해 로그인하세요</div>
      <div className={styles.verifyDesc}>
        <b>{email}</b> 계정의 비밀번호를 입력해 주세요.
      </div>
      <div className={styles.verifyInputWrap}>
        <input
          className={styles.input}
          type="password"
          value={pw}
          onChange={handlePwChange}
          placeholder="비밀번호"
          autoFocus
        />
      </div>
      {error && <div className={styles.errorMsg}>{error}</div>}
      <button className={styles.continueBtn} onClick={handleLogin} disabled={!pw || loading}>
        {loading ? '확인 중...' : '로그인'}
      </button>
    </Modal>
  );
};

const AuthModal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'password' | 'verify'>('email');
  const [sentEmail, setSentEmail] = useState('');
  const [nickname, setNickname] = useState<string | null>(null);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  // 인증번호 입력 관련
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [timer, setTimer] = useState(300);
  const [sending, setSending] = useState(false);
  const [remember, setRemember] = useState(false);
  const codeInputs = Array(6).fill(0);
  const codeRefs = Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>());

  // 추천 도메인 드롭다운 로직
  const atIdx = email.indexOf('@');
  const localPart = atIdx > -1 ? email.slice(0, atIdx) : email;
  const domainPart = atIdx > -1 ? email.slice(atIdx + 1) : '';
  const filteredDomains = EMAIL_DOMAINS.filter(domain =>
    domain.startsWith(domainPart) && email && atIdx > -1 && domainPart !== domain
  );
  const shouldShowDropdown = atIdx > -1 && filteredDomains.length > 0;

  // 인증번호 입력 6칸이 모두 채워지면 자동 검증
  React.useEffect(() => {
    if (step === 'verify' && code.length === 6 && !code.includes('')) {
      handleVerify();
    }
    // eslint-disable-next-line
  }, [code, step]);

  // 타이머 관리
  React.useEffect(() => {
    if (step !== 'verify') return;
    setTimer(300);
    setCode('');
    setCodeError('');
    setCodeSuccess(false);
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step, sentEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    setShowDropdown(true);
    if (!ENGLISH_ONLY_REGEX.test(value)) {
      setError('이메일은 영문, 숫자, 특수문자(@, ., _, -)만 사용할 수 있습니다.');
    } else if (value && !EMAIL_REGEX.test(value)) {
      setError('올바른 이메일 형식을 입력해 주세요.');
    } else {
      setError('');
    }
  };

  const handleSelect = (domain: string) => {
    setEmail(localPart + '@' + domain);
    setShowDropdown(false);
    setError('');
  };

  const handleContinue = async () => {
    if (!email || !!error) return;
    setLoading(true);
    await sendVerificationCode(email);
    setSentEmail(email);
    setStep('verify');
    setLoading(false);
  };

  // 비밀번호 단계
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    setPwError('');
  };
  const handlePwLogin = () => {
    setPwLoading(true);
    setTimeout(() => {
      if (pw === 'admin1234') {
        setNickname('관리자');
        setStep('email');
      } else {
        setPwError('비밀번호가 올바르지 않습니다.');
      }
      setPwLoading(false);
    }, 600);
  };

  // 인증번호 단계 - 6칸 개별 입력
  const handleCodeInput = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    let newCode = code.padEnd(6, '');
    newCode = newCode.substring(0, idx) + val + newCode.substring(idx + 1);
    setCode(newCode);
    setCodeError('');
    if (val && idx < 5) {
      codeRefs[idx + 1].current?.focus();
    }
    if (!val && idx > 0 && e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === 'deleteContentBackward') {
      codeRefs[idx - 1].current?.focus();
    }
  };
  const handleCodeKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      codeRefs[idx - 1].current?.focus();
    }
  };
  const handleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      setCodeError('6자리 인증번호를 입력해 주세요.');
      return;
    }
    if (code === '123456') {
      setCodeSuccess(true);
      setTimeout(() => {
        setNickname('신규회원');
        setStep('email');
      }, 800);
    } else {
      setCodeError('인증번호가 올바르지 않습니다.');
    }
  };
  const handleResend = async () => {
    setSending(true);
    await sendVerificationCode(sentEmail);
    setTimer(300);
    setSending(false);
    setCodeError('인증번호가 재전송되었습니다.');
  };
  const min = String(Math.floor(timer / 60)).padStart(1, '0');
  const sec = String(timer % 60).padStart(2, '0');

  // 뒤로가기
  const handleBack = () => {
    if (step === 'password' || step === 'verify') {
      setStep('email');
      setPw('');
      setPwError('');
      setCode('');
      setCodeError('');
    }
  };

  // 인증번호 입력 섹션에서 '비밀번호로 로그인' 링크 클릭 시
  const handlePwLoginLink = () => {
    setStep('password');
  };

  return (
    <div className={styles.wrap}>
      {/* 인증번호 입력 단계: SVG 뒤로가기 버튼 좌측 상단(absolute) */}
      {step === 'verify' && (
        <button className={styles.absBackBtn} onClick={handleBack} aria-label="뒤로가기">
          <img src={ArrowLeftIcon} alt="뒤로가기" width={20} height={20} className={styles.iconSvg} />
        </button>
      )}
      {/* 단계별 UI */}
      {step === 'email' && (
        <>
          <h2 className={styles.title}>로그인 / 회원가입</h2>
          <div className={styles.desc}>간편하게 예약을 관리하고 회원 전용 혜택도 누려보세요</div>
          <label className={styles.inputLabel} htmlFor="email-input">이메일</label>
          <div className={styles.inputWrap}>
            <input
              id="email-input"
              className={styles.input}
              type="email"
              placeholder="이메일 주소를 입력하세요"
              value={email}
              onChange={handleInputChange}
              autoComplete="off"
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
              disabled={loading}
            />
            {email && (
              <button className={styles.clearBtn} onClick={() => setEmail('')} tabIndex={-1} aria-label="입력 지우기">×</button>
            )}
            {shouldShowDropdown && showDropdown && (
              <ul className={styles.emailDropdown}>
                {filteredDomains.map(domain => (
                  <li
                    key={domain}
                    className={styles.emailDropdownItem}
                    onMouseDown={() => handleSelect(domain)}
                  >
                    {localPart}@{domain}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error && <div className={styles.errorMsg}>{error}</div>}
          <button className={styles.continueBtn} disabled={!email || !!error || loading} onClick={handleContinue}>
            {loading ? '확인 중...' : '계속'}
          </button>
        </>
      )}
      {step === 'password' && (
        <>
          <div className={styles.verifyTitle}>비밀번호를 입력해 로그인하세요</div>
          <div className={styles.verifyDesc}>
            <b>{email}</b> 계정의 비밀번호를 입력해 주세요.
          </div>
          <div className={styles.verifyInputWrap}>
            <input
              className={styles.input}
              type="password"
              value={pw}
              onChange={handlePwChange}
              placeholder="비밀번호"
              autoFocus
            />
          </div>
          {pwError && <div className={styles.errorMsg}>{pwError}</div>}
          <button className={styles.continueBtn} onClick={handlePwLogin} disabled={!pw || pwLoading}>
            {pwLoading ? '확인 중...' : '로그인'}
          </button>
        </>
      )}
      {step === 'verify' && (
        <>
          <div className={styles.verifyTitle}>인증 필요</div>
          <div className={styles.verifyDesc}>
            <b>{maskEmail(sentEmail)}</b> 이메일 주소로 전송된 코드를 입력해 주세요
          </div>
          <div className={styles.codeInputRow}>
            {codeInputs.map((_, i) => (
              <input
                key={i}
                ref={codeRefs[i]}
                className={styles.codeInput}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[i] || ''}
                onChange={e => handleCodeInput(i, e)}
                onKeyDown={e => handleCodeKeyDown(i, e)}
                autoFocus={i === 0}
              />
            ))}
          </div>
          {codeError && <div className={styles.errorMsg}>{codeError}</div>}
          <div className={styles.verifyInfoBox}>
            <div className={styles.verifyHelpRow}>
              <span className={styles.verifyHelpText}>
                이메일을 받지 못하셨나요? 스팸 폴더를 확인하거나 인증 코드를 다시 보내세요({min}:{sec})
              </span>
              {timer === 0 && (
                <button className={styles.resendBtn} onClick={handleResend} disabled={sending}>
                  {sending ? '전송 중...' : '재발송'}
                </button>
              )}
            </div>
            <div className={styles.pwLoginRow}>
              또는 <button className={styles.pwLoginLink} type="button" onClick={handlePwLoginLink}>비밀번호로 로그인</button>
            </div>
          </div>
        </>
      )}
      {/* '다른 로그인 방식'은 인증번호 입력 단계에서는 숨김 */}
      {step !== 'verify' && (
        <>
          <div className={styles.divider}>다른 로그인 방식</div>
          <div className={styles.socialRow}>
            <div className={styles.socialCol}>
              <a className={styles.socialBtn + ' ' + styles.google} href="#" aria-label="구글 로그인">
                <img src={googleLogo} alt="Google" className={styles.socialIcon} />
              </a>
              <div className={styles.socialLabel}>Google</div>
            </div>
            <div className={styles.socialCol}>
              <a className={styles.socialBtn + ' ' + styles.apple} href="#" aria-label="애플 로그인">
                <img src={appleLogo} alt="Apple" className={styles.socialIcon + ' ' + styles.appleIcon} />
              </a>
              <div className={styles.socialLabel}>Apple</div>
            </div>
          </div>
        </>
      )}
      {/* 약관 안내는 인증번호 입력 단계에서는 숨김 */}
      {step !== 'verify' && (
        <div className={styles.terms}>
          로그인 또는 회원가입 시, <b>마이리얼트립</b> <a href="#">이용약관</a> 및 <a href="#">개인정보 처리방침</a>에 동의한 것으로 간주합니다.
        </div>
      )}
    </div>
  );
};

export default AuthModal; 