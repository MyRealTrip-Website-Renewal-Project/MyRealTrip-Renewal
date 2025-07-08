// API 상태 모니터링 컴포넌트

import React, { useState, useEffect } from 'react';
import { getRequestStats, isMapboxAPIEnabled, getMapboxDisableReason, resetMapboxAPI } from '../../utils/mapboxAPI';

interface APIStatusMonitorProps {
  showDetails?: boolean;
  onStatusChange?: (isEnabled: boolean) => void;
}

const APIStatusMonitor: React.FC<APIStatusMonitorProps> = ({ 
  showDetails = false, 
  onStatusChange 
}) => {
  const [stats, setStats] = useState(getRequestStats());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateStats = () => {
      const newStats = getRequestStats();
      setStats(newStats);
      
      if (onStatusChange) {
        onStatusChange(newStats.isDisabled);
      }
      
      // API가 비활성화되면 알림 표시
      if (newStats.isDisabled && !isVisible) {
        setIsVisible(true);
      }
    };

    // 초기 상태 업데이트
    updateStats();

    // 30초마다 상태 업데이트
    const interval = setInterval(updateStats, 30000);

    return () => clearInterval(interval);
  }, [onStatusChange, isVisible]);

  // 개발 모드에서만 표시
  if (!import.meta.env.DEV && !isVisible) {
    return null;
  }

  const handleReset = () => {
    resetMapboxAPI();
    setStats(getRequestStats());
    setIsVisible(false);
  };

  const getStatusColor = () => {
    if (stats.isDisabled) return '#ef4444'; // 빨간색
    if (stats.remainingDaily < 1000 || stats.remainingMonthly < 1000) return '#f59e0b'; // 주황색
    return '#10b981'; // 초록색
  };

  const getStatusText = () => {
    if (stats.isDisabled) return '비활성화됨';
    if (stats.remainingDaily < 1000 || stats.remainingMonthly < 1000) return '한도 임박';
    return '정상';
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#fff',
      border: `2px solid ${getStatusColor()}`,
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      minWidth: '280px',
      fontFamily: 'Pretendard-Regular, sans-serif',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
          }} />
          <span style={{ fontWeight: '600', fontSize: '14px' }}>
            Mapbox API 상태: {getStatusText()}
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#666',
          }}
        >
          ×
        </button>
      </div>

      {stats.isDisabled && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '4px',
          padding: '8px',
          marginBottom: '8px',
          fontSize: '12px',
          color: '#dc2626',
        }}>
          <strong>비활성화 이유:</strong> {stats.disableReason}
        </div>
      )}

      {showDetails && (
        <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
          <div>일일 요청: {stats.dailyRequests.toLocaleString()} / {stats.dailyLimit.toLocaleString()}</div>
          <div>월간 요청: {stats.monthlyRequests.toLocaleString()} / {stats.monthlyLimit.toLocaleString()}</div>
          <div>남은 일일: {stats.remainingDaily.toLocaleString()}회</div>
          <div>남은 월간: {stats.remainingMonthly.toLocaleString()}회</div>
        </div>
      )}

      {stats.isDisabled && import.meta.env.DEV && (
        <button
          onClick={handleReset}
          style={{
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer',
            marginTop: '8px',
          }}
        >
          API 재활성화 (개발용)
        </button>
      )}
    </div>
  );
};

export default APIStatusMonitor; 