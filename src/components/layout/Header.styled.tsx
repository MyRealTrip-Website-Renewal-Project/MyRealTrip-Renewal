import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderContainer = styled(motion.header)`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    height: auto;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
    align-items: stretch;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-right: 0;
  }
`;

export const HeaderLogo = styled(motion.div)`
  display: flex;
  align-items: center;
  height: 32px;
  margin-right: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  img {
    width: 120px;
    height: 32px;
  }
`;

export const SearchBarContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  min-width: 340px;
  max-width: 480px;
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: ${({ theme }) => theme.spacing.md} 0;
    min-width: 180px;
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  flex: 1;
  outline: none;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  height: 40px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const SearchButton = styled(motion.button)`
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 2px;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 0 0 auto;
  margin-left: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    margin-top: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    justify-content: flex-end;
  }
`;

export const PartnerLogin = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const LoginButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const HeaderTabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`; 