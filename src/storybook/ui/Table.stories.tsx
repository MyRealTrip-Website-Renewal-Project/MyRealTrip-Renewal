import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '데이터를 행과 열로 구성하여 표시하는 테이블 컴포넌트입니다. 정렬, 필터링, 페이지네이션 기능을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: '테이블에 적용할 CSS 클래스',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 테이블
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>관리자</TableCell>
          <TableCell>활성</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>사용자</TableCell>
          <TableCell>활성</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>박민수</TableCell>
          <TableCell>park@example.com</TableCell>
          <TableCell>편집자</TableCell>
          <TableCell>비활성</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};

// 정렬 가능한 테이블
export const Sortable: Story = {
  render: () => (
    <Table>
      <TableCaption>정렬 가능한 사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer hover:bg-gray-50">
            이름 ↕
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50">
            이메일 ↕
          </TableHead>
          <TableHead className="cursor-pointer hover:bg-gray-50">
            가입일 ↕
          </TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              활성
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>2024-02-20</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              활성
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>박민수</TableCell>
          <TableCell>park@example.com</TableCell>
          <TableCell>2024-03-10</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
              비활성
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};

// 선택 가능한 테이블
export const Selectable: Story = {
  render: () => (
    <Table>
      <TableCaption>선택 가능한 사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input type="checkbox" className="rounded" />
          </TableHead>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>액션</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-gray-50">
          <TableCell>
            <input type="checkbox" className="rounded" />
          </TableCell>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>관리자</TableCell>
          <TableCell>
            <button className="text-blue-600 hover:text-blue-800 text-sm">편집</button>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-50">
          <TableCell>
            <input type="checkbox" className="rounded" />
          </TableCell>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>사용자</TableCell>
          <TableCell>
            <button className="text-blue-600 hover:text-blue-800 text-sm">편집</button>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-gray-50">
          <TableCell>
            <input type="checkbox" className="rounded" />
          </TableCell>
          <TableCell>박민수</TableCell>
          <TableCell>park@example.com</TableCell>
          <TableCell>편집자</TableCell>
          <TableCell>
            <button className="text-blue-600 hover:text-blue-800 text-sm">편집</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};

// 데이터가 없는 테이블
export const Empty: Story = {
  render: () => (
    <Table>
      <TableCaption>사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="text-center py-8 text-gray-500">
            데이터가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};

// 복잡한 데이터 테이블
export const ComplexData: Story = {
  render: () => (
    <Table>
      <TableCaption>상세 사용자 정보</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>전화번호</TableHead>
          <TableHead>가입일</TableHead>
          <TableHead>마지막 로그인</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono">#001</TableCell>
          <TableCell className="font-medium">김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>010-1234-5678</TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell>2024-03-15 14:30</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              활성
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">#002</TableCell>
          <TableCell className="font-medium">이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>010-2345-6789</TableCell>
          <TableCell>2024-02-20</TableCell>
          <TableCell>2024-03-14 09:15</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              활성
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">#003</TableCell>
          <TableCell className="font-medium">박민수</TableCell>
          <TableCell>park@example.com</TableCell>
          <TableCell>010-3456-7890</TableCell>
          <TableCell>2024-03-10</TableCell>
          <TableCell>2024-03-10 16:45</TableCell>
          <TableCell>
            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
              비활성
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};

// 스트라이프 테이블
export const Striped: Story = {
  render: () => (
    <Table>
      <TableCaption>스트라이프 스타일 테이블</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>제품명</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>가격</TableHead>
          <TableHead>재고</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-white">
          <TableCell>노트북</TableCell>
          <TableCell>전자제품</TableCell>
          <TableCell>₩1,200,000</TableCell>
          <TableCell>15</TableCell>
        </TableRow>
        <TableRow className="bg-gray-50">
          <TableCell>마우스</TableCell>
          <TableCell>액세서리</TableCell>
          <TableCell>₩25,000</TableCell>
          <TableCell>50</TableCell>
        </TableRow>
        <TableRow className="bg-white">
          <TableCell>키보드</TableCell>
          <TableCell>액세서리</TableCell>
          <TableCell>₩150,000</TableCell>
          <TableCell>30</TableCell>
        </TableRow>
        <TableRow className="bg-gray-50">
          <TableCell>모니터</TableCell>
          <TableCell>전자제품</TableCell>
          <TableCell>₩500,000</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}; 