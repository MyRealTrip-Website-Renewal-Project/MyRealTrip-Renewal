import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  width: 260px;
  display: flex;
  flex-direction: column;
  transition: box-shadow ${({ theme }) => theme.transitions.normal}, transform ${({ theme }) => theme.transitions.normal};
  height: 340px;
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px) scale(1.03);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const CardInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
  justify-content: flex-end;
`;

export const HotelName = styled.div`
  font-size: 1.08rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 2px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

export const Stars = styled.span`
  color: ${({ theme }) => theme.colors.badge2};
  font-size: 1rem;
  margin-left: 2px;
`;

export const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: 2px;
`;

export const Rating = styled.span`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: 0.98rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 2px ${({ theme }) => theme.spacing.sm};
`;

export const ReviewLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.98rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-decoration: underline;
  margin-left: 2px;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: 2px;
`;

export const Badge = styled.span<{ variant: 'freeCancel' | 'timeSale' | 'hotelBadge' }>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'freeCancel':
        return theme.colors.badge1;
      case 'timeSale':
        return theme.colors.error;
      case 'hotelBadge':
        return theme.colors.badge3;
      default:
        return theme.colors.textSecondary;
    }
  }};
  font-size: 0.97rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin-top: 2px;
`;

export const PriceLabel = styled.span`
  font-size: 0.98rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const Price = styled.span`
  font-size: 1.18rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -1px;
`; 